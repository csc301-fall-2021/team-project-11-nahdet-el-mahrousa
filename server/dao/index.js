module.exports = () => {
    const MessageDao = require('./mongoose/MongooseMessageDao')
    const ReplyDao = require('./mongoose/MongooseReplyDao')

    return { MessageDao, ReplyDao }
}
