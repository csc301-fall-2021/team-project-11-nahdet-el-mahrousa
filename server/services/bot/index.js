// var logger = require('logger').createLogger()

const logger = {log: console.log}

class BotService {
    constructor(messageDao, replyDao) {
        this.messageDao = messageDao
        this.replyDao = replyDao
    }

    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot){
            return 401
        }

        const newMessage = await this.messageDao.create({ content, label })

        if (newMessage !== null) {
            logger.log(`[${user.username}] CREATED Message \'${label}\'`)
            return 200
        } else {
            logger.log(`[${user.username}] FAILED CREATE Message \'${label}\'`)
            return 200
        }
    }

    async createReply(user, content, label, fromMessage, nextMessage) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot){
            return 401
        }

        const newReply = await this.replyDao.create({ content, label, fromMessage, nextMessage })

        if (newReply !== null) {
            logger.log(`[${user.username}] CREATED Reply \'${rid}\'`)
            return 200
        } else {
            logger.log(`[${user.username}] FAILED CREATE Reply \'${rid}\'`)
            return 200
        }
    }
}


module.exports = BotService
