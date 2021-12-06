const jwt = require('jsonwebtoken');
const { respond, response } = require('./response')

// Reference: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
function authenticationToken(req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).send('Unauthorized')
    } else {
        jwt.verify(token, `${process.env.SECRET_KEY}`, (err, username) => {
            if (err) {
                res.status(401).send(respond({ msg: "Session Expired", statusCode: 401 }))
            } else {
                next()
            }
        })
    }
}


module.exports = {
    authenticationToken
}