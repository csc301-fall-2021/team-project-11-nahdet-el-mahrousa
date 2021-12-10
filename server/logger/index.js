const uri = process.env.DATABASE_URI

console.log(process.env)
let logger = null
if (process.env.NODE_ENV === "prod") {
    logger = (new (require('./ProdLogger'))(uri)).buildLogger()
} else {
    logger = (new (require('./DevLogger'))(uri)).buildLogger()
}

module.exports = logger