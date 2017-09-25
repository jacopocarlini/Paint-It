Bullet = function() {
    var direction;
    var sphere;

    var speed = 1500;
    var delta;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var hit = false;
    var shot = false;

    var from = 0;
    var to = 0;
    var o;


    this.add = function() {
        sphere = new Physijs.SphereMesh(
            new THREE.SphereGeometry(2, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 0xffff00
            })
        );
        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.y = pointerlock.getDirection().y;
        nord.z = pointerlock.getDirection().z;
        sphere.position.x = pointerlock.getObject().position.x + (nord.x * 20);
        sphere.position.y = pointerlock.getObject().position.y + (nord.y * 20);
        sphere.position.z = pointerlock.getObject().position.z + (nord.z * 20);
        direction = pointerlock.getDirection();
        direction.x *= speed;
        direction.y *= speed;
        direction.z *= speed;
        // Enable CCD if the object moves more than 1 meter in one simulation frame
        sphere.setCcdMotionThreshold(1);

        // Set the radius of the embedded sphere such that it is smaller than the object
        sphere.setCcdSweptSphereRadius(0.2);
        sphere.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
            // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

            if (other_object.name == "box") {
                console.log("box");
                other_object.material.color.set(0x0000ff);
                other_object.colore="blue";
                hit = true;
                socket.emit("color", objects.indexOf(other_object));
            }
            if (other_object.name == "enemy") {
                console.log("enemy");
                hit = true;
                shot = true;
            }
            if (other_object.name == "bullet") {
                console.log("bullet");
                hit = true;
            }
            if (other_object.name == "floor") {
                console.log("floor");
                hit = true;
            }
            if (other_object.name == "player") {
                console.log("player");
            }

        });

        sphere.name = "bullet";
        scene.add(sphere);

        from = pointerlock.getObject().position;
        var ray = new THREE.Raycaster(from, pointerlock.getDirection(), 0, 2000);
        var obj = ray.intersectObjects(objects, true);
        var flr = ray.intersectObjects(floors, true);
        if (flr.length > 0){
            to = flr[0].point;
            o = flr[0];
        }
        if (obj.length > 0){
            to = obj[0].point;
            o=obj[0];
        }


    }

    this.addEnemy = function(data) {
        sphere = new Physijs.SphereMesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshBasicMaterial({
                color: 0xffff00
            }),
            1
        );
        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = data.direction.x;
        nord.y = data.direction.y;
        nord.z = data.direction.z;
        sphere.position.x = data.position.x + (nord.x * 20);
        sphere.position.y = data.position.y + (nord.y * 20);
        sphere.position.z = data.position.z + (nord.z * 20);
        direction = data.direction;
        direction.x *= speed;
        direction.y *= speed;
        direction.z *= speed;
        // Enable CCD if the object moves more than 1 meter in one simulation frame
        sphere.setCcdMotionThreshold(1);

        // Set the radius of the embedded sphere such that it is smaller than the object
        sphere.setCcdSweptSphereRadius(0.2);
        sphere.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
            // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

            if (other_object.name == "box") {
                console.log("box");
                other_object.material.color.set(0xff0000);
                other_object.colore="red";
                hit = true;
            }
            if (other_object.name == "enemy") {
                console.log("enemy");
                hit = true;
                shot = true;
            }
            if (other_object.name == "bullet") {
                console.log("bullet");
                hit = true;
            }
            if (other_object.name == "floor") {
                console.log("floor");
                hit = true;
            }
            if (other_object.name == "player") {
                console.log("player");
            }

        });

        sphere.name = "bullet";
        scene.add(sphere);

        from = pointerlock.getObject().position;
        var ray = new THREE.Raycaster(from, pointerlock.getDirection(), 0, 2000);
        var obj = ray.intersectObjects(objects, true);
        var flr = ray.intersectObjects(floors, true);
        if (flr.length > 0){
            to = flr[0].point;
            o = flr[0];
        }
        if (obj.length > 0){
            to = obj[0].point;
            o=obj[0];
        }
    }


    function distance(x, y) {
        var somma = 0;
        for (var i = 0; i < 3; i++) {
            somma = Math.pow(x[i] - y[i], 2);
        }
        return Math.sqrt(somma);
    }

    this.update = function() {
        sphere.setLinearVelocity(direction);
        if (distance(from, sphere.position) > distance(from, to)) {
            console.log("out");
            if(o.name=="box"){
                hit = true;
                socket.emit("color", objects.indexOf(o));
            }
            if(o.name=="floor"){
                hit = true;
            }
        }
    }

    this.getMesh = function() {
        return sphere;
    }

    // this.hit = function() {
    //     var ray = new THREE.Raycaster(sphere.position, direction, 0, 50);
    //     var hit = ray.intersectObject(enemy.getMesh());
    //     if (hit.length > 0) {
    //         hit = true;
    //         return true;
    //     }
    // }


    this.getHit = function() {
        return hit;
    }
    this.getShot = function() {
        return shot;
    }

}
