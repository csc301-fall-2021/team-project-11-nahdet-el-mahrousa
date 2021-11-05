const express = require('express');
const router = express.Router();
const logger = {log: console.log}

const clientBotController = require('../../controllers/client/BotController.factory')

router.get('/', (req, res) => {
    res.send({
        msg: "Client"
    })
})

router.get('/bot/message', (req, res) => {
    logger.log('Client get message init message')
    res.send(await clientBotController.getFullMessage({body:{_id: 0}}))
})

router.post('/bot/message', (req, res) => {
    logger.log('Client get message by reply id')
    res.send(await clientBotController.getFullNextMessage(req))
})

module.exports = router;
