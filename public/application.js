$(function() {
  var tweet_template = '<div class="tweet"><div class="tweet_body"></div><div class="tweet_context"></div></div></div>';

  var socket = io.connect('/');
  socket.on('new-tweet', function (data) {
    console.log(data);
    var new_tweet_node = $(tweet_template)
      .attr('id', 'tweet-' + data.id_str);
    new_tweet_node.find('.tweet_body')
      .text(data.text);
    new_tweet_node.find('.tweet_context')
      .text('@' + data.user.screen_name + (data.location ? ', ' + data.location : ''));

    $('#tweets').append(new_tweet_node);

    setTimeout(function() {
      new_tweet_node.fadeOut(1500, function() {
          $(this).remove();
      });
    }, 60000);
  });
});
