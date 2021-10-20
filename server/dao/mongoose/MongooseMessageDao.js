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
                return newMessage
            }
        })
    }

    // getAll(page=-1, filter=null) {
    //     if (page !== -1){
    //         return this.mongoose.retrieve('Reply', page=page, filter=filter)
    //     } else {
    //         return this.mongoose.retrieve('Reply', query=null)
    //     }
    // }

}

module.exports = MongooseMessageDao;