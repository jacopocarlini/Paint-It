Bullet = function(id) {
    var direction = pointerlock.getDirection();
    var sphere;

    var speed = 100;
    var delta;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();

    var hit = false;

    this.addBullet = function() {
        var geometry = new THREE.SphereGeometry(1, 32, 32);

        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = pointerlock.getObject().position.x;
        sphere.position.y = pointerlock.getObject().position.y;
        sphere.position.z = pointerlock.getObject().position.z;
        direction = pointerlock.getDirection();
        sphere.name = id
        scene.add(sphere);

    }

    this.update = function() {

        hit = false;
        // if (this.collision()) hit = true;

        var time = performance.now();
        var delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.y -= velocity.y * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.x += 400.0 * delta * speed;
        velocity.y += 400.0 * delta * speed;
        velocity.z += 400.0 * delta * speed;

        // console.log(velocity.x * direction.x * delta);
        sphere.translateX(velocity.x * direction.x * delta);
        sphere.translateY(velocity.y * direction.y * delta);
        sphere.translateZ(velocity.z * direction.z * delta);
        // sphere.position.x += (direction.x)*speed;
        // sphere.position.y += (direction.y)*speed;
        // sphere.position.z += (direction.z)*speed;
        prevTime = time;
    }

    this.hit = function(){
        var ray = new THREE.Raycaster(sphere.position, direction, 0, 50);
        var hit = ray.intersectObject(enemy.getMesh());
        // console.log(hit);
        if (hit.length > 0) {
            // console.log("true");
            hit = true;
            return true;
        }
    }

    this.collision = function() {
        // var hit = new THREE.Raycaster(sphere.position, direction, 0, 1);
        // var objhit = hit.intersectObjects(objects);
        // if (objhit.length > 0) {
        //     hit = true;
        //     objhit[0].object.material.color.set(0x0000ff);
        //     return true;
        // }

        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = direction.x;
        sud.z = -direction.z;
        var objray = new THREE.Raycaster(sphere.position, direction, 0, 50);
        var objhit = objray.intersectObjects(objects);
        if (objhit.length > 0) {
            // hit = true;
            objhit[0].object.material.color.set(0x0000ff);
            return true;
        }




        // for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
        //     var localVertex = sphere.geometry.vertices[vertexIndex].clone();
        //     // var globalVertex = sphere.matrix.multiplyVector3(localVertex);
        //     var globalVertex = localVertex.applyMatrix4(sphere.matrix);
        //     var directionVector = globalVertex.sub(sphere.position);
        //     var ray = new THREE.Ray(sphere.position, directionVector.clone().normalize());
        //     var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 1);
        //     raycaster.ray = ray;
        //
        //     var collisionResults = raycaster.intersectObjects(objects);
        //     if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        //         // console.log("hit");
        //         // return true;
        //         hit = true;
        //     }
        // }
    }

    this.getHit = function(){
        return hit;
    }

}
