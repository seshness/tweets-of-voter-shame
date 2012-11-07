var app = require('express').createServer(), keys = require('secrets'), twitter = require('ntwitter'); 
app.listen(3000); 
var twit = new twitter({ consumer_key: keys.CONSUMER_KEY, consumer_secret: keys.CONSUMER_SECRET, access_token_key: keys.ACCESS_TOKEN, access_token_secret: keys.ACCESSTOKENSECRET
});

twit.stream('statuses/filter', { 'locations':''}, function(stream) { stream.on('data', 
    function (data) { console.log(data.user.screen_name + ": " + data.text); }); });

