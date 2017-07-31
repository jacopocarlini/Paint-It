//server.js
   // server requirements

   var util = require("util"),
       io = require("socket.io")(),
       _ = require("underscore"),
       Player = require("./Player.js").Player;

   // server variables
   var socket, players, pendings, matches;


   // init method
   function init() {
       console.log("starting server on port 3000...");
       players = [];
       pendings = [];
       matches = {};
       // socket.io setup
       io.on('connection', onSocketConnection);
       socket = io.listen(3000);
       // setting socket io transport
    //    socket.set("transports", ["websocket"]);
       // setting socket io log level
    //    socket.set("log lever", 2);
    //    setEventHandlers();
   }

   var setEventHandlers = function() {
       console.log("waiting connection");
       // Socket.IO
       socket.sockets.on("connection", onSocketConnection);
   };

   // New socket connection
   function onSocketConnection(client) {
       console.log("connected");
       util.log("New player has connected: "+client.id);

       // Listen for client disconnected
    //    client.on("disconnect", onClientDisconnect);

       // Listen for new player message
       client.on("new player", onNewPlayer);

       // Listen for move player message
       client.on("move player", onMovePlayer);

       // Listen for shooting player
    //    client.on("shooting player", onShootingPlayer);

       // Listen for died player
    //    client.on("Idied", onDeadPlayer);

       // Listen for another match message
    //    client.on("anothermatch", onAnotherMatchRequested);
   };


   // New player has joined
   function onNewPlayer(data) {
       // Create a new player
       var newPlayer = new Player(data.x, data.y, data.z, this);
       newPlayer.id = this.id;

       console.log("creating new player");
       // Add new player to the players array
       players.push(newPlayer);

       // searching for a pending player
       var id = _.sample(pendings);
       if (!id) {
           // we didn't find a player
           console.log("added " + this.id + " to pending");
           pendings.push(newPlayer.id);
           // sending a pending event to player
           newPlayer.getSocket().emit("pending", {status: "pending", message: "waiting for a new player."});
       } else {
           // creating match
           pendings = _.without(pendings, id);
           matches[id] = newPlayer.id;
           matches[newPlayer.id] = id;
           console.log(matches);
           // generating world for this match
           var numObstacles = _.random(10, 30);
           var height = _.random(70, 100);
           var MAX_X = 490
           var MINUS_MAX_X = -490
           var MAX_Z = 990
           var MINUS_MAX_Z = -990
           var positions = [];
           for (var i=0; i<numObstacles; i++) {
               positions.push({
                   x: _.random(MINUS_MAX_X, MAX_X),
                   z: _.random(MINUS_MAX_Z, MAX_Z)
               });
           }
           console.log(numObstacles, height, positions);
           // sending both player info that they're connected
           newPlayer.getSocket().emit("matchstarted", {status: "matchstarted", message: "Player found!", numObstacles: numObstacles, height: height, positions: positions});
           playerById(id).getSocket().emit("matchstarted", {status: "matchstarted", message: "Player found!", numObstacles: numObstacles, height: height, positions: positions});
       }
   };

   // Find player by ID
   function playerById(id) {
       var i;
       for (i = 0; i < players.length; i++) {
           if (players[i].id == id)
               return players[i];
       };

       returnfalse;
   };



   // Player has moved
   function onMovePlayer(data) {
       // Find player in array
       var movePlayer = playerById(this.id);

       // Player not found
       if (!movePlayer) {
           //util.log("Player not found: "+this.id);
           return;
       };

       // Update player position
       movePlayer.setX(data.x);
       movePlayer.setY(data.y);
       movePlayer.setZ(data.z);
       movePlayer.setRotX(data.rotx);
       movePlayer.setRotY(data.roty);
       movePlayer.setRotZ(data.rotz);

       // searching for matched player, and sending data
       var opponentId = matches[this.id];
       if (!opponentId) {
           //util.log("No match found!");
           return;
       }
       // sending data to player
       playerById(opponentId).getSocket().emit("move", {
           x: movePlayer.getX(),
           y: movePlayer.getY(),
           z: movePlayer.getZ(),
           rotx: movePlayer.getRotX(),
           roty: movePlayer.getRotY(),
           rotz: movePlayer.getRotZ()
       });
   };


init();
