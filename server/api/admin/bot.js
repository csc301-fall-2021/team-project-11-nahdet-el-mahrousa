const express = require('express');
const router = express.Router();

const adminBotController = require('../../controllers/admin/BotController.factory')

// TODO: Delete this mock
const user = require('../../assets/user.mock').admin1


router.get("/", async (req, res) => {
    res.send("ADMIN")
})

router.get("/bot", async (req, res) => {
    const botData = await adminBotController.getBot(req, user)
    res.send(botData)
})

router.post("/bot/message", async (req, res) => {
    const response = await adminBotController.createMessage(req, user)
    res.send(response)
})

router.put("/bot/message", async (req, res) => {
    const response = await adminBotController.updateMessage(req, user)
    res.send(response)
})

router.delete("/bot/message", async (req, res) => {
    const response = await adminBotController.deleteMessage(req, user)
    res.send(response)
})

router.post("/bot/reply", async (req, res) => {
    const response = await adminBotController.createReply(req, user)
    res.send(response)
})

router.put("/bot/reply", async (req, res) => {
    const response = await adminBotController.updateReply(req, user)
    res.send(response)
})

router.delete("/bot/reply", async (req, res) => {
    const response = await adminBotController.deleteReply(req, user)
    res.send(response)
})


module.exports = router
