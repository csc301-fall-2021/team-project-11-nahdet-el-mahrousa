const logger = { log: console.log }
const mongoose = require('mongoose')

class MongooseMessageDao {
    constructor(db) {
        this.db = db
        this.mongoose = db.mongoose;
        this.Message = db.models.Message
    }

    /**
     * Create a message.
     * @param {String} content Content of message to show the user.
     * @param {String} label Label of message to show the admin.
     * @returns Created Message.
     */
    async create({ content, label }) {
        try {
            const newMessage = new this.Message({ content, label })
            const createdMessage = await newMessage.save()
            logger.log(`MONGOOSE CREATED Message ${createdMessage._id}`)
            return newMessage
        } catch (err) {
            logger.log(err)
            return undefined
        }
    }

    /**
     * Get a message by id.
     * @param {Integer} mid id of Message.
     * @returns Message; If message not found, return null.
     */
    async get(mid) {
        const message = await this.Message.findById(mid).exec()
        logger.log(`MONGOOSE GET Message ${message}`)
        return message
    }

    /**
     * Get all messages.
     * @returns Array of Messages
     */
    async getAll() {
        return await this.Message.find().exec()
    }

    /**
     * Search for messages that satisfy the filter.
     * @param {Object} filter Field conditions that the messages must satisfy.
     * @returns Array of Messages.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            const messages = await this.Message.find(filter).exec()
            return messages
        } else {
            const messages = await this.Message.find().exec()
            return messages
        }
    }

    /**
     * Delete a message.
     * @param {Integer} mid id of message.
     * @returns Deleted Message； If message not found, return null.
     */
    async delete(mid) {
        const deletedMessage = await this.Message.findByIdAndRemove(mid)
        logger.log(`MONGOOSE DELETE Message ${deletedMessage._id}`)
        return deletedMessage
    }

    /**
     * Update a message.
     * @param {Integer} mid id of message.
     * @param {Object} data Data to be updated.
     * @returns Updated message; If message not found, return null.
     */
    async update(mid, data) {
        const updatedMessage = await this.Message.findByIdAndUpdate(mid, data, { new: true })
        logger.log(`MONGOOSE UPDATED Message to ${updatedMessage}`)
        return updatedMessage
    }

}

module.exports = MongooseMessageDao;