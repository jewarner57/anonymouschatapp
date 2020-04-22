var express = require('express');
var router = express.Router();
var getChatroomById = require('../getChatroomById');

router.get('/', async function (req, res, next) {
  const roomObj = await getChatroomById.getChatroomById(req.query['id']);
  res.send(roomObj);
});

module.exports = router;
