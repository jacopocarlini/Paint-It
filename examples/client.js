import io from 'socket.io-client';
var server = "http://localhost:3000";
var socket = io(server);
socket.on("connect", function(data) {
    console.log("log");
    console.log(data);
});
