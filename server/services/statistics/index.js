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
    async _getReports (requestBody) {

        await this.analyticsGateway.authorize();
    
        let request = {
            'headers': {'Content-Type': 'application/json'}, 
            'auth': (await this.analyticsGateway.getGoogleJWT()), 
            'resource': requestBody
        };
    
        
        let res = await ((await this.analyticsGateway.getAnalytics()).reports.batchGet(request));

        if (res.status !== 200){
            return null
        }

        return res.data
    };
    
    
    



    async getVisitNumberAndSumFromLocationPerDay(startDate, endDate){

        let request = {
                "reportRequests": [
                    {
                    "viewId": (await this.analyticsGateway.getView()),
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
    } catch(err){

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
            let report = rawData["reports"][0]
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
                if (!(date in res)){
                    let cityObject = {}
                    cityObject[city] = visitCount
                    res[date] = cityObject
                } else if (!(city in res[date])) {
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

            res["sumTotal"] = reportData["totals"][0]["values"][0]
            return res
            
        }catch{
            logger.log("Wrong raw data format input")
            //logger.log(err)
            return null
        }

    }
    
    async getLocationVisitNumberFromReply(startDate, endDate, ridArray){

        let ridFilter = []
        for (let rid of ridArray){
            ridFilter.push({
                "dimensionName": "ga:eventLabel",
                "operator": "EXACT",
                "expressions": rid.toString()
            })
        }

        let request = {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
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

    //console.log(res)    

    try{
        rawReport = await this._getReports(request)  
    } catch(err){

        return null
    }  
    return this._reformatLocationVisitNumberFromReply(rawReport)
        /*
        return {

            "#reply1": 
                {"#Toronto": #5,
                 "replyLabel": "#Hello",
                 "replyContent": "#Hi there!"},
            "#reply2":
                {"#Toronto": #1,
                "replyLabel": "#Hello",
                "replyContent": "#Hi there!"}
            "sumPerReply": #6
        }
        */
    }


    async _reformatLocationVisitNumberFromReply(rawData){

        try{
            let report = rawData["reports"][0]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                let countryName = currRow["dimensions"][2]
                let cityName = currRow["dimensions"][1]
                let city = cityName + ", " + countryName
                let visitCount =parseInt(currRow["metrics"][0]["values"][0])
                if (!(rid in res)){
                    let cityObject = {}
                    cityObject[city] = visitCount
                    res[rid] = cityObject                    
                } else if (!(city in res[rid])){
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

            res["sumTotal"] = reportData["totals"][0]["values"][0]
            /*
            let replyArray = this.replyDao.getMultiple(ridArray)
            replyArray.map(function(val){
                 
            })
            */
            // TODO: Try to query them together
            for(let [rid, cityObject] of Object.entries(res)){
                if (rid !== "sumTotal"){
                let replyInfo = await this.replyDao.get(rid)
                cityObject["reply"] = replyInfo
                }
            }           
            
            
            return res
            
        }catch(err){
            logger.log(err)
            logger.log("Wrong raw data format input")
            return null
        }

    }

    async _extractLocationInput(locationArray){
        let location = locationArray.map((value) => {
            return value.split(",")
        })
        console.log(location)
        let city = []
        let country = []
        for (let eachLocation of location){
            console.log(eachLocation[0])
            if (!(eachLocation[0] in city)){
                city.push(eachLocation[0])
            }
            if (!(eachLocation[1] in country)){
                country.push(eachLocation[1])
            }
        }
        return {city, country}
    }
    async getReplyVisitNumberFromLocation(startDate, endDate, locationArray){

        /*
        let locationFilter = []
        for (let location of locationArray){
            locationFilter.push({
                "dimensionName": "ga:country",
                "operator": "IN_LIST",
                "expressions": locationArray
            })
        }
        */

        let {city, country} = _extractLocationInput(locationArray)
        let request = {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
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
                    },
                    {
                    "name": "ga:city"
                    }
                ],
                "dimensionFilterClauses": [
                    {
                        "operator": "AND",
                        "filters": [{
                            "dimensionName": "ga:country",
                            "operator": "IN_LIST",
                            "expressions": country
                        },
                        {
                            "dimensionName": "ga:city",
                            "operator": "IN_LIST",
                            "expressions": city
                        }]
                    }
                ]
            }
        ]
    }                       
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch(err){
        console.log(err)
        return null
    }  
    return this._reformatReplyVisitNumberFromLocation(rawReport)
        /*
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
        */
    }

    async _reformatReplyVisitNumberFromLocation(rawData){

        try{
            let report = rawData["reports"][0]
            let reportData = report["data"]
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                let country = currRow["dimensions"][1]
                let visitCount =parseInt(currRow["metrics"][0]["values"][0])
                console.log(country)
                if (!(country in res)){
                    let replyObject = {}
                    replyObject[rid] = {}
                    replyObject[rid]["visitCount"] = visitCount
                    res[country] = replyObject                    
                } else if (!(rid in res[country])){
                    res[country][rid] = {}
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

            res["sumTotal"] = reportData["totals"][0]["values"][0]
            /*
            let replyArray = this.replyDao.getMultiple(ridArray)
            replyArray.map(function(val){
                 
            })
            */
            // TODO: Try to query them together
            for(let [country, replyObject] of Object.entries(res)){
                if (country !== "sumTotal"){

                
                for(let [rid, replyObjectBody] of Object.entries(replyObject)){
                    if (rid !== "sumPerCity"){
                        try{
                        let replyInfo = await this.replyDao.get(rid)
                        replyObjectBody["reply"] = replyInfo
                        }catch(err){
                            logger.log(err)
                        }
                    }
                }
            }
            }           
            
            
            return res
            
        }catch(err){
            console.log(err)
            logger.log("Wrong raw data format input")
            return null
        }
    }



    async getVisitNumberFromLocationAndReply(startDate, endDate, locationArray, replyArray){


        let {city, country} = _extractLocationInput(locationArray)        
        let filter = [
            {
                "dimensionName": "ga:city",
                "operator": "IN_LIST",
                "expressions": city
            },
            {
                "dimensionName": "ga:country",
                "operator": "IN_LIST",
                "expressions": country
            },
            {
                "dimensionName": "ga:eventLabel",
                "operator": "IN_LIST",
                "expressions": replyArray
            }
        ]

        let request = {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
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
                    },
                    {
                    "name": "ga:city"
                    }
                ],
                "dimensionFilterClauses": [
                    {
                        "operator": "AND",
                        "filters": filter
                    }
                ]
            }
        ]
    }                       
    let rawReport = null
    try{
        rawReport = await this._getReports(request)  
    } catch(err){
        console.log(err)
        return null
    }  
    return this._reformatVisitNumberFromLocationAndReply(rawReport)
        /*
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
        */
    }

    async _reformatVisitNumberFromLocationAndReply(rawData){
        try{
        let report = rawData["reports"][0]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        res["data"] = []
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            let rid = currRow["dimensions"][0]
            let countryName = currRow["dimensions"][1]
            let cityName = currRow["dimensions"][2]
            let city = cityName + ", " + countryName
            let currObject = {}
            currObject["reply"] = rid
            currObject["location"] = city
            currObject["visit"] = currRow["metrics"][0]["values"][0]
            try{
                let replyInfo = await this.replyDao.get(rid)
                currObject["replyLabel"] = replyInfo
            } catch(err){
                logger.log(err)
            }

            res["data"].push(currObject)

        }
        return res
    } catch(err){
        logger.log(err)
        return null
    }

    }

    async getAverageStayTimeFromLocation(startDate, endDate){
        let request = {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
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
    } catch(err){
        return null
    }  
    return this._reformatAverageStayTimeFromLocation(rawReport)
        //return {"#Toronto":{"averageSessionDuration": #10, "averagePageDuration": #10}}
    }
 
    async _reformatAverageStayTimeFromLocation(rawData){
        try{
        let report = rawData["reports"][0]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            console.log(currRow["dimensions"])
            let countryName = currRow["dimensions"][0]
            let cityName = currRow["dimensions"][1]
            let city = cityName + ", " + countryName
            res[city] = {"averageSessionDuration": currRow["metrics"][0]["values"][0], "averagePageDuraction": currRow["metrics"][0]["values"][1]}
            
        }
        return res
        }catch(err){
            logger.log(err)
            logger.log("Wrong raw data format input")
            return null
        }
    }

    async getAverageStayTimeFromReply(startDate, endDate){
        let request = {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
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
    } catch(err){

        return null
    }  
    return this._reformatAverageStayTimeFromReply(rawReport)
        /*return {"#rid1":{"averageSessionDuration": #10, 
        "averagePageDuration": #10,                 
        "replyLabel": "#Hello",
        "replyContent": "#Hi there!"}}*/
    }

    async _reformatAverageStayTimeFromReply(rawData){
        try{
            let report = rawData["reports"][0]
            let reportData = report["data"]
            console.log(reportData)
            let reportDataRow = reportData["rows"]
            let reportRowCount = reportData["rowCount"]
            console.log(reportRowCount)
            let res = {}
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let rid = currRow["dimensions"][0]
                res[rid] = {"averageSessionDuration": currRow["metrics"][0]["values"][0], "averagePageDuraction": currRow["metrics"][0]["values"][1]}
            }
            console.log(Object.entries(res))
            for(let [rid, replyObject] of Object.entries(res)){
                try{
                    let replyInfo = await this.replyDao.get(rid)
                    replyObject["reply"] = replyInfo
                } catch(err){
                    logger.log(err)
                }
            }
               
            return res
        }catch(err){
            console.log(err)
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
                "viewId": (await this.analyticsGateway.getView()),
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
        /*return {
            "#Toront":{"#laptop": #5}
        }*/

    }




async _reformatgetPlatformFromLocation(rawData){
    try{
        let report = rawData["reports"][0]
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
            if (!(city in res)){
                let platformObject = {}
                platformObject[platform] = visitCount
                res[city] = platformObject                    
            } else if (!(platform in res[city])){
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
            "viewId": (await this.analyticsGateway.getView()),
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
    /*return {
        #rid1:{"#laptop": #5, "replyLabel": "Hi", "replyContent": "Hello"}
    }*/

}

async _reformatgetPlatformFromReply(rawData){
    try{
        let report = rawData["reports"][0]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        for (let row = 0 ; row < reportRowCount; row += 1){
            let currRow = reportDataRow[row]
            let rid = currRow["dimensions"][1]
            let platform = currRow["dimensions"][0]
            let visitCount =parseInt(currRow["metrics"][0]["values"][0])
            if (!(rid in res)){
                let platformObject = {}
                platformObject[platform] = visitCount
                res[rid] = platformObject                    
            } else if (!(platform in res[rid])){
                res[rid][platform] = visitCount
            } else {
                res[rid][platform] += visitCount
            }

        }
        
        for(let [rid, replyObject] of Object.entries(res)){
            //Toberemoved: 
            try{
            let replyInfo = await this.replyDao.get(rid)
            replyObject["reply"] = replyInfo

            } catch(err){
                logger.log(err)    
        } 
           
        }
           
        return res
    }catch{
        logger.log("Wrong raw data format input")
        return null
    }
}
}


module.exports = RetrieveDataService
