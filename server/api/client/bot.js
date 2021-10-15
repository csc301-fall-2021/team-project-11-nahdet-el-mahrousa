const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        msg: "Hello, welcome to NM Entrepreneur Helper! We are here to help you with your startup. How can we help?",
        options: [
            {
                content: "Let's go!",
                next: 2
            }
        ]
    })
})

module.exports = router;
