const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const createChatroom = require('./createChatroom');
const getChatroomById = require('./getChatroomById');

//Port from environment variable or default - 5000
const port = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  socket.join('global');
  console.log('Client Connected');

  socket.on('sendGlobalMessage', (message) => {
    console.log('Global Chat: ', message.body);
    socket.broadcast.to('global').emit('receiveGlobalMessage', message.body);
  });

  socket.on('joinChatroom', async (code) => {
    let joinRoom = await getChatroomById.getChatroomById(code);

    if (joinRoom !== false) {
      socket.join(joinRoom);
    }

    socket.emit('validateJoin', joinRoom);
  });

  socket.on('createNewChatroom', (settings) => {
    let roomCode = createChatroom.createChatroom();
    socket.leave('global');
    socket.join(roomCode);

    socket.emit('recieveChatroomCode', roomCode);
  });

  socket.on('sendPrivateMessage', (message) => {
    socket.broadcast
      .to(message.roomID)
      .emit('recieve' + message.roomID, message.body);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

//Socket.io resources for controlling emit recipients
//https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
//https://socket.io/docs/rooms-and-namespaces/

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
