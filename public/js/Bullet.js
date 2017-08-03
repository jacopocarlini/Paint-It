Bullet = function() {
    var direction;
    var sphere;

    var speed = 20;
    this.addBullet = function() {
        var geometry = new THREE.SphereGeometry(0.2, 32, 32);

        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00
        });
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = pointerlock.getObject().position.x;
        sphere.position.y = pointerlock.getObject().position.y;
        sphere.position.z = pointerlock.getObject().position.z;
        direction = pointerlock.getDirection();
        scene.add(sphere);

    }

    this.update = function() {
        sphere.position.x += (direction.x)*speed;
        sphere.position.y += (direction.y)*speed;
        sphere.position.z += (direction.z)*speed;
    }

    this.collision = function() {
        for (var vertexIndex = 0; vertexIndex < sphere.geometry.vertices.length; vertexIndex++) {
            var localVertex = sphere.geometry.vertices[vertexIndex].clone();
            // var globalVertex = sphere.matrix.multiplyVector3(localVertex);
            var globalVertex = localVertex.applyMatrix4(sphere.matrix);
            var directionVector = globalVertex.sub(sphere.position);
            var ray = new THREE.Ray(sphere.position, directionVector.clone().normalize());
            var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
            raycaster.ray = ray;
            var collisionResults = raycaster.intersectObject(enemy.getMesh());
            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                console.log("hit");
                return true;

            }
        }
    }

}
