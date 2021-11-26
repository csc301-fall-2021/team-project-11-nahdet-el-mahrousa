const logger = { log: console.log }
const { respond, response } = require('../../utils/response')
const getInput = require('../../utils/user-input')

class retrieveStatisticsController {
    constructor(retrieveStatisticsService) {
        this.retrieveStatisticsService = retrieveStatisticsService
    }


    async getVisitNumberAndSumFromLocationPerDay(){
 
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            return response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getVisitNumberAndSumFromLocationPerDay(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 

    }
    
    async getLocationVisitNumberFromReply(req){
 
        
        const uinOne = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })

        const uinTwo = getInput(req, {
            mandatory: ['ridArr'],
            fromQuery: true
        })
        
        if (uinOne === null || uinTwo === null){
            logger.log("start date or end date or rid array is not found in the request's parameter")
            response.NOT_SATISFIED
        } else if (!Array.isArray(uinTwo.ridArray)){
            logger.log("invalid type for ridArray request parameter")
            response.NOT_SATISFIED
        }else {         
            try{     
            uinTwo.ridArray.map((value) => {
                parseInt(value)
            })  
            } catch {
                logger.log("invalid type for ridArray request parameter")
                return response.NOT_SATISFIED
            }      
            let res = await this.retrieveStatsticsService.getLocationVisitNumberFromReply(uinOne.startDate, uinOne.endDate, uinTwo.ridArray)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async getReplyVisitNumberFromLocation(req){

        
        const uinOne = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })

        const uinTwo = getInput(req, {
            mandatory: ['locationArr'],
            fromQuery: true
        })
        
        if (uinOne === null || uinTwo === null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else if (!Array.isArray(uinTwo.locationArr)){
            logger.log("invalid type for locationArray request parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getReplyVisitNumberFromLocation(uinOne.startDate, uinOne.endDate, uinTwo.locationArray)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }
    async getAverageStayTimeFromLocation(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getAverageStayTimeFromLocation(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 
    }

    async getAverageStayTimeFromReply(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getAverageStayTimeFromLocation(uin.startDate, uin.endDate)
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
            fromParam: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getPlatformFromLocation(uin.startDate, uin.endDate)
            if (res === null){
                return response.INTERNAL_SERVER_ERROR
            }
            return respond({entity: res})
        } 

    }
    
    async getPlatformFromReply(req){
        
        const uin = getInput(req, {
            mandatory: ['startDate', 'endDate'],
            fromParam: true
        })
        
        if (uin === null){
            logger.log("start date or end date is not found in the request's parameter")
            response.NOT_SATISFIED
        } else {                   
            let res = await this.retrieveStatsticsService.getPlatformFromReply(uin.startDate, uin.endDate)
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

module.exports = retrieveStatisticsService