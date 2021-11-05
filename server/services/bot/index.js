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

    /**
     * Get message based on given mid.
     * @param {int} mid the wanted message id.
     * @returns A message object.
     */
    async getMessage(mid) {
        const msg = await this.messageDao.get(mid)
        if (!msg) {
            logger.log(`Message [${mid}] doesn't exist`)
            return msg
        }
        return msg
    }

    /**
     * Get reply based on given rid.
     * @param {int} rid the wanted reply id.
     * @returns A reply object.
     */
    async getReply(rid) {
        const rpl = await this.replyDao.get(rid)
        if (!rpl) {
            logger.log(`Reply [${rid}] doesn't exist`)
            return rpl
        }
        return rpl
    }

    /**
     * Get replies based on given mid.
     * @param {int} mid the wanted message id.
     * @returns A list of reply object.
     */
    async getRepliesByMessage(mid) {
        const msg = await this.getMessage(mid)
        if (!msg) {
            return undefined
        }
        const replies = await this.replyDao.search({ fromMessage: mid })
        return replies
    }

    /**
     * Get next message based on given rid.
     * @param {int} rid the wanted reply id.
     * @returns A message object.
     */
    async getNextMessage(rid) {
        const rpl = await this.getReply(rid)
        if (!rpl) {
            return undefined
        }

        const nextMessage = await this.getMessage(rpl.toMessage)
        return nextMessage
    }

    /**
     * Get next message id based on given rid.
     * @param {int} rid the wanted reply id.
     * @returns An integer repersent the next message's id.
     */
    async getNextMessageId(rid) {
        const rpl = await this.getReply(rid)
        if (!rpl) {
            return undefined
        }

        return rpl.toMessage
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
            return null
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
            return null
        }

        const replies = await this.replyDao.search(query)
        return replies
    }

    /**
     * Create a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {String} content Content of the message for client to read.
     * @param {String} label Label of the message for admin to read.
     * @returns New Message. If user does not have privilege, return null.
     */
    async createMessage(user, content, label) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const newMessage = await this.messageDao.create({ content, label })

        if (newMessage !== null) {
            logger.log(`[${user.username}] CREATED Message ${newMessage._id} \'${label}\'`)
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
     * @returns New Reply. If user does not have privilege, return null.
     */
    async createReply(user, content, label, fromMessage, nextMessage) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const newReply = await this.replyDao.create({ content, label, fromMessage, nextMessage })

        if (newReply !== null) {
            logger.log(`[${user.username}] CREATED Reply \'${newReply._id}\'`)
            return newReply
        } else {
            logger.log(`[${user.username}] FAILED CREATE Reply \'${label}\'`)
            return undefined
        }
    }

    /**
     * Delete a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to delete.
     * @returns The Message deleted. If user does not have privilege, return null.
     */
    async deleteMessage(user, mid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const delMessage = await this.messageDao.delete(mid)

        if (delMessage !== null) {
            logger.log(`[${user.username}] DELETED Message \'${mid}\'`)
            return delMessage
        } else {
            logger.log(`[${user.username}] FAILED DELETE Message \'${mid}\'`)
            return undefined
        }
    }

    /**
     * Delete a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} rid id of the reply to delete.
     * @returns The Reply deleted. If user does not have privilege, return null.
     */
    async deleteReply(user, rid) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const delReply = await this.replyDao.delete(rid)

        if (delReply !== null) {
            logger.log(`[${user.username}] DELETED Reply \'${rid}\'`)
            return delReply
        } else {
            logger.log(`[${user.username}] FAILED DELETE Reply \'${rid}\'`)
            return undefined
        }
    }

    /**
     * Update a message. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} mid id of the message to update.
     * @param {Object} data Data to be updated.
     * @returns Updated Message. If user does not have privilege, return null.
     */
    async updateMessage(user, mid, data) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const newMessage = await this.messageDao.update(mid, data)

        if (newMessage !== null) {
            logger.log(`[${user.username}] UPDATED Message \'${mid}\'`)
            return newMessage
        } else {
            logger.log(`[${user.username}] FAILED UPDATED Message \'${mid}\'`)
            return undefined
        }
    }

    /**
     * Update a reply. If the user does not have privilege, then the action is forbidden.
     * @param {User} user User that makes this operation.
     * @param {ObjectId} rid id of the reply to update.
     * @param {Object} data Data to be updated.
     * @returns Updated Reply. If user does not have privilege, return null.
     */
    async updateReply(user, rid, data) {
        // Validate modifier's privilege
        if (!user.privilege.modifyBot) {
            return null
        }

        const newReply = await this.replyDao.update(rid, data)

        if (newReply !== null) {
            logger.log(`[${user.username}] UPDATED Reply \'${rid}\'`)
            return newReply
        } else {
            logger.log(`[${user.username}] FAILED UPDATE Reply \'${rid}\'`)
            return undefined
        }
    }


    /**
     * Construct a formatted array of objects containing messages and corresponding replies.
     * @param {Array} message Messages in database.
     * @param {Array} replies Replies in database. 
     * @returns [ { message, replies } ]
     */
    _buildBotList({ messages, replies }) {
        // TODO: Improve this
        const bot = []

        for (let msg of messages) {
            const repliesOfMessage = replies.filter(r => r.fromMessage.toString() === msg._id.toString())
            bot.push({
                message: msg,
                replies: repliesOfMessage
            })
        }

        return bot
    }

    /**
     * Create a well formatted bot.
     * @param {User} user User that makes this operation.
     * @param {*} query Query constraints on Messages.
     * @returns A well formatted object containing all the messages and replies: [ { message, replies } ]
     */
    async getBot(user, query) {
        if (!user.privilege.accessBot) {
            return null
        }

        const messages = await this.messageDao.search(query)
        const replies = await this.replyDao.search()
        const bot = this._buildBotList({ messages, replies })
        return bot
    }

}


module.exports = BotService
