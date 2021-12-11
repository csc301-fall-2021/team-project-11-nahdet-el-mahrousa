// var logger = require('logger').createLogger()
const logger = { log: console.log };

class RetrieveDataService {
  constructor(analyticsGateway, replyDao) {
    this.analyticsGateway = analyticsGateway;
    this.replyDao = replyDao;
  }

  /**Helper function that receives a correctly formatted request body object for google analaytics reporting api and
   * return the raw report data retrieved from that api
   *
   * @param {*} request A correctly formatted request body object containing the specific requirement for the report
   * @returns a google analytics report object to respond to the request object; If the report is invalid, return null
   */
  async _getReports(requestBody) {
    await this.analyticsGateway.authorize();

    let request = {
      headers: { "Content-Type": "application/json" },
      auth: await this.analyticsGateway.getGoogleJWT(),
      resource: requestBody,
    };

    let res = await (
      await this.analyticsGateway.getAnalytics()
    ).reports.batchGet(request);
    if (res.status !== 200) {
      return null;
    }
    return res.data;
  }

  /** The helper function that generates the correctly structured request object used for sending request to retrieve statistics from google analytics
   *
   * Note: The input should all follow the correct form specificed in the google analytics reporting api documentation https://developers.google.com/analytics/devguides/reporting/core/v4/rest/v4/reports/batchGet#ReportRequest
   * @param {*} startDate The startDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {*} endDate The endDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {*} metrics The metrics object of the request
   * @param {*} dimensions The dimensions object of the request
   * @param {*} dimensionFilter The optional dimension filter object (set to null for default)
   * @param {*} pageToken The optional pageToken value for requesting a specific page of the report (set to null for default)
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
    if (dimensionFilter === null) {
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

    if (pageToken !== null) {
      resRequest["reportRequests"][0]["pageToken"] = pageToken;
    }
    return resRequest;
  }

  /** The helper function that one page of a rawReport to the total rawReport(which is a report object combining multiple pages)
   *
   * @param {*} totalRawReport The report object that combines multiple pages of single page report object
   * @param {*} rawReport The single page report object
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
   * @param {*} startDate The startDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {*} endDate The endDate of the statistics to query (It has to be in the form of "yyyy-mm-dd")
   * @param {*} metrics The metrics object of the request
   * @param {*} dimensions The dimensions object of the request
   * @param {*} dimensionFilter The optional dimension filter object (set to null for default)
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
    let request = await this._generateRequest(
      startDate,
      endDate,
      metrics,
      dimensions,
      dimensionFilter
    );
    let totalRawReport = await this._getReports(request);
    if (totalRawReport === null) {
      return totalRawReport;
    }
    if ("nextPageToken" in totalRawReport["reports"][0]) {
      pageToken = totalRawReport["reports"][0]["nextPageToken"];
    } else {
      pageToken = null;
    }

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
    return totalRawReport;
  }

  /** The helper function that handles the inital extraction of the raw data report returned from google analytics
   *  in order to make restructure easier
   *
   * @param {*} rawData The raw data report object returned from requesting statistics from google analytics
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
   * @param {*} inputName The name(key) of the new field that needs to be assigned
   * @param {*} inputLocation An array containing the locations(index) of the name(value) (or elements required to form the name value) in the currRow's "dimensions" array field
   * @param {*} currObject The current object to assign to new variable field to
   * @param {*} currRow The current row from the raw data report to get the required name value
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
        logger.log(err);
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
   * @param {*} rawData The rawData report object
   * @param {*} xName The x value (first value) name for the two variable relationship structure
   * @param {*} xLocation An array containing the locations(index) of the x name(value) (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {*} yName The y value (second value) name for the two variable relationship structure
   * @param {*} yLocation An array containing the locations(index) of the y name(value) (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {*} valueName The name of the value for the two varaiable relationship structure
   * @param {*} valueLocation An integer specifying the location(index) of the value in the rawData's "rows"'s "metrics"'s first element's "values" array field
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
      let { report, reportData, reportDataRow, reportRowCount, res } =
        await this._initialExtractReport(rawData);
      res["data"] = [];
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
      return res;
    } catch (err) {
      logger.log(err);
      return null;
    }
  }

  /** The helper function that restructures the raw data report to a simple one varaible relationship structure that can be used for frontend rendering
   *
   * @param {*} rawData The rawData report object
   * @param {*} xName The variable name for the one variable relationship structure
   * @param {*} xLocation An array containing the locations(index) of the variable name value (or elements required to form the name value) in the rawData's "rows"'s "dimensions" array field
   * @param {*} valueName The name of the value for the one varaiable relationship structure
   * @param {*} valueLocation An integer specifying the location(index) of the value in the rawData's "rows"'s "metrics"'s first element's "values" array field
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
      let { report, reportData, reportDataRow, reportRowCount, res } =
        await this._initialExtractReport(rawData);
      res["data"] = [];
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
      return res;
    } catch (err) {
      logger.log(err);
      return null;
    }
  }

  // ===============================================================================================================================================================================
  // The above functions are the general helper functions for this service. The below services will be the specific services for each feature (and some associated helper functions)
  // ===============================================================================================================================================================================

  /**Get the user visit number separated by day and location
   *
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getVisitNumberAndSumFromLocationPerDay(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
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

    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatVisitNumberAndSumFromLocationPerDay(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getVisitNumberAndSumFromLocationPerDay
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatVisitNumberAndSumFromLocationPerDay(rawData) {
    try {
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
      logger.log(err);
      logger.log("Wrong raw data format input");
      return null;
    }
  }

  /**Get the user visit number of the reply specified structured according to reply and location
   *
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @param {*} ridArray The array of reply id that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */

  async getLocationVisitNumberFromReply(startDate, endDate, ridArray) {
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
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

    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatLocationVisitNumberFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getLocationVisitNumberFromReply
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatLocationVisitNumberFromReply(rawData) {
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
   * @param {*} locationArray the location array in the form of "city,country"
   * @returns The array of city and an array of country
   */
  async _extractLocationInput(locationArray) {
    let location = locationArray.map((value) => {
      return value.split(",");
    });
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
    return { city, country };
  }

  /**Get the user visit number of the location specified structured according to reply and location
   *
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @param {*} locationArray The array of location (form: "city,country") that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getReplyVisitNumberFromLocation(startDate, endDate, locationArray) {
    let { city, country } = await this._extractLocationInput(locationArray);
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
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
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatReplyVisitNumberFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getReplyVisitNumberFromLocation
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatReplyVisitNumberFromLocation(rawData) {
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @param {*} ridArray The array of reply id that the user wants to query data specifically onto
   * @param {*} locationArray The array of location (form: "city,country") that the user wants to query data specifically onto
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getVisitNumberFromLocationAndReply(
    startDate,
    endDate,
    locationArray,
    replyArray
  ) {
    let { city, country } = await this._extractLocationInput(locationArray);
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
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
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

    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions,
      filter
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatVisitNumberFromLocationAndReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getVisitNumberFromLocationAndReply
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatVisitNumberFromLocationAndReply(rawData) {
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getAverageStayTimeFromLocation(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:avgTimeOnPage",
      },
      {
        expression: "ga:avgSessionDuration",
      },
    ];
    let dimensions = [
      {
        name: "ga:country",
      },
      {
        name: "ga:city",
      },
    ];
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatAverageStayTimeFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getAverageStayTimeFromLocation
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatAverageStayTimeFromLocation(rawData) {
    let res = {};
    res["averageSessionDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "location",
      [0, 1],
      "averageSessionDuration",
      0
    );
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getAverageStayTimeFromReply(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:avgTimeOnPage",
      },
      {
        expression: "ga:avgSessionDuration",
      },
    ];
    let dimensions = [
      {
        name: "ga:eventLabel",
      },
    ];
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatAverageStayTimeFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getAverageStayTimeFromReply
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatAverageStayTimeFromReply(rawData) {
    let res = {};
    res["averageSessionDuration"] = await this._getSimpleOneVariableStructure(
      rawData,
      "reply",
      [0],
      "averageSessionDuration",
      0
    );
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformGeneral(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    let dimensions = [
      {
        name: "ga:deviceCategory",
      },
    ];
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatgetPlatformGeneral(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformGeneral
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformGeneral(rawData) {
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformFromLocation(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
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
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatgetPlatformFromLocation(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformFromLocation
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformFromLocation(rawData) {
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
   * @param {*} startDate The startDate of the statistics requested
   * @param {*} endDate The endDate of the statistics requested
   * @returns The structured result statistics data for frontend to render, and it will return null if there is an internal service error
   */
  async getPlatformFromReply(startDate, endDate) {
    let metrics = [
      {
        expression: "ga:users",
      },
    ];
    let dimensions = [
      {
        name: "ga:deviceCategory",
      },
      {
        name: "ga:eventLabel",
      },
    ];
    let rawReport = await this._getRawReport(
      startDate,
      endDate,
      metrics,
      dimensions
    );
    if (rawReport === null) {
      return rawReport;
    }
    return await this._reformatgetPlatformFromReply(rawReport);
  }

  /** The helper function that restructures the raw data report returned from getPlatformFromReply
   *
   * @param {*} rawData The raw data report
   * @returns The restrucutred data report for frontend to render
   */
  async _reformatgetPlatformFromReply(rawData) {
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
