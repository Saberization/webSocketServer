var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8077);
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

io.on('connection', function (socket) {
  socket.on('roomid', function(roomid) {
    socket.join(roomid);
    socket.emit('join_room_success', 'success');

    socket.on('send_text', function(text) {
      io.sockets.to(roomid).emit('get_text', text);
    });
  });
});