const createBotService = require('../../services/bot/factory')
const ClientBotController = require('./bot')


function createClientBotController() {
    const botService = createBotService()
    const cbc = new ClientBotController(botService)
    return cbc
}


module.exports = createClientBotController()
