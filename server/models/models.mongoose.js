const mongoose = require('mongoose')

/**
 * Define Schemas and Models in mongoose.
 */
const User = mongoose.model(
    "User",
    mongoose.Schema(require('./User'))
)

const Message = mongoose.model(
    "Message",
    mongoose.Schema(require('./Message'))
)

const Reply = mongoose.model(
    "Reply",
    mongoose.Schema(require('./Reply'))
)

module.exports = { User, Message, Reply }
