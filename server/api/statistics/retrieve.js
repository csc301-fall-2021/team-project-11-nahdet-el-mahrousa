const express = require('express');
const router = express.Router();
const logger = { log: console.log }

const retrieveStatisticsController = require('../../controllers/statistics/RetrieveStatisticsController.factory')
const { authenticationToken } = require('../../utils/auth')



router.get('/visit', async (req, res) => {
    // ?replyArr[]=1&replyArr[]=5&replyArr[]=6
    const response = await retrieveStatisticsController.getVisit(req)
    res.send(response)
} )


router.get('/averageStayTime', async (req, res) => {
    const response = await retrieveStatisticsController.getAverageStayTime(req)
    res.send(response)
} )

router.get('/platform', async (req, res) => {
    const response = await retrieveStatisticsController.getPlatformFromLocation(req)
    res.send(response)
} )



module.exports = router;
