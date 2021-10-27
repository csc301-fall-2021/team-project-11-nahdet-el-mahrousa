const createBotService = require('../../services/bot/factory')
const AdminBotController = require('./bot')


function createAdminBotController() {
    const botService = createBotService()
    const abc = new AdminBotController(botService)
    return abc
}


module.exports = createAdminBotController()
