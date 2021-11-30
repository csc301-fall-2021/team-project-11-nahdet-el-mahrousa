const express = require('express');
const router = express.Router();

const adminBotController = require('../../controllers/admin/BotController.factory')

// TODO: Delete this mock
const user = require('../../assets/user.mock').admin1

const { authenticationToken } = require('../../utils/auth')


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

router.put("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.updateMessage(req, user)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.deleteMessage(req, user)
    res.status(response.statusCode).send(response)
})

router.post("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.createReply(req, user)
    res.status(response.statusCode).send(response)
})

router.put("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.updateReply(req, user)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.deleteReply(req, user)
    res.status(response.statusCode).send(response)
})

router.get("/bot/workflow", authenticationToken, async (req, res) => {
    const workflowData = await adminBotController.getWorkflow(req, user)
    res.status(workflowData.statusCode).send(workflowData)
})


module.exports = router
