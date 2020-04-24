const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

//Port from environment variable or default - 5000
const port = process.env.PORT || 5000;

//Setting up express and adding socketIo middleware
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//Setting up a socket with the namespace "connection" for new sockets
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.join('global');

  socket.emit('outgoing data', 'Socket Connection Established');

  socket.on('sendGlobalMessage', (message) => {
    console.log('Global Chat: ', message);
    socket.broadcast.to('global').emit('receiveGlobalMessage', message);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

//Socket.io resources for controlling emit recipients
//https://dev.to/moz5691/socketio-for-simple-chatting---1k8n
//https://socket.io/docs/rooms-and-namespaces/

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
