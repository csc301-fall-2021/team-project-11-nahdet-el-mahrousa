const mongoose = require('mongoose')

class MongooseReplyDao {
    constructor(db){
        this.db = db;
    }

    // async create({content, label}){

    // }

    // getAll(page=-1, filter=null) {
    //     if (page !== -1){
    //         return this.mongoose.retrieve('Reply', page=page, filter=filter)
    //     } else {
    //         return this.mongoose.retrieve('Reply', query=null)
    //     }
    // }

}

module.exports = MongooseReplyDao;