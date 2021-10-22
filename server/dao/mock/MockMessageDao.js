const logger = { log: console.log }

class MockMessageDao {
    constructor(db) {
        this.db = db
    }

    /**
     * Create a message.
     * @param {*} {content, label} 
     * @returns New message created.
     */
    async create({ content, label }) {
        const newMessage = { _id: this.db.lastMid++, content, label }
        this.db.messages.push(newMessage)
        logger.log(`CREATED Message "${label}"`)
        return newMessage
    }

    /**
     * Get a message by id.
     * @param {Integer} mid id of Message.
     * @returns Message; undefined if not found.
     */
    async get(mid) {
        return this.db.messages.find(msg => msg._id == mid)
    }

    /**
     * Get all messages.
     * @returns Array of Messages
     */
    async getAll() {
        return this.db.messages
    }

    /**
     * Search for messages that satisfy the filter
     * @param {Object} filter 
     * @returns Array of Messages.
     */
    async search(filter = null) {
        if (filter === null) {
            return this.db.messages
        } else {
            let messages = this.db.messages
            for (let key in filter) {
                messages = messages.filter(msg => msg[key] == filter[key])
            }
            return messages
        }
    }

    /**
     * Delete a message.
     * @param {Integer} mid id of message.
     * @returns true
     */
    async delete(mid) {
        this.db.messages = this.db.messages.filter(msg => msg._id != mid)
        logger.log(`DELETED Message ${mid}`)
        return true
    }

    /**
     * Update a message.
     * @param {Integer} mid id of message.
     * @param {Object} data Data to be updated.
     * @returns Updated message.
     */
    async update(mid, data) {
        const msgIdx = this.db.messages.findIndex(msg => msg._id == mid)
        for (let key in data) {
            this.db.messages[msgIdx][key] = data[key]
        }
        const newMsg = this.db.messages[msgIdx]
        logger.log(`UPDATED Message ${mid} -> ${newMsg}`)
        return newMsg
    }

}

module.exports = MockMessageDao;