var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');

var sockets, players, pendings, ingame, matches, id = 0;

// app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

var main = fs.readFileSync('./public/views/main.html', "utf8");

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/main', function(req, res) {
    // if(ingame.indexOf(req.params.id)<0)
    //     res.sendFile(__dirname + '/public/views/index.html');
    // else
    res.sendFile(__dirname + '/public/views/main.html');
});

io.on('connection', function(socket) {
    console.log('SERVER: a new user connected');
    sockets.push(socket);
    socket.on("new player", function(name) {
        console.log("SERVER: new player");
        var client = {
            'id': id,
            'name': name,
            'socket': this
        };
        pendings.push(client);
        if (pendings.length > 1) {
            var player1 = pendings.pop();
            var player2 = pendings.pop();
            player1.socket.emit("enemy found", main);
            player2.socket.emit("enemy found", main);
            ingame.push(player1);
            ingame.push(player2);

            addEventListener(player1, player2);
            addEventListener(player2, player1);
            // var ready = 0;
            // player1.socket.on("ready", function() {
            //     ready += 1;
            //     if(ready==2){
            //         player1.socket.emit("ready");
            //         player2.socket.emit("ready");
            //     }
            // });
            // player2.socket.on("ready", function() {
            //     ready += 1;
            //     if(ready==2){
            //         player1.socket.emit("ready");
            //         player2.socket.emit("ready");
            //     }
            // });

            startMatch(player1.socket, player2.socket);
        }

    });
});

init();

http.listen(3000, function() {
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

function addEventListener(player1, player2) {
    var socket1 = player1.socket;
    var socket2 = player2.socket;

    socket1.on("data", function(data) {
        socket2.emit("data", data);
    });

    socket1.on("disconnect", function(){
        ingame.splice(ingame.indexOf(player1), 1);
        ingame.splice(ingame.indexOf(player2), 1);
        pending.push(player2);
        sockets.splice(socket.indexOf(socket1), 1);
    });
}


function startMatch(player1, player2) {
    console.log("SERVER: start Match");
    var data1 = {
        "player": {
            "position": {
                "x": 0,
                "y": 10,
                "z": 50
            },
            "direction": -1
        },
        "enemy": {
            "position": {
                "x": 0,
                "y": 10,
                "z": -50
            },
            "direction": 1
        },
        "objects": {}
    };
    var data2 = {
        "player": {
            "position": {
                "x": 0,
                "y": 10,
                "z": -50
            },
            "direction": 1
        },
        "enemy": {
            "position": {
                "x": 0,
                "y": 10,
                "z": 50
            },
            "direction": -1
        },
        "objects": {}
    };


    player1.emit("start match", data1);
    player2.emit("start match", data2);
}
