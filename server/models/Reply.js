
/**
 * Schema for user's reply to bot message (answer option of a question).
 */
const ReplySchema = {
    label: Number,
    content: String,
    fromMessage: Number,
    toMessage: Number,
}

module.exports = ReplySchema;
