Controls = function(document) {
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = true;
    var gravity = 0;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var speed = 2.0;
    var mass = 100.0;

    var altezza = 20;
    var id = -1;
    var jump = false;


    var collision = new Collisions();

    // pointerlock = new THREE.PointerLockControls(camera);
    // scene.add(pointerlock.getObject());

    var onKeyDown = function(event) {


        switch (event.keyCode) {


            case 38: // up
            case 87: // w
                moveForward = true;
                break;

            case 37: // left
            case 65: // a
                moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                moveRight = true;
                break;

            case 32: // space
                if (canJump === true) {
                    jump = true;
                    if (gravity == 0) velocity.y += 400;
                    else velocity.y -= 400;
                }
                canJump = false;
                break;

            case 16: // shift
                speed = 4.0;
                break;

            case 69: // E
                gravity = 1;
                // camera.rotation.x=Math.PI;
                break;

            case 81: // Q
                gravity = 0;
                // camera.rotation.x=0;
                break;

        }

    };

    var onKeyUp = function(event) {
        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                moveForward = false;
                break;

            case 37: // left
            case 65: // a
                moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                moveRight = false;
                break;

            case 16: // shift
                speed = 2.0;
                break;

            case 32: // space
                jump = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);



    var leftClick = function(event) {
        if (event.button == 0 && ready) {
            var bullet = new Bullet();
            bullet.add();
            bullets.push(bullet);
            var p = pointerlock.getObject().position;
            var data = {
                "position": {
                    "x": p.x,
                    "y": p.y,
                    "z": p.z
                },
                "direction": pointerlock.getDirection()
            };
            socket.emit("bullet", data);

            // var hit = new THREE.Raycaster(pointerlock.getObject().position, pointerlock.getDirection(), 0, 100);
            // var objhit = hit.intersectObjects(objects);
            // if (objhit.length > 0) objhit[0].object.material.color.set(0xff0000);
        }
        // if (event.button == 2) {
        //     var hit = new THREE.Raycaster(pointerlock.getObject().position, pointerlock.getDirection(), 0, 100);
        //     var objhit = hit.intersectObjects(objects);
        //     if (objhit.length > 0) objhit[0].object.material.color.set(0x000000);
        // }
    }
    document.addEventListener('mousedown', leftClick);

    var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 100);

    //Methods

    function approx(n) {
        for (var i = 10; i < 1000; i += 10) {
            if (n < i) {
                if (i - n < n - (i - 10)) return i;
                else return i - 10;
            }
        }
        return 10;
    }

    this.getWalk = function() {
        return moveForward || moveLeft || moveRight || moveBackward;
    }
    this.getRun = function() {
        return speed == 4.0;
    }
    this.getGravity = function() {
        return gravity;
    }

var first=true;

    //update
    this.update = function() {

        if (controlsEnabled && ready) {


            var isOnObject = false;
            var dir;

            var time = performance.now();
            if(first){
                prevTime=time;
                first=false;
            }
            var delta = (time - prevTime) / 1000;

            collision.compute();




            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            if (gravity == 0) {
                velocity.y -= 9.8 * mass * delta;
            } // 100.0 = mass
            else {
                velocity.y += 9.8 * mass * delta;
            } // 100.0 = mass

            if (moveForward) {
                if (collision.getNord()) velocity.z = 0;
                else if (collision.getNordOvest()) velocity.x += 400.0 * delta * speed;
                else if (collision.getNordEst()) velocity.x -= 400.0 * delta * speed;
                else velocity.z -= 400.0 * delta * speed;
            }
            if (moveBackward) {
                if (collision.getSud()) velocity.z = 0;
                else if (collision.getSudOvest()) velocity.x -= 400.0 * delta * speed;
                else if (collision.getSudEst()) velocity.x += 400.0 * delta * speed;
                else velocity.z += 400.0 * delta * speed;
            }
            if (moveLeft) {
                if (collision.getOvest()) velocity.x = 0;
                else if (collision.getNordOvest()) velocity.z += 400.0 * delta * speed;
                else if (collision.getSudOvest()) velocity.z -= 400.0 * delta * speed;
                else velocity.x -= 400.0 * delta * speed;

            }
            if (moveRight) {
                if (collision.getEst()) velocity.x = 0;
                else if (collision.getNordEst()) velocity.z += 400.0 * delta * speed;
                else if (collision.getSudOvest()) velocity.z -= 400.0 * delta * speed;
                else velocity.x += 400.0 * delta * speed;


            }



            if (gravity == 0) {
                if (collision.getGiu() && !jump) {
                    pointerlock.getObject().position.y = approx(collision.getIntersectG()[0].point.y) + altezza;
                    velocity.y = Math.max(0, velocity.y);
                    // velocity.y=0;

                    canJump = true;
                } else canJump = false;
                if (collision.getUp()) {
                    velocity.y = -200;
                    // canJump = true;
                }
            } else {
                if (collision.getUp()) {
                    pointerlock.getObject().position.y = approx(collision.getIntersectU()[0].point.y) -altezza;
                    velocity.y = Math.min(0, velocity.y);
                    canJump = true;

                } else canJump = false;
                if (collision.getGiu()) {
                    velocity.y = 200;
                    // canJump = true;
                }

            }

            pointerlock.getObject().translateX(velocity.x * delta);
            pointerlock.getObject().translateY(velocity.y * delta);
            pointerlock.getObject().translateZ(velocity.z * delta);


            if (pointerlock.getObject().position.y < altezza) {
                velocity.y = 0;
                pointerlock.getObject().position.y = altezza;
                canJump = true;
            }
            if (pointerlock.getObject().position.y > 400 - altezza) {
                velocity.y = 0;
                pointerlock.getObject().position.y = 400 - altezza;
                canJump = true;
            }
            if (pointerlock.getObject().position.x < -400 + altezza) {
                velocity.x = 0;
                pointerlock.getObject().position.x = -400 + altezza;
            }
            if (pointerlock.getObject().position.x > 400 - altezza) {
                velocity.x = 0;
                pointerlock.getObject().position.x = 400 - altezza;
            }
            if (pointerlock.getObject().position.z < -400 + altezza) {
                velocity.z = 0;
                pointerlock.getObject().position.z = -400 + altezza;
            }
            if (pointerlock.getObject().position.z > 400 - altezza) {
                velocity.z = 0;
                pointerlock.getObject().position.z = 400 - altezza;
            }


            prevTime = time;

        }

    }
}
