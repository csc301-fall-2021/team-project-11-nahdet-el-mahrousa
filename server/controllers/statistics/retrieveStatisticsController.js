const logger = { log: console.log }
const { respond, response } = require('../../utils/response')

class retrieveStatisticsController {
    constructor(retrieveStatisticsService) {
        this.retrieveStatisticsService = retrieveStatisticsService
    }

    async retrieveStatistics(req){
        const viewId = req.viewId
        const startDate = req.startDate
        const endDate = req.endDate
        this.retrieveStatisticsService.retrieveData(viewId, startDate, endDate)
    }

}

module.exports = retrieveStatisticsService