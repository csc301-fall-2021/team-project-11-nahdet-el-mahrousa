// var logger = require('logger').createLogger()

const logger = { log: console.log }

class BotService {
    constructor(messageDao, replyDao) {
        this.messageDao = messageDao
        this.replyDao = replyDao
    }

    getMessage(mid) {
        const msg = this.messageDao.get(mid)
        if (!msg) {
            logger.log(`Message [${mid}] doesn't exist`)
            return msg
        }
        return msg
    }

    getReply(rid) {
        const rpl = this.replyDao.get(rid)
        if (!rpl) {
            logger.log(`Reply [${rid}] doesn't exist`)
            return rpl
        }
        return rpl
    }

    getRepliesByMessage(mid) {
        const msg = this.getMessage(mid)
        if (!msg) {
            return undefined
        }
        const replies = this.replyDao.search({ fromMessage: mid })
        return replies
    }

    getNextMessage(rid) {
        const rpl = this.replyDao.get(rid)
        if (!rpl) {
            return undefined
        }

        const newMessage = this.getMessage(rpl.toMessage)
        return newMessage
    }

    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return 401
        }

        const newMessage = await this.messageDao.create({ content, label })

        if (newMessage !== null) {
            logger.log(`[${user.username}] CREATED Message \'${label}\'`)
            return newMessage
        } else {
            logger.log(`[${user.username}] FAILED CREATE Message \'${label}\'`)
            return newMessage
        }
    }

    async createReply(user, content, label, fromMessage, nextMessage) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return 401
        }

        const newReply = await this.replyDao.create({ content, label, fromMessage, nextMessage })

        if (newReply !== null) {
            logger.log(`[${user.username}] CREATED Reply \'${rid}\'`)
            return newReply
        } else {
            logger.log(`[${user.username}] FAILED CREATE Reply \'${rid}\'`)
            return newReply
        }
    }
}


module.exports = BotService
