const logger = { log: console.log }

const MockDBHandler = require('../../gateways/db/db.mock')

class MockReplyDao {
    constructor(db) {
        if (db === undefined) {
            this.db = new MockDBHandler()
        } else {
            this.db = db
        }
    }

    /**
     * Create a reply.
     * @param {*} {content, label, fromMessage, toMessage} 
     * @returns New reply created.
     */
    async create({ content, label, fromMessage, toMessage }) {
        const newReply = { _id: this.db.lastRid++, content, label, fromMessage, toMessage }
        this.db.replies.push(newReply)
        logger.log(`CREATED Reply "${label}" -> ${newReply}`)
        return newReply
    }

    /**
     * Get a reply by id.
     * @param {Integer} rid id of Message.
     * @returns Reply; undefined if not found.
     */
    get(rid) {
        return this.db.replies.find(rpl => rpl._id == rid)
    }

    /**
     * Get all reply.
     * @returns Array of Replies
     */
    getAll() {
        return this.db.replies
    }

    /**
     * Search for replies that satisfy the filter
     * @param {Object} filter 
     * @returns Array of replies.
     */
    search(filter = null) {
        if (filter === null) {
            return this.db.replies
        } else {
            let replies = this.db.replies
            for (let key in filter) {
                replies = replies.filter(rpl => !(key in rpl) || rpl[key] == filter[key])
            }
            return replies
        }
    }

    /**
     * Delete a reply.
     * @param {Integer} mid id of reply.
     * @returns true
     */
    async delete(rid) {
        this.db.replies = this.db.replies.filter(rpl => rpl._id != rid)
        logger.log(`DELETED Reply ${rid}`)
        return true
    }

    /**
     * Update a reply.
     * @param {Integer} mid id of reply.
     * @param {*} data Data to be updated.
     * @returns Updated reply.
     */
    async update(rid, data) {
        const rplIdx = this.db.replies.findIndex(rpl => rpl._id == rid)
        for (let key in data) {
            this.db.replies[rplIdx][key] = data[key]
        }
        const newReply = this.db.replies[rplIdx]
        logger.log(`UPDATED Reply ${rid} -> ${newReply}`)
        return newReply
    }

}

module.exports = MockReplyDao;