
/**
 * Schema for a bot message (question to the user).
 */
 const MessageSchema = {
    label: Number,
    content: String,
    replies: Array
}

module.exports = MessageSchema;
