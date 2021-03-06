const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const router = require('./router');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

const io = socketio(server);
app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
        if(error) return callback(error);
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the ${user.room} room 😉 `});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat!`});
        socket.join(user.room);
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
      });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the chat!!!` })
        }
    });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`));