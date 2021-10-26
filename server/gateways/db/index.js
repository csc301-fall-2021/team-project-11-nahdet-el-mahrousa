module.exports = (uri, mock = false) => {
    if (mock === true || process.env.DATABASE_URI === undefined) {
        return new (require('./db.mock'))()
    } else {
        return new (require('./db.mongoose'))(uri)
    }
}
