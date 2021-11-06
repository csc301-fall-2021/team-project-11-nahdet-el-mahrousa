var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send(`<h1>Welcome to ${process.env.APP_NAME || "NM_BOT"}</h1>`);
});

module.exports = router;
