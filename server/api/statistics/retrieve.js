const express = require('express');
const router = express.Router();
const logger = { log: console.log }

const retrieveStatisticsController = require('../../controllers/statistics/RetrieveStatisticsController.factory')
const { authenticationToken } = require('../../utils/auth')



router.get('/visit', authenticationToken, async (req, res) => {
    const response = await retrieveStatisticsController.getVisit(req)
    res.send(response)
} )


router.get('/averageStayTime', authenticationToken, async (req, res) => {
    const response = await retrieveStatisticsController.getAverageStayTime(req)
    res.send(response)
} )

router.get('/platform', authenticationToken, async (req, res) => {
    const response = await retrieveStatisticsController.getPlatform(req)
    res.send(response)
} )



module.exports = router;
