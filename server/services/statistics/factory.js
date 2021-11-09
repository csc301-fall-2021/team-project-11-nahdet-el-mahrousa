const retrieveDataDao = require('../../dao/statistics')
const retrieveDataService = require('./index')


function createRetrieveStatisticsService() {
    const retrieveDataDao = new retrieveDataDao(this.process.trackId)

    const retrieveDataService = new retrieveDataService(retrieveDataDao)
    return retrieveDataService
}
module.exports = createRetrieveStatisticsService