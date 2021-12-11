const logger = require("../../logger");

class RetrieveDataService {
  constructor(analyticsGateway, replyDao) {
    this.analyticsGateway = analyticsGateway;
    this.replyDao = replyDao;
  }

  /**Helper function that receives a correctly formatted request body object for google analaytics reporting api and
   * return the raw report data retrieved from that api
   *
   * @param {Object} request A correctly formatted request body object containing the specific requirement for the report
   * @returns a google analytics report object to respond to the request object; If the report is invalid, return null
   */
  async _getReports(requestBody) {
    // Authorize the google analytics service
    logger.info(`Service: Google Analytics Authorizing`)
    await this.analyticsGateway.authorize();
    logger.info(`Service: Google Analytics Authorized`)
    // Finalize the request body to make it ready for sending request
    let request = {
      headers: { "Content-Type": "application/json" },
      auth: await this.analyticsGateway.getGoogleJWT(),
      resource: requestBody,
    };
    logger.info(`Service: Retrieving Data from Google Analytics`)
    // Get the data by sending the request and check the validity of the request
    let res = await (
      await this.analyticsGateway.getAnalytics()
    ).reports.batchGet(request);
    if (res.status !== 200) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics`)
      return null;
    }
    logger.info(`Service: Retrieved Data from Google Analytics`)
    return res.data;
  }

  /** The helper function that generates the correctly structured request object used for sending request to retrieve statistics from google analytics
   *
   * Note: The input should all follow the correct form specificed in the google analytics reporting api documentation https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ReportRequest
   * @param {string} startDate The startDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {string} endDate The endDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {object} metrics The metrics object of the request
   * @param {object} dimensions The dimensions object of the request
   * @param {object} dimensionFilter The optional dimension filter object (set to null for default)
   * @param {string} pageToken The optional pageToken value for requesting a specific page of the report (set to null for default)
   * @returns A request body in the correct form that can be used directly for sending request to google analytics to retrieve statistics report
   */
  async _generateRequest(
    startDate,
    endDate,
    metrics,
    dimensions,
    dimensionFilter = null,
    pageToken = null
  ) {
    let pageSize = "1000";
    let resRequest = {};
    // Check if dimension filter is needed, and construct the request body accordingly
    if (dimensionFilter === null) {
      // Construct the request using the information given for the case when no dimension filter provided
      resRequest = {
        reportRequests: [
          {
            viewId: await this.analyticsGateway.getView(),
            dateRanges: [
              {
                startDate: startDate,
                endDate: endDate,
              },
            ],
            metrics: metrics,
            dimensions: dimensions,
            samplingLevel: "LARGE",
            pageSize: pageSize,
          },
        ],
      };
    } else {
      // Construct the request body using the information given for the case when dimension filter is provided
      resRequest = {
        reportRequests: [
          {
            viewId: await this.analyticsGateway.getView(),
            dateRanges: [
              {
                startDate: startDate,
                endDate: endDate,
              },
            ],
            metrics: metrics,
            dimensions: dimensions,
            dimensionFilterClauses: dimensionFilter,
            samplingLevel: "LARGE",
            pageSize: pageSize,
          },
        ],
      };
    }
    // Create the page token field for the request body if it is provided
    if (pageToken !== null) {
      resRequest["reportRequests"][0]["pageToken"] = pageToken;
    }
    return resRequest;
  }

  /** The helper function that one page of a rawReport to the total rawReport(which is a report object combining multiple pages)
   *
   * @param {object} totalRawReport The report object that combines multiple pages of single page report object
   * @param {object} rawReport The single page report object
   * @returns The new total report object that integrates the rawReport to the totalRawReport
   */
  async _combineReportPages(totalRawReport, rawReport) {
    let totalRawReportRow = totalRawReport["reports"][0]["data"]["rows"];
    let rawReportRow = rawReport["reports"][0]["data"]["rows"];
    for (eachRow of rawReportRow) {
      totalRawReportRow.push(eachRow);
    }
    return totalRawReport;
  }

  /**The helper function that generates the request according to the given information, get the statistics report object, and handle paging if there are multiple pages
   *
   * (This handles the retrieving of raw data report more general, meaning that this is the helper function that should be used in particular service function to retrieve statistics from google analytics)
   * Note: The input should all follow the correct form specificed in the google analytics reporting api documentation https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ReportRequest
   * @param {string} startDate The startDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {string} endDate The endDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {object} metrics The metrics object of the request
   * @param {object} dimensions The dimensions object of the request
   * @param {object} dimensionFilter The optional dimension filter object (set to null for default)
   * @returns The statistics report object according to the given information
   */
  async _getRawReport(
    startDate,
    endDate,
    metrics,
    dimensions,
    dimensionFilter = null
  ) {
    let pageToken = null;
    // Generate the request according to the information
    let request = await this._generateRequest(
      startDate,
      endDate,
      metrics,
      dimensions,
      dimensionFilter
    );
    // Get the report by sending the request (check for validity)
    let totalRawReport = await this._getReports(request);
    if (totalRawReport === null) {
      return totalRawReport;
    }
    // If the report is valid and if the report contains next page token (showing that there are more pages and this is only one of the pages), then record the next page token
    if ("nextPageToken" in totalRawReport["reports"][0]) {
      pageToken = totalRawReport["reports"][0]["nextPageToken"];
    } else {
      pageToken = null;
    }
    // Continuously request for the next page of the report and combine them into one report to get all the information in one data report
    while (pageToken !== null) {
      let request = await this._generateRequest(
        startDate,
        endDate,
        metrics,
        dimensions,
        dimensionFilter,
        pageToken
      );

      let rawReport = await this._getReports(request);
      if (rawReport === null) {
        return rawReport;
      }
      if ("nextPageToken" in rawReport["reports"][0]) {
        pageToken = rawReport["reports"][0]["nextPageToken"];
        totalRawReport = await this._combineReportPages(
          totalRawReport,
          rawReport
        );
      } else {
        pageToken = null;
      }
    }
    // return the eventual combined report
    return totalRawReport;
  }

  /** The helper function that handles the inital extraction of the raw data report returned from google analytics
   *  in order to make restructure easier
   *
   * @param {object} rawData The raw data report object returned from requesting statistics from google analytics
   * @returns An object containing report(The general report object),
   *          reportData(The data object of the report),
   *          reportDataRow(The rows array containing an object represting each data row on each row of the report),
   *          reportRowCount(An integer specifying the number of rows in this report),
   *          res(An empty object specifying the result structure that should get returned when restructuing the data report)
   */
  async _initialExtractReport(rawData) {
    let report = rawData["reports"][0];
    let reportData = report["data"];
    let reportDataRow = reportData["rows"];
    let reportRowCount = reportData["rowCount"];
    let res = {};
    return { report, reportData, reportDataRow, reportRowCount, res };
  }

  /** The helper function that assigns a variable name from the required row to the corresponding final restructured object field
   *  (This is used for creating the simple one vairable relationship or two varaiable relationship structure)
   * @param {string} inputName The name(key) of the new field that needs to be assigned
   * @param {string} inputLocation An array containing the locations(index) of the name(value) (or elements required to form the name value) in the currRow's "dimensions" array field
   * @param {object} currObject The current object to assign to new variable field to
   * @param {object} currRow The current row from the raw data report to get the required name value
   *                    (Note: if the inputName is "location", then inputLocation has to contain index of both country and city dimensions, and the country has to be the first one in the array, and the city has to be the second one in the array)
   * @returns The currObject object with the required field assigned in the correct form
   *          Specfically: If reply is the name key, then the name value will be the replylabel(first 6 character) plus ": " plus the replyContent(first 10 characters)
   *                       If location is the name key, then the name value will be the city,country
   */
  async _assignSimpleVariableName(
    inputName,
    inputLocation,
    currObject,
    currRow
  ) {
    // If the input name is reply, construct the input value to be "replylabel(only 6 letters at most)/replyContent(only 10 words at most)"
    // If the input name is location, construct the input value to be "city,country"
    // In other situation, directly construct the field to have a key of the input name and value to be the value got from the provided row
    if (inputName === "reply") {
      let rid = currRow["dimensions"][inputLocation[0]];
      try {
        let replyInfo = await this.replyDao.get(rid);
        if (replyInfo === null){
            return null
        }
        let replyLabel = replyInfo["label"].substring(0, 6);
        if (replyLabel.length < replyInfo["label"].length) {
          replyLabel = replyLabel + "...";
        }
        let replyContent = replyInfo["content"].substring(0, 10);
        if (replyContent.length < replyInfo["content"].length) {
          replyContent = replyContent + "...";
        }
        currObject["reply"] = replyLabel + "/" + replyContent;
      } catch (err) {
        logger.error(err);
        return null
      }
    } else if (inputName === "location") {
      let countryName = currRow["dimensions"][inputLocation[0]];
      let cityName = currRow["dimensions"][inputLocation[1]];
      let city = cityName + "," + countryName;
      currObject["location"] = city;
    } else {
      currObject[inputName] = currRow["dimensions"][inputLocation[0]];
    }
    return currObject;
  }

  /** The helper function that restructures the raw data report to a simple two varaible relationship structure that can be used for frontend rendering
   *
   * @param {object} rawData The rawData report object
   * @param {string} xName The x value (first value) name for the two variable relationship structure
   * @param {string} xLocation An array containing the locations(index) of the x name(value) (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {string} yName The y value (second value) name for the two variable relationship structure
   * @param {string} yLocation An array containing the locations(index) of the y name(value) (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {string} valueName The name of the value for the two varaiable relationship structure
   * @param {string} valueLocation An integer specifying the location(index) of the value in the rawData's "rows"'s "metrics"'s first element's "values" array field
   * @returns The restructured (into a simple two variable strucuture) data according to the input; If there is an error, null will be returned
   */
  async _getSimpleTwoVariableStructure(
    rawData,
    xName,
    xLocation,
    yName,
    yLocation,
    valueName,
    valueLocation
  ) {
    try {
      // Firstly extract the report to get common variable values from the given raw data report
      let { report, reportData, reportDataRow, reportRowCount, res } =
        await this._initialExtractReport(rawData);
      // Create the data field for the restructured report
      res["data"] = [];
      // For each row in the report, assign the needed name and values using the helper functions
      for (let row = 0; row < reportRowCount; row += 1) {
        let currRow = reportDataRow[row];
        let currObject = {};

        currObject = await this._assignSimpleVariableName(
          xName,
          xLocation,
          currObject,
          currRow
        );
        if (currObject !== null){
        currObject = await this._assignSimpleVariableName(
          yName,
          yLocation,
          currObject,
          currRow
        );
        if (currObject !== null){

        currObject[valueName] = currRow["metrics"][0]["values"][valueLocation];

        res["data"].push(currObject);
        }
        }
      }
      // return the newly restructured report
      return res;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  /** The helper function that restructures the raw data report to a simple one varaible relationship structure that can be used for frontend rendering
   *
   * @param {object} rawData The rawData report object
   * @param {string} xName The variable name for the one variable relationship structure
   * @param {string} xLocation An array containing the locations(index) of the variable name value (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {string} valueName The name of the value for the one varaiable relationship structure
   * @param {string} valueLocation An integer specifying the location(index) of the value in the rawData's "rows"'s "metrics"'s first element's "values" array field
   * @returns The restructured (into a simple one variable strucuture) data according to the input; If there is an error, null will be returned
   */
  async _getSimpleOneVariableStructure(
    rawData,
    xName,
    xLocation,
    valueName,
    valueLocation
  ) {
    try {
      // Firstly extract all the common variable values from the given raw data report
      let { report, reportData, reportDataRow, reportRowCount, res } =
        await this._initialExtractReport(rawData);
      // Create the data field for the restructured report
      res["data"] = [];
      // For each row in the report, assign the needed name and values using the helper functions
      for (let row = 0; row < reportRowCount; row += 1) {
        let currRow = reportDataRow[row];
        let currObject = {};

        currObject = await this._assignSimpleVariableName(
          xName,
          xLocation,
          currObject,
          currRow
        );
        if (currObject !== null){
        currObject[valueName] = currRow["metrics"][0]["values"][valueLocation];

        res["data"].push(currObject);
        }
      }
      // return the newly restructured report
      return res;
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  // ===============================================================================================================================================================================
  // The above functions are the general helper functions for this service. The below services will be the specific services for each feature (and some associated helper functions)
  // ===============================================================================================================================================================================

  /**Get the user visit number separated by day and location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getVisitNumberAndSumFromLocationPerDay(startDate, endDate) {
    // Create the metrics object for querying (to be put into the request body)
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:date",
      },
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for General User Visit data`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for General User Visit data`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for General User Visit data`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatVisitNumberAndSumFromLocationPerDay(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getVisitNumberAndSumFromLocationPerDay
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatVisitNumberAndSumFromLocationPerDay(rawData) {
    try {
      // Use the helper functions to get the two variable structure restructured data of the raw data report
      return await this._getSimpleTwoVariableStructure(
        rawData,
        "date",
        [0],
        "location",
        [1, 2],
        "visit",
        0
      );
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  /**Get the user visit number of the reply specified structured according to reply and location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @param {array} ridArray The array of reply id that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */

  async getLocationVisitNumberFromReply(startDate, endDate, ridArray) {
    // Create the metrics object for querying (to be put into the request body)
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:eventLabel",
      },
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    // Create the filter object for querying specific data
    let filter = [
      {
        filters: [
          {
            dimensionName: "ga:eventLabel",
            operator: "IN_LIST",
            expressions: ridArray,
          },
        ],
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for User Visit data By Reply Input`)
    
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for User Visit data By Reply Input`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for User Visit data By Reply Input`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatLocationVisitNumberFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getLocationVisitNumberFromReply
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatLocationVisitNumberFromReply(rawData) {
    // Use the helper functions to get the two variable structure restructured data of the raw data report
    return await this._getSimpleTwoVariableStructure(
      rawData,
      "reply",
      [0],
      "location",
      [1, 2],
      "visit",
      0
    );
  }

  /**The helper function that extract an array of location in the form of: "city,country" to an array of city and an array of country
   *
   * @param {array} locationArray the location array in the form of "city,country"
   * @returns The array of city and an array of country
   */
  async _extractLocationInput(locationArray) {
    // Turn each "city, country" element in the location array into an array ([city, country])
    let location = locationArray.map((value) => {
      return value.split(",");
    });
    // Create city and country array and put each city and country into the corresponding array
    let city = [];
    let country = [];
    for (let eachLocation of location) {
      if (!(eachLocation[0] in city)) {
        city.push(eachLocation[0]);
      }
      if (!(eachLocation[1] in country)) {
        country.push(eachLocation[1]);
      }
    }
    // Return an object containing the city array and country array
    return { city, country };
  }

  /**Get the user visit number of the location specified structured according to reply and location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @param {array} locationArray The array of location (form: "city,country") that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getReplyVisitNumberFromLocation(startDate, endDate, locationArray) {
    // Turn the location array into two arrays of city and country (for future querying)
    let { city, country } = await this._extractLocationInput(locationArray);
    // Create the metrics object for querying (to be put into the request body)
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:eventLabel",
      },
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    // Create the filter object for querying specific data
    let filter = [
      {
        operator: "AND",
        filters: [
          {
            dimensionName: "ga:country",
            operator: "IN_LIST",
            expressions: country,
          },
          {
            dimensionName: "ga:city",
            operator: "IN_LIST",
            expressions: city,
          },
        ],
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for User Visit data By Location Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for User Visit data By Reply Input`)
      return rawReport;
    }
    // Restructure the raw report for frontend rendering need
    logger.info(`Service: Retrieved Data from Google Analytics for User Visit data By Reply Input`)
    return await this._reformatReplyVisitNumberFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getReplyVisitNumberFromLocation
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatReplyVisitNumberFromLocation(rawData) {
    // Use the helper functions to get the two variable structure restructured data of the raw data report
    return await this._getSimpleTwoVariableStructure(
      rawData,
      "location",
      [1, 2],
      "reply",
      [0],
      "visit",
      0
    );
  }

  /**Get the user visit number of the reply and location specified structured according to reply and location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @param {array} ridArray The array of reply id that the user wants to query data specifically onto
   * @param {array} locationArray The array of location (form: "city,country") that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getVisitNumberFromLocationAndReply(
    startDate,
    endDate,
    locationArray,
    replyArray
  ) {
    // Turn the location array into two arrays of city and country (for future querying)
    let { city, country } = await this._extractLocationInput(locationArray);
    // Create the filter object for querying specific data
    let filterContent = [
      {
        dimensionName: "ga:city",
        operator: "IN_LIST",
        expressions: city,
      },
      {
        dimensionName: "ga:country",
        operator: "IN_LIST",
        expressions: country,
      },
      {
        dimensionName: "ga:eventLabel",
        operator: "IN_LIST",
        expressions: replyArray,
      },
    ];
    let filter = [
      {
        operator: "AND",
        filters: filterContent,
      },
    ];
   // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
   // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:eventLabel",
      },
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for User Visit data By Reply Input and Location Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for User Visit data By Reply Input`)
      return rawReport;
    }
    // Restructure the raw report for frontend rendering need
    logger.info(`Service: Retrieved Data from Google Analytics for User Visit data By Reply Input`)
    return await this._reformatVisitNumberFromLocationAndReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getVisitNumberFromLocationAndReply
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatVisitNumberFromLocationAndReply(rawData) {
    // Use the helper functions to get the two variable structure restructured data of the raw data report
    return await this._getSimpleTwoVariableStructure(
      rawData,
      "reply",
      [0],
      "location",
      [1, 2],
      "visit",
      0
    );
  }

  /**Get the averageStayTime (averageSessionDuration and averagePageDuration) separated by location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getAverageStayTimeFromLocation(startDate, endDate) {
    // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:avgTimeOnPage",
      },
      {
        expression: "ga:avgSessionDuration",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for Average Stay Time data By Location Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for Average Stay Time data By Location Input`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for Average Stay Time data By Location Input`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatAverageStayTimeFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getAverageStayTimeFromLocation
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatAverageStayTimeFromLocation(rawData) {
    // Create the res object to put average session duration and average page duration as two key value pair data (eventually return that)
    let res = {};
    // Use the helper functions to get the one variable structure restructured data of the raw data report
    res["averageSessionDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "location",
      [0, 1],
      "averageSessionDuration",
      0
    );
    // Use the helper functions to get the one variable structure restructured data of the raw data report
    res["averagePageDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "location",
      [0, 1],
      "averagePageDuration",
      1
    );
    return res;
  }

  /**Get the averageStayTime (averageSessionDuration and averagePageDuration) separated by reply
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getAverageStayTimeFromReply(startDate, endDate) {
   // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:avgTimeOnPage",
      },
      {
        expression: "ga:avgSessionDuration",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:eventLabel",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for Average Stay Time data By Reply Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for Average Stay Time data By Reply Input`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for Average Stay Time data By Reply Input`)
   // Restructure the raw report for frontend rendering need
    return await this._reformatAverageStayTimeFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getAverageStayTimeFromReply
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatAverageStayTimeFromReply(rawData) {
    // Create the res object to put average session duration and average page duration as two key value pair data (eventually return that)
    let res = {};
    // Use the helper functions to get the one variable structure restructured data of the raw data report
    res["averageSessionDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "reply",
      [0],
      "averageSessionDuration",
      0
    );
    // Use the helper functions to get the one variable structure restructured data of the raw data report
    res["averagePageDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "reply",
      [0],
      "averagePageDuration",
      1
    );
    return res;
  }

  /**Get the platform and the corresponding user number
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformGeneral(startDate, endDate) {
    // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:deviceCategory",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for General Platform usage data`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for General Platform usage data`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for General Platform usage data`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatgetPlatformGeneral(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformGeneral
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformGeneral(rawData) {
    // Use the helper functions to get the one variable structure restructured data of the raw data report
    return await this._getSimpleOneVariableStructure(
      rawData,
      "platform",
      [0],
      "user",
      0
    );
  }

  /**Get the platform and the corresponding user number separated by location
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformFromLocation(startDate, endDate) {
    // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
   // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:deviceCategory",
      },
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for Platform usage data by Location Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for Platform usage data by Location Input`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for Platform usage data by Location Input`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatgetPlatformFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformFromLocation
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformFromLocation(rawData) {
    // Use the helper functions to get the two variable structure restructured data of the raw data report
    return await this._getSimpleTwoVariableStructure(
      rawData,
      "location",
      [1, 2],
      "platform",
      [0],
      "user",
      0
    );
  }

  /**Get the platform and the corresponding user number separated by reply
   *
   * @param {string} startDate The startDate of the statistics requested
   * @param {string} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformFromReply(startDate, endDate) {
    // Create the metrics object for querying (to be put into the request body)  
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    // Create the dimensions object for querying (to be put into the request body)
    let dimensions = [
      {
        name: "ga:deviceCategory",
      },
      {
        name: "ga:eventLabel",
      },
    ];
    logger.info(`Service: Retrieving Data from Google Analytics for Platform usage data by Reply Input`)
    // Retrieve the raw report using the helpers above by providing information for the request body for querying data
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    // Check the valadity of the returned report
    if (rawReport === null) {
      logger.info(`Service: Failed Retrieving Data from Google Analytics for Platform usage data by Reply Input`)
      return rawReport;
    }
    logger.info(`Service: Retrieved Data from Google Analytics for Platform usage data by Reply Input`)
    // Restructure the raw report for frontend rendering need
    return await this._reformatgetPlatformFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformFromReply
   *
   * @param {object} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformFromReply(rawData) {
    // Use the helper functions to get the two variable structure restructured data of the raw data report
    return await this._getSimpleTwoVariableStructure(
      rawData,
      "reply",
      [1],
      "platform",
      [0],
      "user",
      0
    );
  }
}

module.exports = RetrieveDataService;
