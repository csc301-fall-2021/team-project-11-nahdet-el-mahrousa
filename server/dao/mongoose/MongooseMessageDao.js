const logger = require('../../logger')

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
            logger.info(`MONGOOSE CREATING Message`)
            const newMessage = new Message({ content, label })
            const createdMessage = await newMessage.save()
            await Message.findByIdAndUpdate(createdMessage._id, { convertedId: createdMessage._id.toString() })
            logger.info(`MONGOOSE CREATED Message ${createdMessage._id}`)
            return newMessage
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    /**
     * Get a message by id.
     * @param {Integer} mid id of Message.
     * @returns Message; If message not found, return null.
     */
    async get(mid) {
        logger.info(`MONGOOSE GETTING Message`)
        const message = await Message.findById(mid).exec()
        logger.info(`MONGOOSE GOT Message ${message}`)
        return message
    }

    /**
     * Get all messages.
     * @returns Array of Messages
     */
    async getAll() {
        logger.info(`MONGOOSE GETTING All Messages`)
        let messages = await Message.find().exec()
        logger.info(`MONGOOSE GOT All Messages`)
        return messages
    }

    /**
     * Search for messages that satisfy the filter.
     * @param {Object} filter Field conditions that the messages must satisfy.
     * @returns Array of Messages.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            logger.info(`MONGOOSE SEARCHING Messages with filter ${filter}`)
            const messages = await Message.find(filter).exec()
            logger.info(`MONGOOSE SEARCHED Messages with filter ${filter}`)
            return messages
        } else {
            logger.info(`MONGOOSE SEARCHING ALL Messages`)
            const messages = await Message.find().exec()
            logger.info(`MONGOOSE SEARCHED All Messages`)
            return messages
        }
    }

    /**
     * Delete a message.
     * @param {Integer} mid id of message.
     * @returns Deleted Message； If message not found, return null.
     */
    async delete(mid) {
        logger.info(`MONGOOSE DELETING Message ${mid}`)
        const deletedMessage = await Message.findByIdAndRemove(mid)
        if (deletedMessage !== null) {
            logger.info(`MONGOOSE DELETED Message ${deletedMessage._id}`)
        } else {
            logger.info(`MONGOOSE FAILED DELETE Message ${mid}`)
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
        logger.info(`MONGOOSE UPDATING Message ${mid}`)
        const updatedMessage = await Message.findByIdAndUpdate(mid, data, { new: true })
        if (updatedMessage !== null) {
            logger.info(`MONGOOSE UPDATED Message ${updatedMessage._id}`)
        } else {
            logger.info(`MONGOOSE FAILED UPDATE Message ${mid}`)
        }
        return updatedMessage
    }

}

module.exports = MongooseMessageDao;