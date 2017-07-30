THREE.Controls = function(document) {
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var speed = 1.0;
    var mass = 100.0;

    pointerlock = new THREE.PointerLockControls(camera);
    scene.add(pointerlock.getObject());

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
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

            case 16: // shift
                speed = 3.0;
                aux = true;
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
                speed = 1.0;
                aux=false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);

    var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 100);

    //Methods

    //update
    this.update = function() {

        if (controlsEnabled) {
            raycaster.ray.origin.copy(pointerlock.getObject().position);
            // raycaster.ray.origin.y -= 10;

            raycaster.ray.direction.copy(pointerlock.getDirection());

            var intersections = raycaster.intersectObjects(objects);
            for (var i = 0; i < intersections.length; i++) {
                intersections[i].object.material.color.set(0xff0000);
            }


            // var isOnObject = intersections.length > 0;
            var isOnObject = false;


            var isOnObjectN = false;
            var isOnObjectS = false;
            var isOnObjectE = false;
            var isOnObjectO = false;
            var isOnObjectG = false;
            var isOnObjectU = false;

            var playermesh = player.getMesh();

            for (var vertexIndex = 0; vertexIndex < playermesh.geometry.vertices.length; vertexIndex++) {
                var localVertex = playermesh.geometry.vertices[vertexIndex].clone();
                // var globalVertex = playermesh.matrix.multiplyVector3(localVertex);
                var globalVertex = localVertex.applyMatrix4(playermesh.matrix);
                var directionVector = globalVertex.sub(playermesh.position);
                var ray = new THREE.Ray(playermesh.position, directionVector.clone().normalize());
                var playerraycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
                playerraycaster.ray = ray;
                var collisionResults = playerraycaster.intersectObjects(objects);
                if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                    console.log("collision");
                }
            }



            var nord = new THREE.Vector3(0, 0, -1);
            nord.x = pointerlock.getDirection().x;
            nord.z = pointerlock.getDirection().z;
            var collisionN = new THREE.Raycaster(pointerlock.getObject().position, nord, 0, 10);
            var intersect = collisionN.intersectObjects(objects);
            isOnObjectN = intersect.length > 0;


            var sud = new THREE.Vector3(0, 0, 1);
            sud.x = pointerlock.getDirection().x;
            sud.z = -pointerlock.getDirection().z;
            var collisionS = new THREE.Raycaster(pointerlock.getObject().position, sud, 0, 10);
            var intersect = collisionS.intersectObjects(objects);
            isOnObjectS = intersect.length > 0;


            var est = new THREE.Vector3(1, 0, 0);
            est.z = nord.x;
            est.x = -nord.z;
            var collisionE = new THREE.Raycaster(pointerlock.getObject().position, est, 0, 10);
            var intersect = collisionE.intersectObjects(objects);
            isOnObjectE = intersect.length > 0;

            var nordest = new THREE.Vector3(1, 0, -1);
            nordest.z = nord.x+est.z;
            nordest.x = nord.z + est.x;
            var collisionNE = new THREE.Raycaster(pointerlock.getObject().position, nordest, 0, 10);
            var intersect = collisionNE.intersectObjects(objects);
            isOnObjectNE = intersect.length > 0;

            var ovest = new THREE.Vector3(-1, 0, 0);
            ovest.z = -nord.x;
            ovest.x = nord.z;
            var collisionO = new THREE.Raycaster(pointerlock.getObject().position, ovest, 0, 10);
            var intersect = collisionO.intersectObjects(objects);
            isOnObjectO = intersect.length > 0;


            var giu = new THREE.Vector3(0, -1, 0);
            var collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
            var intersect = collisionG.intersectObjects(objects);
            isOnObjectG = intersect.length > 0;

            var up = new THREE.Vector3(0, 1, 0);
            var collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
            var intersect = collisionU.intersectObjects(objects);
            isOnObjectU = intersect.length > 0;







            var time = performance.now();
            var delta = (time - prevTime) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            velocity.y -= 9.8 * mass * delta; // 100.0 = mass

            if (moveForward) {


                if (isOnObjectNE) velocity.x -= 400.0 * delta * speed;
                else{
                    if (isOnObjectN) velocity.z = 0;                    
                    else velocity.z -= 400.0 * delta * speed;
                }
            }
            if (moveBackward) {

                if (isOnObjectS) velocity.z = 0;
                else velocity.z += 400.0 * delta * speed;
            }
            if (moveLeft) {
                if (isOnObjectO) velocity.x = 0;
                else velocity.x -= 400.0 * delta * speed;
            }
            if (moveRight) {
                if (isOnObjectE) velocity.x = 0;
                else velocity.x += 400.0 * delta * speed;
            }

            if (isOnObjectG) {
                velocity.y = Math.max(0, velocity.y);
                canJump = true;
            }
            if (isOnObjectU) {
                velocity.y = -velocity.y;
                canJump = true;
            }

            if (isOnObject === true) {
                velocity.y = Math.max(0, velocity.y);

                canJump = true;
            }



            pointerlock.getObject().translateX(velocity.x * delta);
            pointerlock.getObject().translateY(velocity.y * delta);
            pointerlock.getObject().translateZ(velocity.z * delta);

            if (pointerlock.getObject().position.y < 10) {

                velocity.y = 0;
                pointerlock.getObject().position.y = 10;

                canJump = true;

            }

            prevTime = time;

        }

    }
}
