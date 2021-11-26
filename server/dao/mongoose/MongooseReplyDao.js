const logger = { log: console.log }
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
            const newReply = new Reply({ content, label, fromMessage, toMessage })
            const createdReply = await newReply.save()
            logger.log(`MONGOOSE CREATED Reply ${createdReply._id}`)
            return newReply
        } catch (err) {
            logger.log(err)
            return null
        }
    }
    //TODO: Decide on if we need it
    async getMultiple(rid){
        let ridInput = rid.map(function(val){
            return ObjectId(val);
        })
        const reply = await Reply.find({"_id" : {"$in" : ridInput }});
        return reply
    }

    /**
     * Get a reply by id.
     * @param {Integer} rid id of Reply.
     * @returns Reply; If reply not found, return null.
     */
    async get(rid) {
        const reply = await Reply.findById(rid).exec()
        logger.log(`MONGOOSE GET Reply ${reply}`)
        return reply
    }

    /**
     * Get all replies.
     * @returns Array of Replies
     */
    async getAll() {
        return await Reply.find().exec()
    }

    /**
     * Search for replies that satisfy the filter.
     * @param {Object} filter Field conditions that the replies must satisfy.
     * @returns Array of Replies.
     */
    async search(filter = null) {
        if (filter) {
            // TODO: apply filter check.
            const replies = await Reply.find(filter).exec()
            return replies
        } else {
            const replies = await Reply.find().exec()
            return replies
        }
    }

    /**
     * Delete a reply.
     * @param {Integer} rid id of reply.
     * @returns Deleted Reply. If reply not found, return null.
     */
    async delete(rid) {
        const deletedReply = await Reply.findByIdAndRemove(rid)
        if (deletedReply !== null) {
            logger.log(`MONGOOSE DELETED Reply ${deletedReply._id}`)
        } else {
            logger.log(`MONGOOSE FAILED DELETE Reply ${rid}`)
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
        const updatedReply = await Reply.findByIdAndUpdate(rid, data, { new: true })
        if (updatedReply !== null) {
            logger.log(`MONGOOSE UPDATED Reply ${updatedReply._id}`)
        } else {
            logger.log(`MONGOOSE FAILED UPDATE Reply ${rid}`)
        }
        return updatedReply
    }

}

module.exports = MongooseReplyDao;