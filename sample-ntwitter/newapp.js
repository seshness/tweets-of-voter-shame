var app = require('express').createServer(), keys = require('./secrets'), twitter = require('ntwitter');
app.listen(3000);

var twit = new twitter({ consumer_key: keys.CONSUMER_KEY, consumer_secret: keys.CONSUMER_SECRET, access_token_key: keys.ACCESS_TOKEN, access_token_secret: keys.ACCESS_TOKEN_SECRET
});

fs = require('fs')
fs.readFile('./ca-polling-locations-gps-bounding-boxes-string.txt', 'utf-8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  locations = data;
  console.log(locations);
  twit.stream('statuses/filter', { 'locations': locations}, function(stream) { stream.on('data',
    function (data) { console.log(data.user.screen_name + ": " + data.text); }); });

});
/*console.log("I was here");
console.log(locations);
twit.stream('statuses/filter', { 'locations': locations}, function(stream) { stream.on('data',
    function (data) { console.log(data.user.screen_name + ": " + data.text); }); });
*/
