const logger = { log: console.log }

class ReplyDao {
    constructor(db) {
        this.db = db
    }

    async create({ content, label, fromMessage, toMessage }) {
        return null
    }

    async get(rid) {
        return null
    }

    async getAll() {
        return null
    }

    async search(filter = null) {
        return null
    }

    async delete(rid) {
        return null
    }

    async update(rid, data) {
        return null
    }

}

module.exports = ReplyDao;