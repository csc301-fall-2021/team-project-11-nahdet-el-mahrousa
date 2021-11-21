const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authController = require('../../controllers/auth/AuthController.factory');

router.get("/", async (req, res) => {
    res.send("AUTH")
})

router.post("/initial", async (req, res) => {
    let response = await authController.createUser(req)
    res.status(response.statusCode).send(response)
})


router.post("/", authenticationToken, async (req, res) => {
    let response = await authController.createUser(req)
    res.status(response.statusCode).send(response)
})


router.delete("/", authenticationToken, async (req, res) => {
    let response = await authController.deleteUser(req)
    res.status(response.statusCode).send(response)
})

// Reference: https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
function authenticationToken(req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).send('Unauthorized')
    } else {
        jwt.verify(token, process.env.SECRET_KEY, (err, username) => {
            if (err) {
                res.status(403).send(err)
            } else {
                next()
            }
        })
    }
}


module.exports = router
