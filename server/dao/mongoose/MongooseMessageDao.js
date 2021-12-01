const logger = { log: console.log }

const { Message } = require('../../models/models.mongoose')

class MongooseMessageDao {
    constructor(db = null) {
        this.db = db
        // this.Message = db.models.Message
    }

    /**
     * Create a message.
     * @param {String} content Content of message to show the user.
     * @param {String} label Label of message to show the admin.
     * @returns Created Message. If not created, return null.
     */
    async create({ content, label }) {
        try {
            const newMessage = new Message({ content, label })
            const createdMessage = await newMessage.save()
            await Message.findByIdAndUpdate(createdMessage._id, { convertedId: createdMessage._id.toString() })
            logger.log(`MONGOOSE CREATED Message ${createdMessage._id}`)
            return newMessage
        } catch (err) {
            logger.log(err)
            return null
        }
    }

    /**
     * Get a message by id.
     * @param {Integer} mid id of Message.
     * @returns Message; If message not found, return null.
     */
    async get(mid) {
        const message = await Message.findById(mid).exec()
        logger.log(`MONGOOSE GET Message ${message}`)
        return message
    }

    /**
     * Get all messages.
     * @returns Array of Messages
     */
    async getAll() {
        return await Message.find().exec()
    }

    /**
     * Search for messages that satisfy the filter.
     * @param {Object} filter Field conditions that the messages must satisfy.
     * @returns Array of Messages.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            const messages = await Message.find(filter).exec()
            logger.log(`MONGOOSE SEARCH Messages with filter ${filter}`)
            return messages
        } else {
            const messages = await Message.find().exec()
            logger.log(`MONGOOSE SEARCH All Messages`)
            return messages
        }
    }

    /**
     * Delete a message.
     * @param {Integer} mid id of message.
     * @returns Deleted Message； If message not found, return null.
     */
    async delete(mid) {
        const deletedMessage = await Message.findByIdAndRemove(mid)
        if (deletedMessage !== null) {
            logger.log(`MONGOOSE DELETED Message ${deletedMessage._id}`)
        } else {
            logger.log(`MONGOOSE FAILED DELETE Message ${mid}`)
        }
        return deletedMessage
    }

    /**
     * Update a message.
     * @param {Integer} mid id of message.
     * @param {Object} data Data to be updated.
     * @returns Updated message; If message not found, return null.
     */
    async update(mid, data) {
        const updatedMessage = await Message.findByIdAndUpdate(mid, data, { new: true })
        if (updatedMessage !== null) {
            logger.log(`MONGOOSE UPDATED Message ${updatedMessage._id}`)
        } else {
            logger.log(`MONGOOSE FAILED UPDATE Message ${mid}`)
        }
        return updatedMessage
    }

}

module.exports = MongooseMessageDao;