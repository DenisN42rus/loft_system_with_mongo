const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const index = require('./routes');

const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

require('./libs/passport-config');

const db = require('./db/');

app.set('views', path.join(__dirname, 'build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('*', (req, res, next) => {
  next();
});

app.use('/', index);

server.listen(3000, () => {
  console.log('Server rinning on port 3000');
});

const connectedUsers = {};
const historyMessage = {};

io.on('connection', (socket) => {
  const socketId = socket.id;
  socket.on('users:connect', function (data) {
    const user = { ...data, socketId, activeRoom: null };
    connectedUsers[socketId] = user;
    socket.emit('users:list', Object.values(connectedUsers));
    socket.broadcast.emit('users:add', user);
  });

  socket.on('message:add', function (data) {
    const { senderId, recipientId } = data;
    socket.emit('message:add', data);
    socket.broadcast.to(data.roomId).emit('message:add', data);
    addMessageToHistory(senderId, recipientId, data);
    if (senderId !== recipientId) {
      addMessageToHistory(recipientId, senderId, data);
    }
  });

  socket.on('message:history', function (data) {
    if (
      historyMessage[data.userId] &&
      historyMessage[data.userId][data.recipientId]
    ) {
      socket.emit(
        'message:history',
        historyMessage[data.userId][data.recipientId]
      );
    }
  });

  socket.on('disconnect', function (data) {
    delete connectedUsers[socketId];
    socket.broadcast.emit('users:leave', socketId);
  });
});

const addMessageToHistory = (senderId, recipientId, data) => {
  if (historyMessage[senderId]) {
    if (historyMessage[senderId][recipientId]) {
      if (historyMessage[senderId][recipientId].length > 10) {
        historyMessage[senderId][recipientId].shift();
      }
      historyMessage[senderId][recipientId].push(data);
    } else {
      historyMessage[senderId][recipientId] = [];
      historyMessage[senderId][recipientId].push(data);
    }
  } else {
    historyMessage[senderId] = {};
    historyMessage[senderId][recipientId] = [];
    historyMessage[senderId][recipientId].push(data);
  }
};

module.exports = { app: app, server: server };
