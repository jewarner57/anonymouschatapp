var chatrooms = './chatrooms.json';
var fs = require('fs');

function createChatroom() {
  let token = Math.floor(Math.random() * 100000000);

  let newChatroom = {
    id: token,
    password: '',
    maxPopulation: 10,
    timeCreated: new Date(),
    currentUsers: [],
  };

  //empty chatroom.json file should contain: { "chatrooms": [] }
  fs.readFile(chatrooms, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      let chatroomObj = JSON.parse(data);
      chatroomObj.chatrooms.push(newChatroom);
      chatroomObj = JSON.stringify(chatroomObj);

      fs.writeFile(chatrooms, chatroomObj, 'utf8', () =>
        console.log('New Chatroom Added')
      );
    }
  });

  return token;
}

exports.createChatroom = createChatroom;
