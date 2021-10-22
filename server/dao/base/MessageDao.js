const logger = { log: console.log }

class MessageDao {
    constructor(db) {
        this.db = db
    }

    /**
     * Create a message.
     * @param {*} {content, label} 
     * @returns New message created.
     */
    async create({ content, label }) {
        return null
    }

    /**
     * Get a message by id.
     * @param {Integer} mid id of Message.
     * @returns Message; undefined if not found.
     */
    get(mid) {
        return null
    }

    /**
     * Get all messages.
     * @returns Array of Messages
     */
    getAll() {
        return null
    }

    /**
     * Search for messages that satisfy the filter
     * @param {Object} filter 
     * @returns Array of Messages.
     */
    search(filter = null) {
        return null
    }

    /**
     * Delete a message.
     * @param {Integer} mid id of message.
     * @returns true
     */
    async delete(mid) {
        return null
    }

    /**
     * Update a message.
     * @param {Integer} mid id of message.
     * @param {*} data Data to be updated.
     * @returns Updated message.
     */
    async update(mid, data) {
        return null
    }

}

module.exports = MessageDao;