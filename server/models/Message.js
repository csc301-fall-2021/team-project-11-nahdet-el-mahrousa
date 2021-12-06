
/**
 * Schema for a bot message (question to the user).
 */
const MessageSchema = {
    label: String,
    content: String,
    convertedId: String
}

module.exports = MessageSchema;
