const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

app.get('/', (req, res) => {
  res.sendFile('/home/useradd/Senior/wheel-of-love/Cynthia/index.html');
});

server.listen(3000, () => {
  console.log('listening on localhost:3000');
});

//building socket.io logic
//event emitter to check for connection
io.on('connection', (socket) => {
  //socket event creation
  console.log('socket id', socket.id);
  //socket method
  socket.on('message', (data) => {
    console.log(data);
    //emit data to everyone but self
    // socket.emit(data);
    socket.broadcast.emit('message', data);
  });
});
