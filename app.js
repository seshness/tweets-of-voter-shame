var express = require('express')
  , twitter = require('ntwitter')
  , keys = require('./secrets')
  , io = require('socket.io')
  , boundingBoxes = require('./boundingBoxes')
  , events = require('events');;

var app = express.createServer();
io = io.listen(app);

app.configure(function() {
  app.use(express.static(path.join(__dirname, 'public')));
});

var twit = new twitter({
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
  access_token_key: keys.ACCESS_TOKEN,
  access_token_secret: keys.ACCESS_TOKEN_SECRET
});

var bay_area_bounding_box = '-122.737,37.136,-121.798,38.346';

var twitter_events = new events.EventEmitter();

twit.stream(
  'statuses/filter',
  { 'locations': bay_area_bounding_box },
  function(stream) {
    stream.on('data', function (data) {
      if ('coordinates' in data
          && data.coordinates != null
          && 'coordinates' in data.coordinates) {
        if (boundingBoxes.contained(data.coordinates.coordinates[1],
                                    data.coordinates.coordinates[1])) {
          io.sockets.emit('new-tweet', { 'id_str': data.id_str });
          console.log(data.user.screen_name + ": " + data.text);
        }
      }
    });
  });

io.sockets.on('connection', function (socket) {
  console.log('client connected');
});

app.listen(8000);
