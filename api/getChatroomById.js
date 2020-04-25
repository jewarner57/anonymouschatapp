var chatrooms = './chatrooms.json';
var fs = require('fs');

async function getChatroomById(id) {
  let roomKey = id;
  chatroomObj = JSON.parse(await fs.promises.readFile(chatrooms, 'utf8'));

  let rooms = chatroomObj.chatrooms;

  for (let i = 0; i < rooms.length; i++) {
    if (roomKey == rooms[i].id) {
      return rooms[i].id;
    }
  }
  return false;
}

exports.getChatroomById = getChatroomById;
