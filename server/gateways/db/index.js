module.exports = (uri, mock = false) => {
    if (mock === true || uri === undefined) {
        return new (require('./db.mock'))()
    } else {
        return new (require('./db.mongoose'))(uri)
    }
}
