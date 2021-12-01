const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth/AuthController.factory');


router.post("/login", async (req, res) => {
    let response = await authController.login(req)
    res.status(response.statusCode).send(response)
})


module.exports = router
