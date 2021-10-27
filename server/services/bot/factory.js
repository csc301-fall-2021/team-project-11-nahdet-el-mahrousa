const { MessageDao, ReplyDao } = require('../../dao')
const BotService = require('./index')

module.exports = () => {
    const messageDao = new MessageDao()
    const replyDao = new ReplyDao()
    const botService = new BotService(messageDao, replyDao)
    return botService
}