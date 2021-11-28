const logger = { log: console.log }
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
    
    async getVisitNumberAndSumFromLocationPerDay(req){
        console.log(req)
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getVisitNumberAndSumFromLocationPerDay(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }
    
    async getLocationVisitNumberFromReply(req){
 
        const uinOne = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })

        const uinTwo = getInput(req, {
            mandatory: ['ridArr'],
            fromQuery: true
        })
        
        if (uinOne === null || uinTwo === null){
            logger.log("start date or end date or rid array is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else if (!(Array.isArray(uinTwo.ridArr))){
            
            logger.log("invalid type for ridArray request parameter")
            return response.NOT_SATISFIED
        }else {         
            let res = await this.retrieveStatisticsService.getLocationVisitNumberFromReply(uinOne.startDate, uinOne.endDate, uinTwo.ridArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async getReplyVisitNumberFromLocation(req){

        
        const uinOne = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })

        const uinTwo = getInput(req, {
            mandatory: ['locationArr'],
            fromQuery: true
        })
        
        if (uinOne === null || uinTwo === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else if (!Array.isArray(uinTwo.locationArr)){
            logger.log("invalid type for locationArray request parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getReplyVisitNumberFromLocation(uinOne.startDate, uinOne.endDate, uinTwo.locationArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }



    async getVisitNumberFromLocationAndReply(req){

        
        const uinOne = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })

        const uinTwo = getInput(req, {
            mandatory: ['locationArr', 'ridArr'],
            fromQuery: true
        })
        
        if (uinOne === null || uinTwo === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else if (!Array.isArray(uinTwo.locationArr) || !Array.isArray(uinTwo.ridArr)){
            logger.log("invalid type for locationArray request parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getVisitNumberFromLocationAndReply(uinOne.startDate, uinOne.endDate, uinTwo.locationArr, uinTwo.ridArr)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async getAverageStayTimeFromLocation(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getAverageStayTimeFromLocation(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async getAverageStayTimeFromReply(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getAverageStayTimeFromReply(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 

    }
    /*
    async getInteractionTime(req){
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })
        if (uin == null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getInteractionTime(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }
    */

    async getPlatformFromLocation(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getPlatformFromLocation(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 

    }
    
    async getPlatformFromReply(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParams: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatisticsService.getPlatformFromReply(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 

    }

    async _reformatDate(date){
        return 
    }
    /*
    async retrieveStatistics(req){
        const viewId = req.viewId
        const startDate = req.startDate
        const endDate = req.endDate
        this.retrieveStatisticsService.retrieveData(viewId, startDate, endDate)
    }
    */

}

module.exports = retrieveStatisticsController