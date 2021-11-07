if (process.env.DATABASE_URI === undefined) {
    // If database not specified, we use mock.
    console.log("USING MOCK DATABASE")
    const { MessageDao, ReplyDao } = require('./mock')
    module.exports = { MessageDao, ReplyDao }
} else {
    // By specifying database, we use Daos for database.
    const { MessageDao, ReplyDao } = require('./mongoose')
    module.exports = { MessageDao, ReplyDao }
}
