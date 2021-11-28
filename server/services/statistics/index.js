// var logger = require('logger').createLogger()
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond, response } = require('../../utils/response')
const logger = { log: console.log }

class RetrieveDataService {
    constructor(analyticsGateway, replyDao) {
        this.analyticsGateway = analyticsGateway
        this.replyDao = replyDao
    }


    /**Helper function that receives a correctly formatted request body object for google analaytics reporting api and 
     * return the raw report data retrieved from that api
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
    
    
    async _requestReport(request){
        let rawReport = null
        try{
            rawReport = await this._getReports(request)  
    
            if (rawReport === null){
                return null
            }
            return rawData
        } catch(err){
            logger.log(err)
            return null
        }      
    }

    async _generateRequest(startDate, endDate, metrics, dimensions, dimensionFilter=null){
        if (filter === null){
        return {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": metrics,
                "dimensions": dimensions
                }
            ]
        }
    } else {
        return {
            "reportRequests": [
                {
                "viewId": (await this.analyticsGateway.getView()),
                "dateRanges": [
                    {
                    "startDate": startDate,
                    "endDate": endDate
                    }
                ],
                "metrics": metrics,
                "dimensions": dimensions,
                "dimensionFilterClauses": dimensionFilter
                }
            ]
        }

    }
    }


    async _initialExtractReport(rawData){
        let report = rawData["reports"][0]
        let reportData = report["data"]
        let reportDataRow = reportData["rows"]
        let reportRowCount = reportData["rowCount"]
        let res = {}
        return {reportDataRow, reportRowCount, res}
    }

    async _assignSimpleTwoVariableName(inputName, inputLocation, currObject){
        if (inputName === "rid"){
            let rid = currRow["dimensions"][inputLocation[0]]
            currObject["reply"] = rid                
        }
        if (inputName === "location"){
                let countryName = currRow["dimensions"][inputLocation[0]]
                let cityName = currRow["dimensions"][inputLocation[1]]
                let city = cityName + ", " + countryName
                currObject["location"] = city                    
        }
        return currObject
    }

    async _getSimpleTwoVariableStructure(rawData, xName, xLocation, yName, yLocation, valueName){
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
            res["data"] = []
            for (let row = 0 ; row < reportRowCount; row += 1){
                let currRow = reportDataRow[row]
                let currObject = {}
                
                currObject = this._assignSimpleTwoVariableName(xName, xLocation, currObject)
                currObject = this._assignSimpleTwoVariableName(yName, yLocation, currObject)
                
                currObject[valueName] = currRow["metrics"][0]["values"][0]


                
                if (currObject.hasOwnProperty("reply")){
                
                    try{
                        let replyInfo = await this.replyDao.get(rid)
                        currObject["replyLabel"] = replyInfo
                    } catch(err){
                        logger.log(err)
                    }
                }
    
                res["data"].push(currObject)
    
            }
            return res
        } catch(err){
            logger.log(err)
            return null
        } 
    }



    async getVisitNumberAndSumFromLocationPerDay(startDate, endDate){

        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
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
        let request = this._generateRequest(startDate, endDate, metrics, dimensions) 
  
                    
        let rawReport = this._requestReport(request)
        if (rawReport === null){return rawReport}
        return this._reformatVisitNumberAndSumFromLocationPerDay(rawReport)

    }
 
      
    async _reformatVisitNumberAndSumFromLocationPerDay(rawData){

        
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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
            return null
        }

    }



    
    async getLocationVisitNumberFromReply(startDate, endDate, ridArray){


        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
            {
            "name": "ga:eventLabel"
            },
            {
            "name": "ga:country"
            },
            {
            "name": "ga:city"
            }
        ]
        let filter = [
            {
                "filters": [
                    {
                        "dimensionName": "ga:eventLabel",
                        "operator": "IN_LIST",
                        "expressions": ridArray
                    }
                ]
            }
        ]

    let request = this._generateRequest(startDate, endDate, metrics, dimensions, filter) 
                              
    let rawReport = this.requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatLocationVisitNumberFromReply(rawReport)

    }


    async _reformatLocationVisitNumberFromReply(rawData){
        return this._assignSimpleTwoVariableName(rawData, "reply", [0], "location", [1, 2], "visit")
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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


        let {city, country} = _extractLocationInput(locationArray)
        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
            {
            "name": "ga:eventLabel"
            },
            {
            "name": "ga:country"
            },
            {
            "name": "ga:city"
            }
        ]
        let filter = [
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
    let request = this._generateRequest(startDate, endDate, metrics, dimensions, filter)              
    let rawReport = this.requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatReplyVisitNumberFromLocation(rawReport)
    }

    async _reformatReplyVisitNumberFromLocation(rawData){

        return this._getSimpleLabelLocationStructure(rawData, "location", [1, 2], "reply", [0], "visit")
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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
        let filterContent = [
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
        let filter = [
            {
                "operator": "AND",
                "filters": filter
            }
        ]
        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
            {
            "name": "ga:eventLabel"
            },
            {
            "name": "ga:country"
            },
            {
            "name": "ga:city"
            }
        ]

    let request = this._generateRequest(startDate, endDate, metrics, dimensions, filter)                       
    let rawReport = this.requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatVisitNumberFromLocationAndReply(rawReport)
 
    }

    async _reformatVisitNumberFromLocationAndReply(rawData){
        return this._getSimpleLabelLocationStructure(rawData, "reply", [0], "location", [1, 2], "visit")
    }

    async getAverageStayTimeFromLocation(startDate, endDate){
        let metrics = [
            {
            "expression": "ga:avgTimeOnPage"
            },
            {
                "expression": "ga:avgSessionDuration"
            }
        ]
        let dimensions = [
            {
            "name": "ga:country"
            },
            {
            "name": "ga:city"
            }
        ]
    let request = this._generateRequest(startDate, endDate, metrics, dimensions) 
    let rawReport = this.requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatAverageStayTimeFromLocation(rawReport)
    
    }
 
    async _reformatAverageStayTimeFromLocation(rawData){
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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



        let metrics = [
            {
            "expression": "ga:avgTimeOnPage"
            },
            {
            "expression": "ga:avgSessionDuration"
            }
        ]
        let dimensions = [
            {
            "name": "ga:eventLabel"
            }
        ]
    let request = this._generateRequest(startDate, endDate, metrics, dimensions)
    let rawReport = this._requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatAverageStayTimeFromReply(rawReport)
    }

    async _reformatAverageStayTimeFromReply(rawData){
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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

        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
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
    let request = this._generateRequest(startDate, endDate, metrics, dimensions)
    let rawReport = this._requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatgetPlatformFromLocation(rawReport)

    }




async _reformatgetPlatformFromLocation(rawData){
    try{
        let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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

        let metrics = [
            {
            "expression": "ga:users"
            }
        ]
        let dimensions = [
            {
            "name": "ga:deviceCategory"
            },
            {
            "name": "ga:eventLabel"
            }
        ]
    let request = this._generateRequest(startDate, endDate, metrics, dimensions)
    let rawReport = this._requestReport(request)
    if (rawReport === null){return rawReport}
    return this._reformatgetPlatformFromReply(rawReport)
        
    }

    async _reformatgetPlatformFromReply(rawData){
        try{
            let {reportDataRow, reportRowCount, res} = this._initialExtractReport(rawData)
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
