const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const createChatroom = require('./createChatroom');
const joinChatroom = require('./joinChatroomById');
const findEmptyRooms = require('./findEmptyRooms');
const getRoomMaxUsers = require('./getRoomMaxUsers');

//Port from environment variable or default - 5000
const port = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  //console.log('Client Connected');
  socket.join('global', function () {
    io.in('global').emit('recieveRoomPopulation', {
      users: io.sockets.adapter.rooms['global'].length,
      maxUsers: '-',
    });
  });

  socket.on('sendGlobalMessage', (message) => {
    console.log('Global Chat: ', message.username + ': ' + message.body);
    socket.broadcast.to('global').emit('receiveGlobalMessage', {
      body: message.body,
      username: message.username,
    });
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
      io.sockets.adapter.rooms[roomObj.id.trim()]
    );

    if (joinRoom.willJoin !== false) {
      socket.join(joinRoom.id);
      socket.emit('validateJoin', joinRoom);
    } else {
      socket.emit('joinError', joinRoom.status);
    }
  });

  socket.on('sendPrivateMessage', (message) => {
    socket.broadcast.to(message.roomID).emit('recieve' + message.roomID, {
      body: message.body,
      username: message.username,
    });
  });

  socket.on('getRoomPopulation', async (roomID) => {
    let population = {
      users: io.sockets.adapter.rooms[roomID].length,
      maxUsers: await getRoomMaxUsers.getRoomMaxUsers(roomID),
    };

    io.in(roomID).emit('recieveRoomPopulation', population);
  });

  socket.on('disconnect', async () => {
    //console.log('Client Disconnected');
    console.log('update pop');
    io.sockets.emit('updateRoomPopulation');
    await findEmptyRooms.findEmptyRooms(io);
  });
});

//Socket.io resources for controlling emit recipients
//https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
//https://socket.io/docs/rooms-and-namespaces/

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
