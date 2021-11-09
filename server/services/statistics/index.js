// var logger = require('logger').createLogger()
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond, response } = require('../../utils/response')
const logger = { log: console.log }

class RetrieveDataService {
    constructor(retrieveDataDao = null) {
        this.retrieveDataDao = retrieveDataDao
    }

    async retrieveData(viewId, startDate, endDate){
        const response = await this.retrieveDataDao.retrieveData(viewId, startDate, endDate)
        return response
    }


}


module.exports = RetrieveDataService
