if (!process.env.DATABASE_URI) {
    // If database not specified, we use mock.
    console.log("USING MOCK DATABASE")
    const { MessageDao, ReplyDao, UserDao } = require('./mock')
    module.exports = { MessageDao, ReplyDao, UserDao }
} else {
    // By specifying database, we use Daos for database.
    const { MessageDao, ReplyDao, UserDao } = require('./mongoose')
    module.exports = { MessageDao, ReplyDao, UserDao }
}
