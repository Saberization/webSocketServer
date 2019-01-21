var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};

server.listen(8088);
app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

io.on('connection', function (socket) {
  socket.emit('roomid', generateUUID().toUpperCase());
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('join_room', function(data) {
    socket.join('')
  });
});