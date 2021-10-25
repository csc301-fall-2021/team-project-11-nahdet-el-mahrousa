// var logger = require('logger').createLogger()
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond, response } = require('../../utils/response')
const logger = { log: console.log }

class BotService {
    /**
     * Constructor of BotService.
     * @param {MessageDao} messageDao 
     * @param {ReplyDao} replyDao 
     */
    constructor(messageDao = null, replyDao = null) {
        this.messageDao = messageDao
        this.replyDao = replyDao
    }

    setMessageDao(messageDao) {
        this.messageDao = messageDao
    }

    setReplyDao(replyDao) {
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
        const rpl = this.getReply(rid)
        if (!rpl) {
            return undefined
        }

        const nextMessage = this.getMessage(rpl.toMessage)
        return nextMessage
    }

    /**************************************** Admin services ****************************************/
    /*                                                                                              */
    /*    The following services should only be executed by an admin user with valid privileges.    */
    /*                                                                                              */
    /************************************************************************************************/

    /**
     * 
     * @param {User} user User that makes this operation.
     * @param {Object} query Query constraints.
     * @returns Response of Messages that satisfy the constraints.
     */
    async getMessages(user, query) {
        if (!user.privilege.accessBot) {
            return response.FORBIDDEN
        }

        const messages = await this.messageDao.search(query)
        return messages
    }

    /**
     * 
     * @param {User} user User that makes this operation.
     * @param {Object} query Query constraints.
     * @returns Response of Replies that satisfy the constraints.
     */
    async getReplies(user, query) {
        if (!user.privilege.accessBot) {
            return response.FORBIDDEN
        }

        const replies = await this.replyDao.search(query)
        return replies
    }

    /**
     * Create a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {String} content Content of the message for client to read.
     * @param {String} label Label of the message for admin to read.
     * @returns Response of New Message. If user does not have privilege, return FORBIDDEN.
     */
    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
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

    /**
     * Create a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {String} content Content of the reply for client to read.
     * @param {String} label Label of the reply for admin to read.
     * @param {ObjectId} fromMessage The message id that this replies/option belongs to.
     * @param {ObjectId} toMessage The message id that this replies redirects to.
     * @returns Response of New Reply. If user does not have privilege, return FORBIDDEN.
     */
    async createReply(user, content, label, fromMessage, nextMessage) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
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

    /**
     * Delete a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to delete.
     * @returns Response of The Message deleted. If user does not have privilege, return FORBIDDEN.
     */
    async deleteMessage(user, mid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
        }

        const delMessage = await this.messageDao.delete(mid)

        if (delMessage !== null) {
            logger.log(`[${user.username}] DELETED Message \'${delMessage.label}\'`)
            return delMessage
        } else {
            logger.log(`[${user.username}] FAILED DELETE Message \'${delMessage.label}\'`)
            return delMessage
        }
    }

    /**
     * Delete a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} rid id of the reply to delete.
     * @returns Response of The Reply deleted. If user does not have privilege, return FORBIDDEN.
     */
    async deleteReply(user, rid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
        }

        const delReply = await this.replyDao.delete(rid)

        if (delReply !== null) {
            logger.log(`[${user.username}] DELETED Reply \'${rid}\'`)
            return delReply
        } else {
            logger.log(`[${user.username}] FAILED DELETE Reply \'${rid}\'`)
            return delReply
        }
    }

    /**
     * Update a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to update.
     * @param {Object} data Data to be updated.
     * @returns Response of Updated Message. If user does not have privilege, return FORBIDDEN.
     */
    async updateMessage(user, mid, data) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
        }

        const newMessage = await this.messageDao.update(mid, data)

        if (newMessage !== null) {
            logger.log(`[${user.username}] UPDATED Message \'${newMessage.label}\'`)
            return newMessage
        } else {
            logger.log(`[${user.username}] FAILED UPDATED Message \'${newMessage.label}\'`)
            return newMessage
        }
    }

    /**
     * Update a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} rid id of the reply to update.
     * @param {Object} data Data to be updated.
     * @returns Updated Reply. If user does not have privilege, return FORBIDDEN.
     */
    async updateReply(user, rid, data) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return response.FORBIDDEN
        }

        const newReply = await this.replyDao.update(rid, data)

        if (newReply !== null) {
            logger.log(`[${user.username}] UPDATED Reply \'${newReply.label}\'`)
            return newReply
        } else {
            logger.log(`[${user.username}] FAILED UPDATE Reply \'${newReply.label}\'`)
            return newReply
        }
    }


    /**
     * Create a well formatted bot.
     * @param {User} user User that makes this operation.
     * @param {*} query Query constraints.
     * @returns A well formatted object containing all the messages and replies.
     */
    async getBot(user, query) {
        // TODO: Implement this
        if (!user.privilege.accessBot) {
            return response.FORBIDDEN
        }

        const messages = await this.messageDao.search()
        const replies = await this.replyDao.search()
        const bot = { messages, replies }
        return bot
    }

}


module.exports = BotService
