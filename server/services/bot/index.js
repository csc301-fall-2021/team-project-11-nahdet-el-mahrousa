// var logger = require('logger').createLogger()

const logger = {log: console.log}

class BotService {
    constructor(dbHandler) {
        this.dbHandler = dbHandler
    }

    getMessage(mid){
        if (!this.dbHandler.hasMessage(mid)){
            logger.log(`Message [${mid}] doesn't exist`)
            return 502
        }
        return this.dbHandler.retriveMessage(mid)
    }

    getReply(rid){
        if (!this.dbHandler.hasReply(rid)){
            logger.log(`Reply [${rid}] doesn't exist`)
            return 502
        }
        return this.dbHandler.retriveReply(rid)
    }

    getRepliesByMessage(mid){
        if (!this.dbHandler.hasMessage(mid)){
            logger.log(`Message [${mid}] doesn't exist`)
            return 502
        }
        const replieIDs = this.dbHandler.getRepliesIdByMessage(mid)
        const replies = []
        for(const rid of replieIDs){
            replies.push(this.getReply(rid))
        }
        return replies
    }

    getNextMessage(rid){
        if (!this.dbHandler.hasReply(rid)){
            logger.log(`Reply [${rid}] doesn't exist`)
            return 502
        }
        return this.dbHandler.getNextMessage(rid)
    }

    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot){
            return 401
        }

        const newMessage = await this.dbHandler.create('Message', { content, label })

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

        const newReply = await this.dbHandler.create('Reply', { content, label, fromMessage, nextMessage })

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
