const createRetrieveStatisticsService = require('../../services/statistics/factory')
const retrieveStatisticsController = require('./')


function createStatisticsController() {
    const retrieveStatisticsService = createRetrieveStatisticsService()
    const  retrieveStatisticsController = new retrieveStatisticsController(retrieveStatisticsService)
    return retrieveStatisticsController
}


module.exports = createStatisticsController()
