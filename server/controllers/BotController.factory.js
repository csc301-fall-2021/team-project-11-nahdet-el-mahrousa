const { MessageDao, ReplyDao } = require('../../dao/mongoose')
const BotService = require('../../services/bot')
const ClientBotService = require('./client/bot')


function createBotService() {
    const messageDao = new MessageDao()
    const replyDao = new ReplyDao
    const botService = new BotService(messageDao, replyDao)
    return botService
}

// TODO: not sure whether we want to combine two factories into one
//function createAdminBotController() {
//    const botService = createBotService()
//    const abc = new AdminBotController(botService)
//    return abc
//}

function createClientBotController() {
    const botService = createBotService()
    const cbc = new ClientBotService(botService)
    return cbc
}


module.exports = createClientBotController()