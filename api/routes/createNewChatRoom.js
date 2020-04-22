var express = require('express');
var router = express.Router();
var createChatroom = require('../createChatroom.js');

router.get('/', function (req, res, next) {
  res.send(createChatroom.createChatroom().toString());
});

module.exports = router;
