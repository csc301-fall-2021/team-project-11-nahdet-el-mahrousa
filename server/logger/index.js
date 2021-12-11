module.exports = process.env.NODE_ENV === "production" ? require('./ProdLogger') : require('./DevLogger')
