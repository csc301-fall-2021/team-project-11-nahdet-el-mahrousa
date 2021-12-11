const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
const { authenticationToken } = require('../../utils/auth')

const authController = require('../../controllers/auth/AuthController.factory');

router.get("/", authenticationToken, async (req, res) => {
    let response = await authController.getUsers(req)
    res.status(response.statusCode).send(response)
})

// router.post("/initial", async (req, res) => {
//     let response = await authController.createUser(req, "initial")
//     res.status(response.statusCode).send(response)
// })


router.post("/", authenticationToken, async (req, res) => {
    let response = await authController.createUser(req, null)
    res.status(response.statusCode).send(response)
})


router.delete("/", authenticationToken, async (req, res) => {
    let response = await authController.deleteUser(req)
    res.status(response.statusCode).send(response)
})


module.exports = router
