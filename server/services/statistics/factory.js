const retrieveDataService = require('./index')
const configGA = require('../../gateways/analysis')
const {MessageDao, ReplyDao} = require('../../dao')


function createRetrieveStatisticsService() {
    const googleAnalyticsGateway = new configGA()
    const replyDao = new ReplyDao()
    const retrieveDataService = new retrieveDataService(googleAnalyticsGateway, replyDao)
    return retrieveDataService
}
module.exports = createRetrieveStatisticsService