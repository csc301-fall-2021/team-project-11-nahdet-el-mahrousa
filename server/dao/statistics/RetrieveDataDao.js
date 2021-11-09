const logger = { log: console.log }

const { Message } = require('../../models/models.mongoose')
const google = require("googleapis")
const googleAnalytics = google.analyticsreporting('v4')
class RetrieveDataDao {
    constructor(viewId) {
        this.viewId = viewId

    }

    
    /**
     * Retrieve a bsic google analytics report data
     * @param {Date} startDate The start date of the query 
     * @param {*} endDate The end date of the query
     */
    async retriveData (startDate, endDate){

            googleAnalytics.reports.batchGet({
				headers: {
					'Content-Type': 'application/json'
				},
                body: {
                    reportRequests: [
                      {
                        viewId: this.viewId,
                        dateRanges: [
                          {
                            startDate: startDate,
                            endDate: endDate
                          }
                        ],
                        metrics: [
                            {
                              expression: 'ga:continent'
                            },
                            {
                              expression: 'ga:country'
                            },
                            {
                              expression: 'ga:city'
                            }
                          ]
                        }
                      ]
                }            
            })
        }
    

    }

module.exports = RetrieveDataDao;