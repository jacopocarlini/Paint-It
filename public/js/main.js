'use strict';

Physijs.scripts.worker = '../js/physijs_worker.js';
Physijs.scripts.ammo = '../js/ammo.js';

var camera, scene, scene_phisi, renderer, mouse = new THREE.Vector2();

var geometry, material, mesh;
var objects = [];
var floors = [];
var mouselock, controls, pointerlock;
var player, enemy, bullets = [],
    enemy_bullets = [];


var controlsEnabled = false;
var ready = false;
var socket = socket;
var click = false;


function generateMap() {

    var arr = [];
    var pos = [];
    while (arr.length < 80) {
        var randomnumber = Math.floor(Math.random() * 256);
        if (arr.indexOf(randomnumber) > -1) continue;
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

        position.z = (position.z * 100 - 400);
        position.x = (position.x * 100 - 400);
        position.y = (position.y * 120) + 10;
        pos.push(position);

    }
    return pos;
}


if (Detector.webgl) {
    var countDown = 6;
    var timer = setInterval(function() {
        countDown -= 1;
        // var text2 = document.createElement('div');
        var text2 = document.querySelector('#timer');
        text2.style.position = 'absolute';
        //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
        text2.style.width = 100;
        text2.style.height = 200;
        // text2.style.backgroundColor = "blue";
        text2.innerHTML = "Match start in " + countDown + " sec";
        text2.style.top = 200 + 'px';
        text2.style.left = 400 + 'px';
        // document.body.appendChild(text2);

        if (countDown == 0) {
            ready = true;
            document.getElementById("timer").remove();
            clearInterval(timer);
        }
    }, 1000);
    if (socket) {
        socket.on("start match", function(data) {
            console.log("start match");

            mouselock = new MouseLock();
            init(data);
            animate();
            // socket.on("ready", function() {
            //     ready = true;
            // });

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
            "objects": []
        };
        var pos = generateMap();
        // console.log(pos);
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
            var r = Math.random();
            console.log(r);
            if (r < 0.1) elem.type = "cross";
            else if (r > 0.9) elem.type = "h_form";
            else elem.type = "plane";
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
            data.objects.push(elem);
        }
        console.log(data);
        mouselock = new MouseLock();
        init(data);
        animate();
    }


} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}


function init(data) {
    //scene
    // scene = new THREE.Scene();
    // scene.fog = new THREE.Fog(0xffffff, 0, 1000);
    scene = new Physijs.Scene;

    //camera
    camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 1, 1500);
    // camera.position.set( 60, 50, 60 );
    // camera.lookAt( scene.position );



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
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    // renderer.setClearColor(0xffffff);
    // renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    // document.getElementById('viewport').appendChild(renderer.domElement);

    //resize
    window.addEventListener('resize', onWindowResize, false);


    if (socket) {
        socket.on("data", function(data) {
            // enemy.update(data.player);
            // console.log(data);
            enemy_bullets = data.enemy_bullets;
            for (var i = 0; i < enemy_bullets.length; i++) {
                enemy_bullets[i].update();
            }
        });
        socket.on("hit", function() {
            var life = player.damage();
            if (life == 0) {
                var text2 = document.querySelector('#points');
                text2.style.position = 'absolute';
                //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
                text2.style.width = 100;
                text2.style.height = 200;
                // text2.style.backgroundColor = "blue";
                text2.innerHTML = "You Lose!";
                text2.style.top = 200 + 'px';
                text2.style.left = 400 + 'px';
                socket.emit("dead");
                ready = false;
            }
        });
        socket.on("win", function() {
            console.log("winner");
            var text2 = document.querySelector('#points');
            text2.style.position = 'absolute';
            //text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
            text2.style.width = 100;
            text2.style.height = 200;
            // text2.style.backgroundColor = "blue";
            text2.innerHTML = "You Win!";
            text2.style.top = 200 + 'px';
            text2.style.left = 400 + 'px';
            ready = false;
        });
        socket.on("color", function(data) {
            console.log(data);
            for (var j = 0; j < objects[data].children.length; j++) {
                // console.log(objects[i].children[j]);
                objects[data].children[j].material.color.set(0xff0000);

            }
        });
    }
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

    scene.simulate(); // run physics

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
                // ready = false;
                // remove(i);
                scene.remove(bullets[i].getMesh());
                bullets.splice(i, 1);
                if (socket) socket.emit("hit");
            }

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
            },
            "enemy_bullets": []
        };
        for (var i = 0; i < bullets.length; i++) {
            var p = bullets[i].getMesh().position;
            var elem = {
                "x": p.x,
                "y": p.y,
                "z": p.z
            };
            data.enemy_bullets.push(elem);
        }


        if (socket) socket.emit("data", data);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);


}
