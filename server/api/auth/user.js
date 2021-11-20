const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/AuthController.fatory');

router.get("/", async (req, res) => {
    res.send("AUTH")
})

router.post("/create", authenticationToken, async (req, res) => {
    let newUser = await authController.createUser(req)
    if (!newUser) {
        res.status(400).send("Create Failed!")
    } else {
        res.status(200).send(`Create new user ${newUser.username}`)
    }
})

router.post("/delete", authenticationToken, async (req, res) => {
    let delUser = await authController.deleteUser(req)
    if (!delUser) {
        res.status(400).send("Delete Failed!")
    } else {
        res.status(200).send(`Delete user ${delUser.username}`)
    }
})

function authenticationToken(req, res, next) {
    let authHeader = req.headers['authorization']
    let token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(400).send('Forbidden')
    } else {
        jwt.verify(token, process.env.LOGIN_KEY, (err, username) => {
            if (err) {
                res.status(400).send(err)
            } else {
                next()
            }
        })
    }
}