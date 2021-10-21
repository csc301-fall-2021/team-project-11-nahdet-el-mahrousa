const logger = { log: console.log }

class MockReplyDao {
    constructor(db) {
        this.db = db
    }

    async create({ content, label, fromMessage, toMessage }) {
        const newReply = { _id: this.db.lastRid++, content, label, fromMessage, toMessage }
        this.db.replies.push(newReply)
        logger.log(`CREATED Reply "${label}" -> ${newReply}`)
        return newReply
    }

    async get(rid) {
        return this.db.replies.find(rpl => rpl._id == rid)
    }

    async getAll() {
        return this.db.replies
    }

    async search(filter = null) {
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

    async delete(rid) {
        this.db.replies = this.db.replies.filter(rpl => !(key in rpl) || rpl._id != rid)
        logger.log(`DELETED Reply ${rid}`)
        return true
    }

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