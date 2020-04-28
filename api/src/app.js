const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const createChatroom = require('./createChatroom');
const joinChatroom = require('./joinChatroomById');
const findEmptyRooms = require('./findEmptyRooms');

//Port from environment variable or default - 5000
const port = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  //console.log('Client Connected');
  socket.join('global');

  socket.on('sendGlobalMessage', (message) => {
    console.log('Global Chat: ', message.body);
    socket.broadcast.to('global').emit('receiveGlobalMessage', message.body);
  });

  socket.on('getRoomPopulation', (roomID) => {
    let roomPopulation = io.socket.adapter.rooms[roomID].length;
    let roomMaxPopulation = getRoomMaxUsers.getRoomMaxUsers(roomID);

    console.log(roomPopulation);
    socket.emit('recieveRoomPopulation', roomPopulation);
  });

  socket.on('createNewChatroom', async (settings) => {
    socket.leave('global');

    let roomCode = await createChatroom.createChatroom(settings, socket.id);
    socket.join(roomCode);

    socket.emit('recieveChatroomCode', roomCode);
  });

  socket.on('joinChatroom', async (roomObj) => {
    socket.leave('global');

    let joinRoom = await joinChatroom.joinChatroomById(
      roomObj,
      io.sockets.adapter.rooms[roomObj.id]
    );

    if (joinRoom.willJoin !== false) {
      socket.join(joinRoom.id);
      socket.emit('validateJoin', joinRoom);
    } else {
      socket.emit('joinError', joinRoom.status);
    }
  });

  socket.on('sendPrivateMessage', (message) => {
    socket.broadcast
      .to(message.roomID)
      .emit('recieve' + message.roomID, message.body);
  });

  socket.on('disconnect', async () => {
    //console.log('Client Disconnected');
    await findEmptyRooms.findEmptyRooms(io);
  });
});

//Socket.io resources for controlling emit recipients
//https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
//https://socket.io/docs/rooms-and-namespaces/

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
