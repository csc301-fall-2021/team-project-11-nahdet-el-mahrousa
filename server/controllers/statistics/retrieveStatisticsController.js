const logger = { log: console.log }
const e = require('express')
const { respond, response } = require('../../utils/response')
const getInput = require('../../utils/user-input')

class retrieveStatisticsController {
    constructor(retrieveStatisticsService) {
        this.retrieveStatisticsService = retrieveStatisticsService
    }

    // To be added later and see if it needs to be used
    async _validateDate(date){
        if (date.length !== 10){
            return false
        } else if (date.charAt(4)!=='-' || date.charAt(7)!=='-'){
            return false
        } else {
            try{
            let year = parseInt(date.subString(0, 4))
            let month = parseInt(date.subString(5, 7))
            let day = parseInt(date.subString(8, 10))
            if (month >12 || month <1){
                return false
            } else if (day > 31 || day < 1){
                return false
            }
            
            } catch{
                return false
            }
        }
    }
    



    async getVisit(req){
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            optional: ['ridArr', 'locationArr'],
            fromQuery: true
        })
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {            
            console.log(uin)   
            if (uin.hasOwnProperty("ridArr") && uin.hasOwnProperty("locationArr")){
                return await this._getVisitNumberFromLocationAndReply(uin)
            } else if (uin.hasOwnProperty("ridArr")){
                return await this._getVisitNumberFromReply(uin)
            } else if (uin.hasOwnProperty("locationArr")){
                return await this._getVisitNumberFromLocation(uin)
            } else {
                return await this._getVisitNumberFromLocationPerDay(uin)
            }
        } 

    }

    async _getVisitNumberFromLocationAndReply(uin){
        if (!Array.isArray(uin.locationArr) || !Array.isArray(uin.ridArr)){
            logger.log("invalid type for locationArray or ridArray request parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getVisitNumberFromLocationAndReply(uin.startDate, uin.endDate, uin.locationArr, uin.ridArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async _getVisitNumberFromReply(uin){
        if (!(Array.isArray(uin.ridArr))){
            logger.log("invalid type for ridArray request parameter")
            return response.NOT_SATISFIED
        } else {         
            let res = await this.retrieveStatisticsService.getLocationVisitNumberFromReply(uin.startDate, uin.endDate, uin.ridArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async _getVisitNumberFromLocation(uin){
        if(!(Array.isArray(uin.locationArr))){
            logger.log("invalid type for locationArray request parameter")
            return response.NOT_SATISFIED
        } else {
            let res = await this.retrieveStatisticsService.getReplyVisitNumberFromLocation(uin.startDate, uin.endDate, uin.locationArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        }
        
    }

    async _getVisitNumberFromLocationPerDay(uin){
        let res = await this.retrieveStatisticsService.getVisitNumberAndSumFromLocationPerDay(uin.startDate, uin.endDate)
        if (res === null){
            return response.INTERNAL_SERVER_ERROR
        }
        return respond({entity: res})
    }







    async getAverageStayTime(req){
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate', "from"],
            fromQuery: true
        })
        if (uin === null){
            logger.log("start date or end date or from option is not found in the request")
            return response.NOT_SATISFIED
        } else {
            let fromType = ["location", "reply"]
            console.log(fromType.includes(uin.from))
            if (!(fromType.includes(uin.from))){
                logger.log("type not supported")
                return response.NOT_SATISFIED
            }
            if (uin.from === "location"){
                return await this._getAverageStayTimeFromLocation(uin)
            } else {
                return await this._getAverageStayTimeFromReply(uin)
            }
        }

    }

    async _getAverageStayTimeFromLocation(uin){
        let res = await this.retrieveStatisticsService.getAverageStayTimeFromLocation(uin.startDate, uin.endDate)
        if (res === null){
            return response.INTERNAL_SERVER_ERROR
        }
        return respond({entity: res})
    }

    async _getAverageStayTimeFromReply(uin){
        let res = await this.retrieveStatisticsService.getAverageStayTimeFromReply(uin.startDate, uin.endDate)
        if (res === null){
            return response.INTERNAL_SERVER_ERROR
        }
        return respond({entity: res})
    }

    async getPlatform(req){
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            optional: ['from'],
            fromQuery: true
        })
        if (uin === null){
            logger.log("start date or end date or from option is not found in the request")
            return response.NOT_SATISFIED
        } else {
            if (!(uin.hasOwnProperty("from"))){
                return await this._getPlatformGeneral(uin)
            }
            let fromType = ["location", "reply"]
            if (!(fromType.includes(uin.from))){
                logger.log("type not supported")
                return response.NOT_SATISFIED
            }
            if (uin.from === "location"){
                return await this._getPlatformFromLocation(uin)
            } else {
                return this._getPlatformFromReply(uin)
            }
        }
    }


    async _getPlatformGeneral(uin){
        let res = await this.retrieveStatisticsService.getPlatformGeneral(uin.startDate, uin.endDate)
        if (res === null){
            return response.INTERNAL_SERVER_ERROR
        }
        return respond({entity: res})
    }

    async _getPlatformFromLocation(uin){
        let res = await this.retrieveStatisticsService.getPlatformFromLocation(uin.startDate, uin.endDate)
        if (res === null){
            return response.INTERNAL_SERVER_ERROR
        }
        return respond({entity: res})

    }

    async _getPlatformFromReply(uin){
        let res = await this.retrieveStatisticsService.getPlatformFromReply(uin.startDate, uin.endDate)
        if (res == null){
            return response.INTERNAL_SERVER_ERROR
        } 
        return respond({entity: res})
    }



}

module.exports = retrieveStatisticsController