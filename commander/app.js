let express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var redis = require("redis");
var pub = redis.createClient();
var sub = redis.createClient();

const channelName = 'raspberrycar-channel'

// socket io setup
var commander = require('socket.io')(http, {
  path: '/commander.io'
});

var listener = require('socket.io')(http, {
  path: '/listener.io'
})

// redis operation
sub.subscribe(channelName);
sub.on("message", function (channel, message) {
    console.log("sub channel " + channel + ": " + message);
    listener.sockets.emit('command', message)
});

// static files
app.use('/assets', express.static('assets'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// commander operations
commander.on('connection', function(socket){
  // disconnect message

  console.log('a commander connected')
  socket.on('disconnect', function () {
    console.log('a commander disconnected')
  })

  // move event
  socket.on('move', function (message) {
    console.log(message)
    pub.publish(channelName, JSON.stringify(message))
  })
});


// listener operations
listener.on('connection', function(socket){
  console.log('a listener connected')

  socket.on('disconnect', function () {
    console.log('a listener disconnected')
  })
})