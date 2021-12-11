const mongoose = require('mongoose')
/**
 * Schema for user's reply to bot message (answer option of a question).
 */
const ReplySchema = {
    label: String,
    content: String,
    fromMessage: String,
    toMessage: String,
    convertedId: String
}

module.exports = ReplySchema;
