// TODO: not sure whether we want to combine two factories into one

const { MessageDao, ReplyDao } = require('../../dao/mongoose')
const BotService = require('../../services/bot')
const AdminBotController = require('./bot')


function createBotService() {
    const messageDao = new MessageDao()
    const replyDao = new ReplyDao
    const botService = new BotService(messageDao, replyDao)
    return botService
}

function createAdminBotController() {
    const botService = createBotService()
    const abc = new AdminBotController(botService)
    return abc
}


module.exports = createAdminBotController()
