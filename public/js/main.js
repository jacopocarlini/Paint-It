var camera, scene, renderer, mouse = new THREE.Vector2();

var geometry, material, mesh;
var objects = [];
var floors = [];
var mouselock, controls, pointerlock;
var player, enemy, bullets = [];


var controlsEnabled = false;
var ready = true;
var socket = socket;
// var sendData = new SendData();
var click = false;


function generateMap(){

    var arr = []
    while(arr.length < 100){
        var randomnumber = Math.ceil(Math.random()*100)
        if(arr.indexOf(randomnumber) > -1) continue;
        arr[arr.length] = randomnumber;
    }
}


if (Detector.webgl) {
    if (socket) {
        socket.on("start match", function(data) {
            console.log("start match");

            mouselock = new MouseLock();
            init(data);
            animate();
            socket.on("ready", function() {
                ready = true;
            });

        });
    } else {
        var data = {
            "player": {
                "position": {
                    "x": 0,
                    "y": 10,
                    "z": 350
                },
                "direction": -1
            },
            "enemy": {
                "position": {
                    "x": 0,
                    "y": 10,
                    "z": -350
                },
                "direction": 1
            },
            "objects": [{
                    "type": "cross",
                    "position": {
                        "x": 0,
                        "y": 10,
                        "z": -350
                    },
                    "rotation": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    }
                },
                {
                    "type": "h_form",
                    "position": {
                        "x": 0,
                        "y": 100,
                        "z": 150
                    },
                    "rotation": {
                        "x": 0,
                        "y": 0,
                        "z": 0
                    }
                }
            ]
        };
        init(data);
        mouselock = new MouseLock();

        animate();
    }


} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}


function init(data) {
    //camera
    camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 1, 1000);

    //scene
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 0, 1000);

    //light
    var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);





    //controls
    controls = new Controls(document);
    pointerlock.getObject().position.x = data.player.position.x;
    pointerlock.getObject().position.y = data.player.position.y;
    pointerlock.getObject().position.z = data.player.position.z;

    if (data.player.direction == 1) pointerlock.setOppositeDirection();

    //Player
    var p1 = {
        "p1": true,
        "player": data.player
    };
    player = new Player(p1);

    //Enemy
    var p2 = {
        "p1": false,
        "player": data.enemy
    };
    enemy = new Player(p2);


    var map = new Map(data.objects);



    //renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    //resize
    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function remove(id) {
    scene.remove(scene.getObjectByName(id));
}

function animate() {

    requestAnimationFrame(animate);

    if (true) {
        controls.update();
        player.update();
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].update();
            if (bullets[i].collision()) {
                // console.log("coll");
                scene.remove(bullets[i].getMesh());
                bullets.splice(i, 1);
            } else if (bullets[i].hit()) {
                // console.log("hit");
                ready = false;
                // remove(i);
                scene.remove(bullets[i].getMesh());
                bullets.splice(i, 1);
                if (socket) socket.emit("hit");
            }

        }
        if (socket) {
            socket.on("data", function(data) {
                enemy.update(data.player);
            });
            socket.on("hit", function() {
                ready = false;
            });
        }


        var data = {
            "player": {
                "position": {
                    "x": player.getPosition().x,
                    "y": player.getPosition().y,
                    "z": player.getPosition().z
                },
                "direction": {
                    "x": pointerlock.getDirection().x,
                    "y": pointerlock.getDirection().y,
                    "z": pointerlock.getDirection().z
                }
            }
        };
        if (socket) socket.emit("data", data);
    }
    renderer.render(scene, camera);

}
