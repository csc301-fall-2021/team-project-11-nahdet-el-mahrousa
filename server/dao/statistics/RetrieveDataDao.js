const logger = { log: console.log }

const google = require("googleapis")
const googleAnalytics = google.analyticsreporting('v4')
const service_account = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIAL_KEY);
const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];

class RetrieveDataDao {

    constructor() {
  
      this.googleJwt = new google.auth.JWT(
        service_account.client_email, 
        null, 
        service_account.private_key, 
        scopes
      );
      this.viewId = process.env.GOOGLE_ANALYTICS_ALL_WEB_DATA_VIEW_ID;
    }



    

    /**Helper function that receives a correctly formatted request body object for google analaytics reporting api and 
     * return the report retrieved from that api
     * 
     * @param {*} request A correctly formatted request body object containing the specific requirement for the report
     * @returns a google analytics report object to responde to the request object
     */
    async _getReports (request) {

      await this.googleJwt.authorize();
  
      let request = {
          'headers': {'Content-Type': 'application/json'}, 
          'auth': jwt, 
          'resource': request
      };
  
      return await googleAnalytics.reports.batchGet(request);
  };


    /**
     * Retrieve a bsic google analytics report for geolocation
     * @param {Date} startDate The start date of the query 
     * @param {*} endDate The end date of the query
     * @return The data containing the information about the 
     */
    async retriveGeoLocationData (startDate, endDate){
      

      let geoLocationRequest = {
                reportRequests: [
                  {
                    viewId: this.viewId,
                    dateRanges: [
                      {
                        startDate: startDate,
                        endDate: endDate
                      }
                    ],
                    metrics:[
                      {"expression": "ga:clientid"}
                    ],
                    dimensions: [
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
        return this._getReports(geoLocationRequest)
          .then(rawReport => {return this._getReformattedReport(rawReport)})
          .catch(e => logger.log(e))
        
    
    }

    /**
     * 
     * @param {*} rawReport 
     */
    async _getReformattedReport(rawReport){

    }

    /**
     * Retrieve a bsic google analytics report for message event information
     * @param {Date} startDate The start date of the query 
     * @param {*} endDate The end date of the query
     * @return The data containing the information about the 
     */
     async retriveMessageEventInfoData (startDate, endDate){
      

      let messageEventRequest = {
                reportRequests: [
                  {
                    viewId: this.viewId,
                    dateRanges: [
                      {
                        startDate: startDate,
                        endDate: endDate
                      }
                    ],
                    metrics:[
                      {"expression": "ga:clientid"}
                    ],
                    dimensions: [
                        {
                          name: 'ga:eventCategory'
                        },
                        {
                          name: 'ga:eventAction'
                        },
                        {
                          name: 'ga:eventLabel'
                      
                        }
                      ]
                    }
                  ]
            }                       
        let rawReport = await this._getReports(messageEventRequest)
        return this._getReformattedReport(rawReport)
        
    }
    /*
  {
    "reports": [
      {
        "columnHeader": {
          "dimensions": [
            "ga:eventCategory"
          ],
          "metricHeader": {
            "metricHeaderEntries": [
              {
                "name": "ga:users",
                "type": "INTEGER"
              }
            ]
          }
        },
        "data": {
          "rows": [
            {
              "dimensions": [
                "Message"
              ],
              "metrics": [
                {
                  "values": [
                    "1"
                  ]
                }
              ]
            }
          ],
          "totals": [
            {
              "values": [
                "1"
              ]
            }
          ],
          "rowCount": 1,
          "minimums": [
            {
              "values": [
                "1"
              ]
            }
          ],
          "maximums": [
            {
              "values": [
                "1"
              ]
            }
          ]
        }
      }
    ]
  }
    
    
    
    
    */


  /*
{
  "reports": [
    {
      "columnHeader": {
        "dimensions": [
          "ga:eventCategory",
          "ga:eventAction",
          "ga:eventLabel",
          "ga:continent",
          "ga:country",
          "ga:city"
        ],
        "metricHeader": {
          "metricHeaderEntries": [
            {
              "name": "ga:users",
              "type": "INTEGER"
            }
          ]
        }
      },
      "data": {
        "rows": [
          {
            "dimensions": [
              "Message",
              "click",
              "5",
              "Americas",
              "Canada",
              "Toronto"
            ],
            "metrics": [
              {
                "values": [
                  "1"
                ]
              }
            ]
          }
        ],
        "totals": [
          {
            "values": [
              "1"
            ]
          }
        ],
        "rowCount": 1,
        "minimums": [
          {
            "values": [
              "1"
            ]
          }
        ],
        "maximums": [
          {
            "values": [
              "1"
            ]
          }
        ]
      }
    }
  ]
}

  */





  }

module.exports = RetrieveDataDao;