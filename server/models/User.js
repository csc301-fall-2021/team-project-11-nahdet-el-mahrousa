
/**
 * Schema of a user of the app.
 */
const UserSchema = {
    username: String,
    password: String,
    name: String,
    email: String,
    privilege: {
        active: Boolean,        // Account is active
        admin: Boolean,         // Can log into admin dashboard
        accessData: Boolean,    // Can view statistic data
        modifyData: Boolean,    // Can modify statistic data
        accessBot: Boolean,     // Can view Bot messages and replies
        modifyBot: Boolean      // Can modify Bot messages and replies
    }
}

module.exports = UserSchema;
