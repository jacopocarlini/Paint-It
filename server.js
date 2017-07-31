var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');

var sockets, players, pendings, ingame, matches, id=0;

// app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

var main = fs.readFileSync('./public/views/main.html', "utf8");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/main', function(req, res){
    // if(ingame.indexOf(req.params.id)<0)
    //     res.sendFile(__dirname + '/public/views/index.html');
    // else
        res.sendFile(__dirname + '/public/views/main.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    sockets.push(socket);
    socket.on("new player", function(name){
        console.log("New Player");
        var client = {'id': id, 'name': name, 'socket' : this};
        pendings.push(client);
        if (pendings.length>0){
            var player1 = pendings.pop();
            // var player2 = pendings.pop();
            player1.socket.emit("enemy found", main);
            // player2.socket.emit("enemy found", main);
            ingame.push(player1);
            // ingame.push(player2);
            addEventListener(player1.socket);
            // addEventListener(player2.socket);
        }

    });
});

init();

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// init method
function init() {
    players = [];
    sockets = [];
    ingame = [];
    pendings = [];
    matches = {};
}

function addEventListener(socket){
    socket.on("key down", function(data){
        console.log(data);
    });
}
