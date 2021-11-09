const express = require('express');
const router = express.Router();
const logger = { log: console.log }

const retrieveStatisticsController = require('../../controllers/statistics/RetriveStatisticsController.factory')


router.get('/statistics/retrieve', (req, res) => {
    const response = await retrieveStatisticsController.retrieveStatistics(req)
    res.send(response)
} )


module.exports = router;
