Bullet = function() {
    var direction = pointerlock.getDirection();
    var sphere;

    var speed = 100;
    var delta;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var hit = false;


    var geometry = new THREE.SphereGeometry(1, 32, 32);

    var material = new THREE.MeshBasicMaterial({
        color: 0xffff00
    });
    sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = pointerlock.getObject().position.x;
    sphere.position.y = pointerlock.getObject().position.y;
    sphere.position.z = pointerlock.getObject().position.z;
    direction = pointerlock.getDirection();
    // sphere.name = id
    scene.add(sphere);

    function remove(id) {
      scene.remove(scene.getObjectByName(id));
    }

    this.update = function() {

        hit = false;

        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.x += 400.0 * delta * speed;
        velocity.y += 400.0 * delta * speed;
        velocity.z += 400.0 * delta * speed;

        sphere.translateX(velocity.x * direction.x * delta);
        sphere.translateY(velocity.y * direction.y * delta);
        sphere.translateZ(velocity.z * direction.z * delta);

        // if(velocity.x == 0 && velocity.y == 0 && velocity.z == 0 ){
        //     remove(i);
        //     bullets.splice(i, 1);
        // }


        prevTime = time;
    }

    this.getMesh = function(){
        return sphere;
    }

    this.hit = function() {
        var ray = new THREE.Raycaster(sphere.position, direction, 0, 50);
        var hit = ray.intersectObject(enemy.getMesh());
        if (hit.length > 0) {
            hit = true;
            return true;
        }
    }

    this.collision = function() {
        //objects
        var objray = new THREE.Raycaster(sphere.position, direction, 0, 50);
        var objhit = objray.intersectObjects(objects, true);
        if (objhit.length > 0) {
            for (var i = 0; i < objects.length; i++) {
                if (objhit[0].object.parent === objects[i]) {
                    for (var j = 0; j < objects[i].children.length; j++){
                        // console.log(objects[i].children[j]);
                        objects[i].children[j].material.color.set(0x0000ff);
                        // var data = {"index": i};
                        if(socket) socket.emit("color", i);
                    }
                    break;
                }
            }

            return true;
        }

        //floors
        var floorray = new THREE.Raycaster(sphere.position, direction, 0, 50);
        var floorhit = objray.intersectObjects(floors);
        if (floorhit.length > 0) {
            return true;
        }



    }

    this.getHit = function() {
        return hit;
    }

}
