$(function() {
  var socket = io.connect('http://localhost:8000/');
  socket.on('new-tweet', function (data) {
    console.log(data);
    var url = 'https://api.twitter.com/1/statuses/oembed.json?' +
      $.param({id: data.id_str, align: 'center', callback: 'tweet'});
    $.ajax(url, { dataType: 'jsonp', jsonpCallback: 'tweet' })
      .done(function(twitter_response) {
        console.log(twitter_response);
      });
  });
});
