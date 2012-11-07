var app = require('express').createServer(),
    twitter = require('ntwitter'),
    keys = require('./secrets'),
    io = require('socket.io').listen(app);

console.log(keys.CONSUMER_KEY);

var twit = new twitter({
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
  access_token_key: keys.ACCESS_TOKEN,
  access_token_secret: keys.ACCESS_TOKEN_SECRET
});

// { 'locations':'' },

twit.stream('statuses/sample', function(stream) {
  stream.on('error', function(error, code) {
    console.log("My error: " + error + ": " + code);
  });

  stream.on('data', function (data) {
    console.log(data.user.screen_name + ": " + data.text);
    // socket.emit('tweet', { 'tweet_id': data.id_str });
  });

  io.sockets.on('connection', function (socket) {
  });
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(3000);
