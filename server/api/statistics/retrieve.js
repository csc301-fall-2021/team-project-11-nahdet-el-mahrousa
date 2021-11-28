const express = require('express');
const router = express.Router();
const logger = { log: console.log }

const retrieveStatisticsController = require('../../controllers/statistics/RetrieveStatisticsController.factory')
const { authenticationToken } = require('../../utils/auth')



router.get('/day/location/visitInfo/:startDate/:endDate', async (req, res) => {

    const response = await retrieveStatisticsController.getVisitNumberAndSumFromLocationPerDay(req)
    res.send(response)
} )

router.get('/reply/visitNumber/location:startDate/:endDate', async (req, res) => {
    //TODO: Figure out how to send array in parameter
    // ?replyArr[]=1&replyArr[]=5&replyArr[]=6
    const response = await retrieveStatisticsController.getLocationVisitNumberFromReply(req)
    res.send(response)
} )

router.get('/location/visitNumber/reply:startDate/:endDate', async (req, res) => {
    //TODO: Figure out how to send array in parameter
    // ?locationArr[]="China"&locationArr[]="Egypt"&locationArr[]="Canada"
    const response = await retrieveStatisticsController.getReplyVisitNumberFromLocation(req)
    res.send(response)
} )
router.get('/reply/location/visitNumber/:startDate/:endDate', async (req, res) => {
    const response = await retrieveStatisticsController.getVisitNumberFromLocationAndReply(req)
    res.send(response)
} )


router.get('/location/averageStayTime/:startDate/:endDate', async (req, res) => {
    const response = await retrieveStatisticsController.getAverageStayTimeFromLocation(req)
    res.send(response)
} )

router.get('/reply/averageStayTime/:startDate/:endDate', async (req, res) => {
    const response = await retrieveStatisticsController.getAverageStayTimeFromReply(req)
    res.send(response)
} )

router.get('/location/platform/:startDate/:endDate', async (req, res) => {
    const response = await retrieveStatisticsController.getPlatformFromLocation(req)
    res.send(response)
} )

router.get('/reply/platform/:startDate/:endDate', async (req, res) => {
    const response = await retrieveStatisticsController.getPlatformFromReply(req)
    res.send(response)
} )


module.exports = router;
