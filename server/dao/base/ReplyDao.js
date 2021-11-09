const logger = { log: console.log }

class ReplyDao {
    constructor(db) {
        this.db = db
    }

    /**
     * Create a reply.
     * @param {*} {content, label, fromMessage, toMessage} 
     * @returns New reply created.
     */
    async create({ content, label, fromMessage, toMessage }) {
        return null
    }

    /**
     * Get a reply by id.
     * @param {Integer} rid id of Message.
     * @returns Reply; undefined if not found.
     */
    get(rid) {
        return null
    }

    /**
     * Get all reply.
     * @returns Array of Replies
     */
    getAll() {
        return null
    }

    /**
     * Search for replies that satisfy the filter
     * @param {Object} filter 
     * @returns Array of replies.
     */
    search(filter = null) {
        return null
    }

    /**
     * Delete a reply.
     * @param {Integer} mid id of reply.
     * @returns true
     */
    async delete(rid) {
        return null
    }

    /**
     * Update a reply.
     * @param {Integer} mid id of reply.
     * @param {*} data Data to be updated.
     * @returns Updated reply.
     */
    async update(rid, data) {
        return null
    }

}

module.exports = ReplyDao;