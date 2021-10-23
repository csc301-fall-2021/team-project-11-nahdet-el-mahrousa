// var logger = require('logger').createLogger()
const { ReasonPhrases, StatusCodes } = require('http-status-codes')
const { respond } = require('../../utils/response')
const logger = { log: console.log }

class BotService {
    /**
     * Constructor of BotService.
     * @param {MessageDao} messageDao 
     * @param {ReplyDao} replyDao 
     */
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
     * Create a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {String} content Content of the message for client to read.
     * @param {String} label Label of the message for admin to read.
     * @returns New Message. If user does not have privilege, return FORBIDDEN.
     */
    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const newMessage = await this.messageDao.create({ content, label })

        if (newMessage !== null) {
            logger.log(`[${user.username}] CREATED Message \'${label}\'`)
            return respond({ entity: newMessage })
        } else {
            logger.log(`[${user.username}] FAILED CREATE Message \'${label}\'`)
            return respond({ entity: newMessage })
        }
    }

    /**
     * Create a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {String} content Content of the reply for client to read.
     * @param {String} label Label of the reply for admin to read.
     * @param {ObjectId} fromMessage The message id that this replies/option belongs to.
     * @param {ObjectId} toMessage The message id that this replies redirects to.
     * @returns New Reply. If user does not have privilege, return FORBIDDEN.
     */
    async createReply(user, content, label, fromMessage, nextMessage) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const newReply = await this.replyDao.create({ content, label, fromMessage, nextMessage })

        if (newReply !== null) {
            logger.log(`[${user.username}] CREATED Reply \'${rid}\'`)
            return respond({ entity: newReply })
        } else {
            logger.log(`[${user.username}] FAILED CREATE Reply \'${rid}\'`)
            return respond({ entity: newReply })
        }
    }

    /**
     * Delete a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to delete.
     * @returns The Message deleted. If user does not have privilege, return FORBIDDEN.
     */
    async deleteMessage(user, mid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const delMessage = await this.messageDao.delete(mid)

        if (delMessage !== null) {
            logger.log(`[${user.username}] DELETED Message \'${label}\'`)
            return respond({ entity: delMessage })
        } else {
            logger.log(`[${user.username}] FAILED DELETE Message \'${label}\'`)
            return respond({ entity: delMessage })
        }
    }

    /**
     * Delete a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} rid id of the reply to delete.
     * @returns The Reply deleted. If user does not have privilege, return FORBIDDEN.
     */
    async deleteReply(user, rid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const delReply = await this.replyDao.delete(rid)

        if (delReply !== null) {
            logger.log(`[${user.username}] DELETED Reply \'${rid}\'`)
            return respond({ entity: delReply })
        } else {
            logger.log(`[${user.username}] FAILED DELETE Reply \'${rid}\'`)
            return respond({ entity: delReply })
        }
    }

    /**
     * Update a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to update.
     * @param {Object} data Data to be updated.
     * @returns Updated Message. If user does not have privilege, return FORBIDDEN.
     */
     async updateMessage(user, mid, data) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const newMessage = await this.messageDao.update(mid, data)

        if (newMessage !== null) {
            logger.log(`[${user.username}] UPDATED Message \'${label}\'`)
            return respond({ entity: newMessage })
        } else {
            logger.log(`[${user.username}] FAILED UPDATED Message \'${label}\'`)
            return respond({ entity: newMessage })
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
            return respond({ statusCode: StatusCodes.FORBIDDEN, msg: ReasonPhrases.FORBIDDEN })
        }

        const newReply = await this.replyDao.update(rid, data)

        if (newReply !== null) {
            logger.log(`[${user.username}] UPDATED Reply \'${rid}\'`)
            return respond({ entity: newReply })
        } else {
            logger.log(`[${user.username}] FAILED UPDATE Reply \'${rid}\'`)
            return respond({ entity: newReply })
        }
    }

}


module.exports = BotService
