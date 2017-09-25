var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var fs = require('fs');

var sockets, players, pendings, ingame, matches, id = 0;

// app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'examples')));
var main = fs.readFileSync('./public/views/main.html', "utf8");

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/views/index.html');
});
app.get('/examples', function(req, res) {
    res.sendFile(__dirname + '/examples/views/main.html');
});
app.get('/simple', function(req, res) {
    res.sendFile(__dirname + '/examples/simple.html');
});

app.get('/main', function(req, res) {
    // if(ingame.indexOf(req.params.id)<0)
    //     res.sendFile(__dirname + '/public/views/index.html');
    // else
    res.sendFile(__dirname + '/public/views/main.html');
});

app.get('/info', function(req, res) {
    console.log(sockets.length);
    console.log("ingame " + ingame.length);
    console.log("pendings " + pendings.length);

    res.send("ciao");
});

io.on('connection', function(socket) {
    console.log('SERVER: a new user connected');
    if (sockets.indexOf(socket) > 0) {
        console.log("discard");
        return;
    }

    sockets.push(socket);
    socket.on("disconnect", function() {
        console.log("disconnect");
        sockets.splice(sockets.indexOf(socket), 1);
        if(pendings.indexOf(socket)>=0) pendings.splice(pendings.indexOf(socket), 1);
    });

    socket.on("new player", function(name) {
        console.log("SERVER: new player");
        var client = {
            'id': id,
            'name': name,
            'socket': this
        };
        pendings.push(client);
        console.log(pendings.length);
        // console.log("pendings "+pendings.length);
        if (pendings.length > 1) {
            var player1 = pendings.pop();
            var player2 = pendings.pop();
            player1.socket.emit("enemy found", main);
            player2.socket.emit("enemy found", main);
            ingame.push(player1);
            ingame.push(player2);

            addEventListener(player1, player2);
            addEventListener(player2, player1);

            startMatch(player1, player2);

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
    socket1.on("bullet", function(data) {
        socket2.emit("bullet", data);
    });

    socket1.on("hit", function(data) {
        socket2.emit("hit", data);
    });
    socket1.on("lose", function(data) {
        console.log("SERVER: End Match");
        socket2.emit("win", data);
    });
    socket1.on("win", function(data) {
        console.log("SERVER: End Match");
        socket2.emit("lose", data);
    });
    socket1.on("pair", function(data) {
        console.log("SERVER: End Match");
        socket2.emit("pair", data);
    });
    socket1.on("color", function(data) {
        // console.log(data);
        socket2.emit("color", data);
    });

    socket1.on("disconnect", function() {
        console.log("disconnect 2");
        socket2.emit("win");
        ingame.splice(ingame.indexOf(player1), 1);
        ingame.splice(ingame.indexOf(player2), 1);
        // pendings.push(player2);
        // sockets.splice(sockets.indexOf(socket1), 1);
    });
}

// generateMap();
function generateMap() {

    var arr = [];
    var pos = [];
    while (arr.length < 80) {
        var randomnumber = Math.floor(Math.random() * 255);
        if (arr.indexOf(randomnumber) > -1) continue;
        // randomnumber = (8*8)-1;
        if (randomnumber == 0) continue;
        if (randomnumber == 63) continue;
        arr[arr.length] = randomnumber;
        var position = {
            "x": 0,
            "y": 0,
            "z": 0
        };
        var remainder = randomnumber % 8;
        position.z = remainder;
        var quotient = Math.floor(randomnumber / 8);
        remainder = quotient % 8;
        position.x = remainder;
        quotient = Math.floor(quotient / 8);
        remainder = quotient % 8;
        position.y = remainder;

        position.z = (position.z * 100) - 350;
        position.x = (position.x * 100) - 350;
        position.y = (position.y * 100) + 50;
        // console.log(position);
        pos.push(position);

    }
    return pos;
}


function startMatch(player1, player2) {
    console.log("SERVER: start Match");
    var data1 = {
        "player": {
            "name": player1.name,
            "position": {
                "x": -350,
                "y": 20,
                "z": -350
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": 1
            },
            "direction": 1
        },
        "enemy": {
            "name": player2.name,
            "position": {
                "x": 350,
                "y": 20,
                "z": 350
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": -1
            },
            "direction": -1
        },
        "objects": []
    };
    var data2 = {
        "player": {
            "name": player2.name,
            "position": {
                "x": 350,
                "y": 20,
                "z": 350
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": -1
            },
            "direction": -1
        },
        "enemy": {
            "name": player1.name,
            "position": {
                "x": -350,
                "y": 20,
                "z": -350
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": 1
            },
            "direction": 1
        },
        "objects": []
    };
    var pos = generateMap();

    for (var i = 0; i < pos.length; i++) {
        var elem = {
            "type": "",
            "position": {
                "x": 0,
                "y": 0,
                "z": 0
            },
            "rotation": {
                "x": 0,
                "y": 0,
                "z": 0
            }
        };
        // var r = Math.random();
        // console.log(r);
        // if (r < 0.1) elem.type = "cross";
        // else if (r > 0.9) elem.type = "h_form";
        // else elem.type = "plane";
        elem.type = "plane";
        elem.position.x = pos[i].x;
        elem.position.y = pos[i].y;
        elem.position.z = pos[i].z;

        var phi = 0;
        if (elem.type == "plane") {
            r = Math.random();
            if (r > 0.2) phi = -Math.PI / 2;
            elem.rotation.x = phi;
            r = Math.random();
            if (r > .7) phi = Math.PI / 2;
            else phi = 0;
            elem.rotation.y = phi;
        }

        elem.rotation.z = 0;
        data1.objects.push(elem);
        data2.objects.push(elem);
    }

    player1.socket.emit("start match", data1);
    player2.socket.emit("start match", data2);
}
