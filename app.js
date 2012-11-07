var app = require('express').createServer(),
    twitter = require('ntwitter'),
    keys = require('./secrets'),
    boundingBoxes = require('./boundingBoxes');

var twit = new twitter({
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
  access_token_key: keys.ACCESS_TOKEN,
  access_token_secret: keys.ACCESS_TOKEN_SECRET
});

var bay_area_bounding_box = '-122.737,37.136,-121.798,38.346';

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
          console.log(data.user.screen_name + ": " + data.text);
        }
      }
    });
  });

app.listen(3000);
