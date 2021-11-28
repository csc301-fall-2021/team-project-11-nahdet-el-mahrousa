const CreateRetrieveStatisticsService = require('../../services/statistics/factory')
const RetrieveStatisticsController = require('./retrieveStatisticsController')


function createStatisticsController() {
    const retrieveStatisticsService = CreateRetrieveStatisticsService()
    const  retrieveStatisticsController = new RetrieveStatisticsController(retrieveStatisticsService)
    return retrieveStatisticsController
}


module.exports = createStatisticsController()
