const express = require('express');
const router = express.Router();
const logger = { log: console.log }

const clientBotController = require('../../controllers/client/BotController.factory')

router.get('/', (req, res) => {
    res.send({
        msg: "Client"
    })
})

router.get('/message', async (req, res) => {
    logger.log('Client get message init message')
    const response = await clientBotController.getInitMessage()
    res.send(response)
})

router.post('/message', async (req, res) => {
    logger.log('Client get message by reply id')
    const response = await clientBotController.getFullNextMessage(req)
    res.send(response)
})

module.exports = router;
