const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const authController = require('../../controllers/auth/AuthController.fatory');


router.post("/login", async (req, res) => {
    let loginUser = await authController.login(req)
    if(!loginUser){
        res.status(400).send("Login Failed!")
    }else{
        let accessToken = jwt.sign({username: loginUser.username}, process.env.LOGIN_KEY, { expiresIn: "30m" })
        res.status(200).send(accessToken)
    }
})