const logger = require('../../logger')
const { Reply } = require('../../models/models.mongoose')
const OnjectId = require("mongodb").ObjectId

class MongooseReplyDao {
    constructor(db = null) {
        this.db = db;
        // this.Reply = db.models.Reply
    }

    /**
     * Create a reply.
     * @param {String} content Content of reply to show the user.
     * @param {String} label Label of reply to show the admin.
     * @param {ObjectId} fromMessage The message id that this replies/option belongs to.
     * @param {ObjectId} toMessage The message id that this replies redirects to.
     * @returns Created Reply. If not created, return null.
     */
    async create({ content, label, fromMessage, toMessage }) {
        try {
            logger.info(`MONGOOSE CREATING Reply`)
            const newReply = new Reply({ content, label, fromMessage, toMessage })
            const createdReply = await newReply.save()
            await Reply.findByIdAndUpdate(createdReply._id, { convertedId: createdReply._id.toString() })
            logger.info(`MONGOOSE CREATED Reply ${createdReply._id}`)
            return newReply
        } catch (err) {
            logger.error(err)
            return null
        }
    }

    /**
     * Get a reply by id.
     * @param {Integer} rid id of Reply.
     * @returns Reply; If reply not found, return null.
     */
    async get(rid) {
        logger.info(`MONGOOSE GETTING Reply with id of ${rid}`)
        const reply = await Reply.findById(rid).exec()
        logger.info(`MONGOOSE GOT Reply ${reply}`)
        return reply
    }

    /**
     * Get all replies.
     * @returns Array of Replies
     */
    async getAll() {
        logger.info(`MONGOOSE GETTING All Reply`)
        let replies = await Reply.find().exec()
        logger.info(`MONGOOSE GOT All Reply`)
        return replies
    }

    /**
     * Search for replies that satisfy the filter.
     * @param {Object} filter Field conditions that the replies must satisfy.
     * @returns Array of Replies.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            logger.info(`MONGOOSE SEARCHING All Replies with filter ${filter}`)
            const replies = await Reply.find(filter).exec()
            logger.info(`MONGOOSE SEARCHED All Replies with filter ${filter}`)
            return replies
        } else {
            logger.info(`MONGOOSE SEARCHING All Replies`)
            const replies = await Reply.find().exec()
            logger.info(`MONGOOSE SEARCHED All Replies`)
            return replies
        }
    }

    /**
     * Delete a reply.
     * @param {Integer} rid id of reply.
     * @returns Deleted Reply. If reply not found, return null.
     */
    async delete(rid) {
        logger.info(`MONGOOSE DELETING Replie ${rid}`)
        const deletedReply = await Reply.findByIdAndRemove(rid)
        if (deletedReply !== null) {
            logger.info(`MONGOOSE DELETED Reply ${deletedReply._id}`)
        } else {
            logger.info(`MONGOOSE FAILED DELETE Reply ${rid}`)
        }
        return deletedReply
    }

    /**
     * Update a reply.
     * @param {Integer} rid id of reply.
     * @param {Object} data Data to be updated.
     * @returns Updated reply. If reply not found, return null.
     */
    async update(rid, data) {
        logger.info(`MONGOOSE UPDATING Reply ${rid}`)
        const updatedReply = await Reply.findByIdAndUpdate(rid, data, { new: true })
        if (updatedReply !== null) {
            logger.info(`MONGOOSE UPDATED Reply ${updatedReply._id}`)
        } else {
            logger.info(`MONGOOSE FAILED UPDATE Reply ${rid}`)
        }
        return updatedReply
    }

}

module.exports = MongooseReplyDao;