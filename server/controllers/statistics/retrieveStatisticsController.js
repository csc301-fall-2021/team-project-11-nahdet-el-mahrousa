const logger = { log: console.log };
const e = require("express");
const { respond, response } = require("../../utils/response");
const getInput = require("../../utils/user-input");

class retrieveStatisticsController {
  constructor(retrieveStatisticsService) {
    this.retrieveStatisticsService = retrieveStatisticsService;
  }

  /** A helper function that is aiming to be used to validate the date inpu (to be decided if it needs to be used)
   *
   * @param {*} date The date thatneeds to be verified (string)
   * @returns A boolean expression specifying if this date input is a valid input
   */
  async _validateDate(date) {
    if (date.length !== 10) {
      return false;
    } else if (date.charAt(4) !== "-" || date.charAt(7) !== "-") {
      return false;
    } else {
      try {
        let year = parseInt(date.subString(0, 4));
        let month = parseInt(date.subString(5, 7));
        let day = parseInt(date.subString(8, 10));
        if (month > 12 || month < 1) {
          return false;
        } else if (day > 31 || day < 1) {
          return false;
        }
      } catch {
        return false;
      }
    }
  }

  /** Get number of visiting users in the given time period. If a set of location is specified or a set of reply id are specified
   *  or both, then the queried user visit will be the corresponding required data.
   *
   * @param {*} req Request.
   * @returns The statistics object structured according to frontend rendering need.
   */
  async getVisit(req) {
    // Get the input from request body
    const uin = getInput(req, {
      mandatory: ["startDate", "endDate"],
      optional: ["ridArr", "locationArr"],
      fromQuery: true,
    });
    // Check for the valadity of the input
    if (uin === null) {
      logger.log(
        "start date or end date is not found in the request's parameter"
      );
      return response.NOT_SATISFIED;
    } else {
      // Call corresponding service according to the input
      if (uin.hasOwnProperty("ridArr") && uin.hasOwnProperty("locationArr")) {
        return await this._getVisitNumberFromLocationAndReply(uin);
      } else if (uin.hasOwnProperty("ridArr")) {
        return await this._getVisitNumberFromReply(uin);
      } else if (uin.hasOwnProperty("locationArr")) {
        return await this._getVisitNumberFromLocation(uin);
      } else {
        return await this._getVisitNumberFromLocationPerDay(uin);
      }
    }
  }

  /** A helper function that gets the number of user visiting number according to both location and reply input. It includes checking
   * the validity of the location set and reply id set input.
   *
   * @param {*} uin the input object containing startDate, endDate, locationArr, ridArr.
   * @returns the statistics object structured according to frontend required rendering need.
   */
  async _getVisitNumberFromLocationAndReply(uin) {
    // Check the validity of the specific input
    if (!Array.isArray(uin.locationArr) || !Array.isArray(uin.ridArr)) {
      logger.log(
        "invalid type for locationArray or ridArray request parameter"
      );
      return response.NOT_SATISFIED;
    } else {
      // Call the corresponding service to achieve the task
      let res =
        await this.retrieveStatisticsService.getVisitNumberFromLocationAndReply(
          uin.startDate,
          uin.endDate,
          uin.locationArr,
          uin.ridArr
        );
      if (res === null) {
        return response.INTERNAL_SERVER_ERROR;
      }
      return respond({ entity: res });
    }
  }

  /** A helper function that gets the number of user visiting number according to reply input. It includes checking
   * the validity of the reply set input.
   * @param {*} uin the input object containing startDate, endDate, replyArr.
   * @returns the statistics object structured according to frontend required rendering need.
   */
  async _getVisitNumberFromReply(uin) {
    // Check valadity of the specific input
    if (!Array.isArray(uin.ridArr)) {
      logger.log("invalid type for ridArray request parameter");
      return response.NOT_SATISFIED;
    } else {
      // Call the corresponding service to achieve the task
      let res =
        await this.retrieveStatisticsService.getLocationVisitNumberFromReply(
          uin.startDate,
          uin.endDate,
          uin.ridArr
        );
      if (res === null) {
        return response.INTERNAL_SERVER_ERROR;
      }
      return respond({ entity: res });
    }
  }

  /** A helper function that gets the number of user visiting number according to location input. It includes checking
   * the validity of the location set input.
   * @param {*} uin the input object containing startDate, endDate, locationArr.
   * @returns the statistics object structured according to frontend required rendering need.
   */

  async _getVisitNumberFromLocation(uin) {
    // Check the validity of the specific input
    if (!Array.isArray(uin.locationArr)) {
      logger.log("invalid type for locationArray request parameter");
      return response.NOT_SATISFIED;
    } else {
      // Call the corresponding service to achieve the task
      let res =
        await this.retrieveStatisticsService.getReplyVisitNumberFromLocation(
          uin.startDate,
          uin.endDate,
          uin.locationArr
        );
      if (res === null) {
        return response.INTERNAL_SERVER_ERROR;
      }
      return respond({ entity: res });
    }
  }

  /** A helper function that gets the number of user visiting number directly without other specifications.
   * @param {*} uin the input object containing startDate, endDate.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes the date, location, and user visit number).
   */
  async _getVisitNumberFromLocationPerDay(uin) {
    // Call the corresponding service to achieve the task (no input need to conduct validity check)
    let res =
      await this.retrieveStatisticsService.getVisitNumberAndSumFromLocationPerDay(
        uin.startDate,
        uin.endDate
      );
    if (res === null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }

  /** Get average stay time (including the average session time and average page time) in the given time period organized according to the "from" input (which can be "location" or "reply" for now)
   *
   * @param {*} req Request.
   * @returns The statistics object structured according to frontend rendering need.
   */
  async getAverageStayTime(req) {
    // Get the input from request body
    const uin = getInput(req, {
      mandatory: ["startDate", "endDate", "from"],
      fromQuery: true,
    });
    // Check for the valadity of the input
    if (uin === null) {
      logger.log(
        "start date or end date or from option is not found in the request"
      );
      return response.NOT_SATISFIED;
    } else {
      // Call corresponding service according to the input
      let fromType = ["location", "reply"];
      if (!fromType.includes(uin.from)) {
        logger.log("type not supported");
        return response.NOT_SATISFIED;
      }
      if (uin.from === "location") {
        return await this._getAverageStayTimeFromLocation(uin);
      } else {
        return await this._getAverageStayTimeFromReply(uin);
      }
    }
  }

  /** A helper function that gets the average stay time (inlcuding the average page duration and average session duration) that is organized according to location.
   * @param {*} uin the input object containing startDate, endDate, from.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes the location, average page duration, average session duration).
   */
  async _getAverageStayTimeFromLocation(uin) {
    // Call the corresponding service to achieve the task
    let res =
      await this.retrieveStatisticsService.getAverageStayTimeFromLocation(
        uin.startDate,
        uin.endDate
      );
    if (res === null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }

  
  /** A helper function that gets the average stay time (inlcuding the average page duration and average session duration) that is organized according to reply.
   * @param {*} uin the input object containing startDate, endDate, from.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes the reply, average page duration, average session duration).
   */
  async _getAverageStayTimeFromReply(uin) {
    // Call the corresponding service to achieve the task
    let res = await this.retrieveStatisticsService.getAverageStayTimeFromReply(
      uin.startDate,
      uin.endDate
    );
    if (res === null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }

  /** Get platform inforamtion in the given time period organized according to the optional "from" input (which can be "location" or "reply" for now)
   *
   * @param {*} req Request.
   * @returns The statistics object structured according to frontend rendering need.
   */
  async getPlatform(req) {
    // Get the input from request body
    const uin = getInput(req, {
      mandatory: ["startDate", "endDate"],
      optional: ["from"],
      fromQuery: true,
    });
    // Check for the validity of the input
    if (uin === null) {
      logger.log(
        "start date or end date or from option is not found in the request"
      );
      return response.NOT_SATISFIED;
    } else {
      // Call corresponding service according to the input
      if (!uin.hasOwnProperty("from")) {
        return await this._getPlatformGeneral(uin);
      }
      let fromType = ["location", "reply"];
      if (!fromType.includes(uin.from)) {
        logger.log("type not supported");
        return response.NOT_SATISFIED;
      }
      if (uin.from === "location") {
        return await this._getPlatformFromLocation(uin);
      } else {
        return this._getPlatformFromReply(uin);
      }
    }
  }

  /** A helper function that gets the platform informatio without any "from" input specification.
   * @param {*} uin the input object containing startDate, endDate.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes the platform name and the number of clients using this platform to visit the website).
   */
  async _getPlatformGeneral(uin) {
    // Call the corresponding service to achieve the task
    let res = await this.retrieveStatisticsService.getPlatformGeneral(
      uin.startDate,
      uin.endDate
    );
    if (res === null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }

  /** A helper function that gets the platform informatio according to location.
   * @param {*} uin the input object containing startDate, endDate.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes location, the platform name and the number of clients using this platform to visit the website).
   */
  async _getPlatformFromLocation(uin) {
    // Call the corresponding service to achieve the task
    let res = await this.retrieveStatisticsService.getPlatformFromLocation(
      uin.startDate,
      uin.endDate
    );
    if (res === null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }

  /** A helper function that gets the platform informatio without any "from" input specification according reply.
   * @param {*} uin the input object containing startDate, endDate.
   * @returns the statistics object structured according to frontend required rendering need (statistics includes reply, the platform name and the number of clients using this platform to visit the website).
   */
  async _getPlatformFromReply(uin) {
    // Call te corresponding service to achieve the task
    let res = await this.retrieveStatisticsService.getPlatformFromReply(
      uin.startDate,
      uin.endDate
    );
    if (res == null) {
      return response.INTERNAL_SERVER_ERROR;
    }
    return respond({ entity: res });
  }
}

module.exports = retrieveStatisticsController;
