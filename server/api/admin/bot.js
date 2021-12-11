const express = require('express');
const router = express.Router();

const adminBotController = require('../../controllers/admin/BotController.factory')

const { authenticationToken } = require('../../utils/auth')


router.get("/", async (req, res) => {
    res.send("ADMIN")
})

router.get("/bot", authenticationToken, async (req, res) => {
    const botData = await adminBotController.getBot(req)
    res.status(botData.statusCode).send(botData)
})

router.post("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.createMessage(req)
    res.status(response.statusCode).send(response)
})

router.put("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.updateMessage(req)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/message", authenticationToken, async (req, res) => {
    const response = await adminBotController.deleteMessage(req)
    res.status(response.statusCode).send(response)
})

router.get("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.getReplies(req)
    res.status(response.statusCode).send(response)
})

router.post("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.createReply(req)
    res.status(response.statusCode).send(response)
})

router.put("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.updateReply(req)
    res.status(response.statusCode).send(response)
})

router.delete("/bot/reply", authenticationToken, async (req, res) => {
    const response = await adminBotController.deleteReply(req)
    res.status(response.statusCode).send(response)
})

router.get("/bot/workflow", authenticationToken, async (req, res) => {
    const workflowData = await adminBotController.getWorkflow(req)
    res.status(workflowData.statusCode).send(workflowData)
})


module.exports = router
