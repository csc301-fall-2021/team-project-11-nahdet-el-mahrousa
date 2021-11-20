const express = require('express');
const router = express.Router();

const adminBotController = require('../../controllers/admin/BotController.factory')

// TODO: Delete this mock
const user = require('../../assets/user.mock').admin1


router.get("/", async (req, res) => {
    res.send("ADMIN")
})

router.get("/bot", authenticationToken, async (req, res) => {
    const botData = await adminBotController.getBot(req, user)
    res.status(botData.statusCode).send(botData)
})

router.post("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.createMessage(req, user)
    res.status(response.statusCode).send(response)
})

router.put("/bot/message", authenticationToken,  async (req, res) => {
    const response = await adminBotController.updateMessage(req, user)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.deleteMessage(req, user)
    res.status(response.statusCode).send(response)
})

router.post("/bot/reply", authenticationToken,  async (req, res) => {
    const response = await adminBotController.createReply(req, user)
    res.status(response.statusCode).send(response)
})

router.put("/bot/reply", authenticationToken,  async (req, res) => {
    const response = await adminBotController.updateReply(req, user)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/reply",authenticationToken,  async (req, res) => {
    const response = await adminBotController.deleteReply(req, user)
    res.status(response.statusCode).send(response)
})

function authenticationToken(req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(400).send('Forbidden')
    } else {
        jwt.verify(token, process.env.LOGIN_KEY, (err, username) => {
            if (err) {
                res.status(400).send(err)
            } else {
                next()
            }
        })
    }
}

module.exports = router
