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

    socket.on("start match", function(data) {
        console.log("start match");
        mouselock = new MouseLock();
        init(data);
        animate();


    });



} else {
    var warning = Detector.getWebGLErrorMessage();
    document.getElementById('container').appendChild(warning);
}


function init(data) {

    scene = new Physijs.Scene;
    scene.setGravity(new THREE.Vector3(0, -10, 0));

    //camera
    camera = new THREE.PerspectiveCamera(75, (window.innerWidth / window.innerHeight), 1, 1500);
    camera.lookAt(new THREE.Vector3(0,0,-1));



    //light
    var light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);


    //controls
    pointerlock = new THREE.PointerLockControls(camera);
    scene.add(pointerlock.getObject());


    pointerlock.getObject().position.x = data.player.position.x;
    pointerlock.getObject().position.y = data.player.position.y;
    pointerlock.getObject().position.z = data.player.position.z;

    if (data.player.direction == 1) pointerlock.setOppositeDirection();


    controls = new Controls(document);



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



    socket.on("data", function(data) {
        enemy.update(data.player);

    });

    socket.on("bullet", function(data) {
        var bullet = new Bullet();
        bullet.addEnemy(data);
        enemy_bullets.push(bullet);
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
        objects[data].material.color.set(0xff0000);
    });

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
            // console.log(bullets[i].getMesh().position);
            bullets[i].update();
            if (bullets[i].getHit()) {
                if(bullets[i].getShot()){
                    socket.emit("hit");
                }
                scene.remove(bullets[i].getMesh());
                bullets.splice(i, 1);
            }
        }
        for (var i = 0; i < enemy_bullets.length; i++) {
            enemy_bullets[i].update();
            if (enemy_bullets[i].getHit()) {
                scene.remove(enemy_bullets[i].getMesh());
                enemy_bullets.splice(i, 1);
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


        socket.emit("data", data);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);


}
