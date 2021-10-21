const logger = { log: console.log }

class MessageDao {
    constructor(db) {
        this.db = db
    }

    async create({ content, label }) {
        return null
    }

    async get(mid) {
        return null
    }

    async getAll() {
        return null
    }

    async search(filter = null) {
        return null
    }

    async delete(mid) {
        return null
    }

    async update(mid, data) {
        return null
    }

}

module.exports = MessageDao;