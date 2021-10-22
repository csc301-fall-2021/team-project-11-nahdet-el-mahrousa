const logger = { log: console.log }
const mongoose = require('mongoose')

class MongooseMessageDao {
    constructor(db) {
        this.db = db
        this.mongoose = db.mongoose;
    }

    async create({ content, label }) {
        this.db.models.Message.create({ content, label }, (err, newMessage) => {
            if (err) {
                logger.log(err)
                return null
            } else {
                logger.log(`MONGOOSE CREATED Message ${newMessage._id}`)
                return newMessage
            }
        })
    }

    async get(mid) {
        const message = await this.models.Message.findById(mid).exec()
        logger.log(`MONGOOSE GET Message ${message}`)
        return message
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

module.exports = MongooseMessageDao;