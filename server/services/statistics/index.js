// var logger = require('logger').createLogger()
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond, response } = require('../../utils/response')
const logger = { log: console.log }

class RetrieveDataService {
    constructor(analyticsGateway, replyDao) {
        this.analyticsGateway = analyticsGateway
        this.replyDao = replyDao
    }

    async retrieveData(viewId, startDate, endDate){
        const response = await this.retrieveDataDao.retrieveData(viewId, startDate, endDate)
        return response
    }

    /**Helper function that receives a correctly formatted request body object for google analaytics reporting api and 
     * return the report retrieved from that api
     * 
     * @param {*} request A correctly formatted request body object containing the specific requirement for the report
     * @returns a google analytics report object to responde to the request object
     */
    async _getReports (request) {

        await this.analyticsGateway.authorize();
    
        let request = {
            'headers': {'Content-Type': 'application/json'}, 
            'auth': this.analyticsGateway.getGoogleJWT(), 
            'resource': request
        };
    
        let res = await this.analyticsGateway.getAnalytics().reports.batchGet(request);
        if (res.StatusCode !== 200){
            return null
        }
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
                        viewId: this.analyticsGateway.getView(),
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
            let rawReport = await this._getReports(geoLocationRequest)
            let reformattedReport = this._getReformattedReport(rawReport)
            return reformattedReport
            /*
            .then(rawReport => {return this._getReformattedReport(rawReport)})
            .catch(e => logger.log(e))*/
              
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



    async getVisitNumberAndSumFromLocationPerDay(startDate, endDate){

        let request = {
                "reportRequests": [
                    {
                    "viewId": this.analyticsGateway.getView(),
                    "dateRanges": [
                        {
                        "startDate": startDate,
                        "endDate": endDate
                        }
                    ],
                    "metrics": [
                        {
                        "expression": "ga:users"
                        }
                    ],
                    "dimensions": [
                        {
                        "name": "ga:date"
                        },
                        {
                        "name": "ga:country"
                        },
                        {
                        "name": "ga:city"
                        }
    
                    ]
                    }
                ]
            }
  
            
        

    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
        if (rawReport === null){
            return null
        }
    } catch{
        return null
    }  
    return this._reformatVisitNumberAndSumFromLocationPerDay(rawReport)

        /*
        return {
            "#date1": [
                {
                    "#Toronto":{
                        "number of visit": #5
                    },
                    "sum per day": #5
                }
            ],
            "sum total": #5
        }
        */
    }
 
      
    async _reformatVisitNumberAndSumFromLocationPerDay(rawData){

        
        try{
            let report = rawData["reports"]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let date = currRow["dimensions"][0]
                let countryName = currRow["dimensions"][1]
                let cityName = currRow["dimensions"][2]
                let city = cityName+ ", " + countryName
                let visitCount =parseInt(currRow["metrics"][0]["values"][0])
                if (!date in res){
                    let cityObject = {}
                    cityObject[city] = visitCount
                    res[date] = cityObject
                } else if (!city in res[date]) {
                    res[date][city] = visitCount
                } else {
                    res[date][city] += visitCount
                }
            }
            for (let [date, cityObject] of Object.entries(res)){
                let counter = 0
                for (let [city, visit] of Object.entries(cityObject)){
                    counter += visit
                }
                res[date]["sumPerDay"] = counter
            }
            res["sumTotal"] = reportData["total"][0]["values"][0]
            return res
            
        }catch{
            logger.log("Wrong raw data format input")
            return null
        }

    }
    
    async getLocationVisitNumberFromReply(startDate, endDate, ridArray){

        let ridFilter = []
        for (let rid of ridArray){
            ridFilter.push({
                "dimensionName": "ga:eventLabel",
                "operator": "EQUAL",
                "expressions": rid.toString()
            })
        }

        let request = {
            "reportRequests": [
                {
                "viewId": this.analyticsGateway.getView(),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": [
                    {
                    "expression": "ga:users"
                    }
                ],
                "dimensions": [
                    {
                    "name": "ga:eventLabel"
                    },
                    {
                    "name": "ga:city"
                    },
                    {
                    "name": "ga:country"
                    }
                ],
                "dimensionFilterClauses": [
                    {
                        "filters": ridFilter
                    }
                ]
            }
        ]
    }                       
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch{
        return null
    }  
    return this._reformatLocationVisitNumberFromReply(rawReport)
        return {

            "#reply1": 
                {"#Toronto": #5,
                 "replyLabel": "#Hello",
                 "replyContent": "#Hi there!"},
            "#reply2":
                {"#Toronto": #1,
                "replyLabel": "#Hello",
                "replyContent": "#Hi there!"}
        }
    }

    async _reformatLocationVisitNumberFromReply(rawData){

        try{
            let report = rawData["reports"]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                let countryName = currRow["dimensions"][1]
                let cityName = currRow["dimensions"][2]
                let city = cityName + ", " + countryName
                let visitCount =parseInt(currRow["metrics"][0]["values"][0])
                if (!rid in res){
                    let cityObject = {}
                    cityObject[city] = visitCount
                    res[rid] = cityObject                    
                } else if (!city in res[rid]){
                    res[rid][city] = visitCount
                } else {
                    res[rid][city] += visitCount
                }
 
            }

            let ridArray = []
            for (let [rid, cityObject] of Object.entries(res)){
                let counter = 0
                for (let [city, visit] of Object.entries(cityObject)){
                    counter += visit
                }
                res[rid]["sumPerReply"] = counter
                ridArray.push(rid)
            }

            res["sumTotal"] = reportData["total"][0]["values"][0]
            /*
            let replyArray = this.replyDao.getMultiple(ridArray)
            replyArray.map(function(val){
                 
            })
            */
            // TODO: Try to query them together
            for(let [rid, cityObject] of Object.entries(res)){
                let replyInfo = this.replyDao.get(rid)
                cityObject["replyLabel"] = replyInfo["label"]
                cityObject["replyContent"] = replyInfo["content"]
            }           
            
            
            return res
            
        }catch{
            logger.log("Wrong raw data format input")
            return null
        }
    }



    async getReplyVisitNumberFromLocation(startDate, endDate, locationArray){

        let locationFilter = []
        for (let location of locationArray){
            locationFilter.push({
                "dimensionName": "ga:country",
                "operator": "EQUAL",
                "expressions": location
            })
        }

        let request = {
            "reportRequests": [
                {
                "viewId": this.analyticsGateway.getView(),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": [
                    {
                    "expression": "ga:users"
                    }
                ],
                "dimensions": [
                    {
                    "name": "ga:eventLabel"
                    },
                    {
                    "name": "ga:country"
                    }
                ],
                "dimensionFilterClauses": [
                    {
                        "filters": locationFilter
                    }
                ]
            }
        ]
    }                       
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch{
        return null
    }  
    return this._reformatReplyVisitNumberFromLocation(rawReport)
        return {
            "#Toronto":
            {"#label-content": {
                "visitCount": #5,
                "replyLabel": "#Hello",
                "replyContent": "#Hi there!"
            }},
            "#Vancouver":
            {"#label-content": {
                "visitCount": #5,
                "replyLabel": "#Hello",
                "replyContent": "#Hi there!"
            }},
        }
    }


    async _reformatLocationVisitNumberFromReply(rawData){

        try{
            let report = rawData["reports"]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                let country = currRow["dimensions"][1]
                let visitCount =parseInt(currRow["metrics"][0]["values"][0])
                if (!country in res){
                    let replyObject = {}
                    replyObject[rid]["visitCount"] = visitCount
                    res[country] = replyObject                    
                } else if (!rid in res[country]){
                    res[country][rid]["visitCount"] = visitCount
                } else {
                    res[country][rid]["visitCount"] += visitCount
                }
 
            }


            for (let [country, replyObject] of Object.entries(res)){
                let counter = 0
                for (let [rid, infoObject] of Object.entries(replyObject)){
                    counter += infoObject["visitCount"]
                }
                res[country]["sumPerCity"] = counter
            }

            res["sumTotal"] = reportData["total"][0]["values"][0]
            /*
            let replyArray = this.replyDao.getMultiple(ridArray)
            replyArray.map(function(val){
                 
            })
            */
            // TODO: Try to query them together
            for(let [country, replyObject] of Object.entries(res)){
                for(let [rid, replyObjectBody] of Object.entries(replyObject)){
                    let replyInfo = this.replyDao.get(rid)
                    replyObjectBody["replyLabel"] = replyInfo["label"]
                    replyObjectBody["replyContent"] = replyInfo["content"]
                }
            }           
            
            
            return res
            
        }catch{
            logger.log("Wrong raw data format input")
            return null
        }
    }

    async getAverageStayTimeFromLocation(startDate, endDate){
        let request = {
            "reportRequests": [
                {
                "viewId": this.analyticsGateway.getView(),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": [
                    {
                    "expression": "ga:avgTimeOnPage"
                    },
                    {
                        "expression": "ga:avgSessionDuration"
                    }
                ],
                "dimensions": [
                    {
                    "name": "ga:country"
                    }
                ]
            }
        ]
    } 
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch{
        return null
    }  
    return this._reformatAverageStayTimeFromLocation(rawReport)
        return {"#Toronto":{"averageSessionDuration": #10, "averagePageDuration": #10}}
    }
 
    async _reformatAverageStayTimeFromLocation(rawData){
        try{
        let report = rawData["reports"]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            let countryName = currRow["dimensions"][1]
            let cityName = currRow["dimensions"][2]
            let city = cityName + ", " + countryName
            
            res[city] = {"averageSessionDuration": currRow["metrics"][0]["value"][0], "averagePageDuraction": currRow["metrics"][0]["value"][1]}
            
        }
        return res
        }catch{
            logger.log("Wrong raw data format input")
            return null
        }
    }

    async getAverageStayTimeFromReply(startDate, endDate){
        let request = {
            "reportRequests": [
                {
                "viewId": this.analyticsGateway.getView(),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": [
                    {
                    "expression": "ga:avgTimeOnPage"
                    },
                    {
                        "expression": "ga:avgSessionDuration"
                    }
                ],
                "dimensions": [
                    {
                    "name": "ga:eventLabel"
                    }
                ]
            }
        ]
    } 
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch{
        return null
    }  
    return this._reformatAverageStayTimeFromReply(rawReport)
        return {"#rid1":{"averageSessionDuration": #10, 
        "averagePageDuration": #10,                 
        "replyLabel": "#Hello",
        "replyContent": "#Hi there!"}}
    }

    async _reformatAverageStayTimeFromReply(rawData){
        try{
            let report = rawData["reports"]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                res[rid] = {"averageSessionDuration": currRow["metrics"][0]["value"][0], "averagePageDuraction": currRow["metrics"][0]["value"][1]}
            }
            for(let [rid, replyObject] of Object.entries(res)){
                let replyInfo = this.replyDao.get(rid)
                replyObject["replyLabel"] = replyInfo["label"]
                replyObject["replyContent"] = replyInfo["content"]
            }
               
            return res
        }catch{
            logger.log("Wrong raw data format input")
            return null
        }
    }




    /*
    async getInteractionTime(startDate, endDate){
        return {"interaction time": #5}
    }
    */

    async getPlatformFromLocation(startDate, endDate){
        let request = {
            "reportRequests": [
                {
                "viewId": this.analyticsGateway.getView(),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": [
                    {
                    "expression": "ga:users"
                    }
                ],
                "dimensions": [
                    {
                    "name": "ga:deviceCategory"
                    },
                    {
                    "name": "ga:country"
                    },
                    {
                    "name": "ga:city"
                    }
                    
                ]
            }
        ]
    } 
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch{
        return null
    }  
    return this._reformatgetPlatformFromLocation(rawReport)
        return {
            "#Toront":{"#laptop": #5}
        }

    }




async __reformatgetPlatformFromLocation(rawData){
    try{
        let report = rawData["reports"]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            // TODO: Combine city and Country
            let countryName = currRow["dimensions"][1]
            let cityName = currRow["dimensions"][2]
            let city = cityName + ", " + countryName

            let platform = currRow["dimensions"][0]
            let visitCount =parseInt(currRow["metrics"][0]["values"][0])
            if (!city in res){
                let platformObject = {}
                platformObject[platform] = visitCount
                res[city] = platformObject                    
            } else if (!platform in res[city]){
                res[city][platform] = visitCount
            } else {
                res[city][platform] += visitCount
            }

        }
        return res
    }catch{
        logger.log("Wrong raw data format input")
        return null
    }
}


async getPlatformFromReply(startDate, endDate){
    let request = {
        "reportRequests": [
            {
            "viewId": this.analyticsGateway.getView(),
            "dateRanges": [
                {
                "startDate": startDate,
                "endDate": endDate
                }
            ],
            "metrics": [
                {
                "expression": "ga:users"
                }
            ],
            "dimensions": [
                {
                "name": "ga:deviceCategory"
                },
                {
                "name": "ga:eventLabel"
                }
            ]
        }
    ]
} 
let rawReport = null
try{
    rawReport = await this._getReports(request)  
} catch{
    return null
}  
return this._reformatgetPlatformFromReply(rawReport)
    return {
        #rid1:{"#laptop": #5, "replyLabel": "Hi", "replyContent": "Hello"}
    }

}

async _reformatgetPlatformFromReply(rawData){
    try{
        let report = rawData["reports"]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            let rid = currRow["dimensions"][0]
            let platform = currRow["dimensions"][1]
            let visitCount =parseInt(currRow["metrics"][0]["values"][0])
            if (!rid in res){
                let platformObject = {}
                platformObject[platform] = visitCount
                res[rid] = platformObject                    
            } else if (!platform in res[rid]){
                res[rid][platform] = visitCount
            } else {
                res[rid][platform] += visitCount
            }

        }
        
        for(let [rid, replyObject] of Object.entries(res)){
            let replyInfo = this.replyDao.get(rid)
            replyObject["replyLabel"] = replyInfo["label"]
            replyObject["replyContent"] = replyInfo["content"]
        }
           
        return res
    }catch{
        logger.log("Wrong raw data format input")
        return null
    }
}






 

}


module.exports = RetrieveDataService
