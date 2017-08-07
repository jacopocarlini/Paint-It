Bullet = function() {
    var direction;
    var sphere;

    var speed = 100;
    var delta;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var hit = false;
    var shot = false;


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
        direction.x *= 5000;
        direction.y *= 5000;
        direction.z *= 5000;
        // Enable CCD if the object moves more than 1 meter in one simulation frame
        sphere.setCcdMotionThreshold(1);

        // Set the radius of the embedded sphere such that it is smaller than the object
        sphere.setCcdSweptSphereRadius(0.2);
        sphere.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
            // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

            if (other_object.name == "box") {
                console.log("box");
                other_object.material.color.set(0x0000ff);
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
        direction.x *= 5000;
        direction.y *= 5000;
        direction.z *= 5000;
        // Enable CCD if the object moves more than 1 meter in one simulation frame
        sphere.setCcdMotionThreshold(1);

        // Set the radius of the embedded sphere such that it is smaller than the object
        sphere.setCcdSweptSphereRadius(0.2);
        sphere.addEventListener('collision', function(other_object, relative_velocity, relative_rotation, contact_normal) {
            // `this` has collided with `other_object` with an impact speed of `relative_velocity` and a rotational force of `relative_rotation` and at normal `contact_normal`

            if (other_object.name == "box") {
                console.log("box");
                other_object.material.color.set(0x0000ff);
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
    }



    this.update = function() {
        // console.log(sphere.position);
        // sphere.setLinearVelocity(new THREE.Vector3(0, 0, -1));
        sphere.setLinearVelocity(direction);
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
