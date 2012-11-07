var socket = io.connect('http://localhost:8000/');
socket.on('new-tweet', function (data) {
  console.log(data);
});
