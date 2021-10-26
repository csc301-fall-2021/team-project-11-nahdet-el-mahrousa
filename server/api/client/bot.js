const express = require('express');
const router = express.Router();
const logger = {log: console.log}

const clientBotController = require('../../controllers/client/BotController.factory')

router.get('/', (req, res) => {
    res.send({
        msg: "Client"
    })
})

router.post('/message', (req, res) => {
    logger.log('Client get message by message id')
    res.send(clientBotController.getFullMessage(req))
})

router.post('/reply', (req, res) => {
    logger.log('Client get message by reply id')
    res.send(clientBotController.getFullNextMessage(req))
})

module.exports = router;
