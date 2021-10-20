
module.exports = (uri, mock=false) => {
    if (!mock){
        return new (require('./db.mongoose'))(uri)
    } else {
        return new (require('./db.mock'))()
    }
}
