const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const { User, Message, Reply } = require('../../models/models.mongoose')(mongoose)

const logger = {log: console.log}

/**
 * A database handler for MongoDB with mongoose.
 */
class MongoDBHandler {
    constructor(uri) {
        this.mongoose = mongoose
        this.uri = uri
        this.models = this._registerModels()
    }
    
    /**
     * Set up connection to database.
     */
    async connect() {
        try{
            await this.mongoose.connect(this.uri)
            logger.log(`Set up Mongoose connection to ${this.uri}`)
        } catch (err){
            console.log("Cannot connect to the database!", err);
            process.exit();
        }
    }

    /**
     * Import models.
     * @returns {mongoose.Model}
     */
    _registerModels() {
        return { User, Message, Reply }
    }
}

module.exports = MongoDBHandler