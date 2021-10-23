const mongoose = require('mongoose')

class MongooseReplyDao {
    constructor(db) {
        this.db = db;
        this.mongoose = db.mongoose;
        this.Reply = db.models.Reply
    }

    /**
     * Create a reply.
     * @param {String} content Content of reply to show the user.
     * @param {String} label Label of reply to show the admin.
     * @param {ObjectId} fromMessage The message id that this replies/option belongs to.
     * @param {ObjectId} toMessage The message id that this replies redirects to.
     * @returns Created Reply.
     */
    async create({ content, label, fromMessage, toMessage }) {
        try {
            const newReply = new this.Reply({ content, label, fromMessage, toMessage })
            const createdReply = await newReply.save()
            logger.log(`MONGOOSE CREATED Reply ${createdReply._id}`)
            return newReply
        } catch (err) {
            logger.log(err)
            return undefined
        }
    }

    /**
     * Get a reply by id.
     * @param {Integer} rid id of Reply.
     * @returns Reply; If reply not found, return null.
     */
    async get(rid) {
        const reply = await this.Reply.findById(rid).exec()
        logger.log(`MONGOOSE GET Reply ${reply}`)
        return reply
    }

    /**
     * Get all replies.
     * @returns Array of Replies
     */
    async getAll() {
        return await this.Reply.find().exec()
    }

    /**
     * Search for replies that satisfy the filter.
     * @param {Object} filter Field conditions that the replies must satisfy.
     * @returns Array of Replies.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            const replies = await this.Reply.find(filter).exec()
            return replies
        } else {
            const replies = await this.Reply.find().exec()
            return replies
        }
    }

    /**
     * Delete a reply.
     * @param {Integer} rid id of reply.
     * @returns Deleted Reply. If reply not found, return null.
     */
    async delete(rid) {
        const deletedReply = await this.Reply.findByIdAndRemove(rid)
        logger.log(`MONGOOSE DELETE Reply ${deletedReply._id}`)
        return deletedReply
    }

    /**
     * Update a reply.
     * @param {Integer} rid id of reply.
     * @param {Object} data Data to be updated.
     * @returns Updated reply. If reply not found, return null.
     */
    async update(rid, data) {
        const updatedReply = await this.Reply.findByIdAndUpdate(rid, data, { new: true })
        logger.log(`MONGOOSE UPDATED Reply to ${updatedReply}`)
        return updatedReply
    }

}

module.exports = MongooseReplyDao;