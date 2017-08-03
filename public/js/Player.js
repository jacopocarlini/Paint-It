Player = function(data) {
    var p1 = data.p1;
    var x, y, z;
    var h, w, d;

    var geometry = new THREE.BoxGeometry(5, 5, 5);
    for (var i = 0, l = geometry.faces.length; i < l; i++) {

        var face = geometry.faces[i];
        face.vertexColors[0] = new THREE.Color(0xff0000);
        face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    }
    var material = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        shading: THREE.FlatShading,
        vertexColors: THREE.VertexColors
    });



    // Rotate an object around an arbitrary axis in object space
    var rotObjectMatrix;

    function rotateAroundObjectAxis(object, axis, radians) {
        rotObjectMatrix = new THREE.Matrix4();
        rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

        // old code for Three.JS pre r54:
        // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
        // new code for Three.JS r55+:
        object.matrix.multiply(rotObjectMatrix);

        // old code for Three.js pre r49:
        // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
        // old code for Three.js r50-r58:
        // object.rotation.setEulerFromRotationMatrix(object.matrix);
        // new code for Three.js r59+:
        object.rotation.setFromRotationMatrix(object.matrix);
    }

    var rotWorldMatrix;
    // Rotate an object around an arbitrary axis in world space
    function rotateAroundWorldAxis(object, axis, radians) {
        rotWorldMatrix = new THREE.Matrix4();
        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

        // old code for Three.JS pre r54:
        //  rotWorldMatrix.multiply(object.matrix);
        // new code for Three.JS r55+:
        rotWorldMatrix.multiply(object.matrix); // pre-multiply

        object.matrix = rotWorldMatrix;

        // old code for Three.js pre r49:
        // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
        // old code for Three.js pre r59:
        // object.rotation.setEulerFromRotationMatrix(object.matrix);
        // code for r59+:
        object.rotation.setFromRotationMatrix(object.matrix);
    }



    var playermesh = new THREE.Mesh(geometry, material);
    playermesh.position.x = data.player.position.x;
    playermesh.position.y = data.player.position.y;
    playermesh.position.z = data.player.position.z;


    scene.add(playermesh);

    var sightgeometry = new THREE.Geometry();

    var nord = new THREE.Vector3(0, 0, -1);
    nord.x = pointerlock.getDirection().x;
    nord.z = pointerlock.getDirection().z;

    var star = new THREE.Vector3();
    star.x = pointerlock.getObject().position.x + nord.x;
    star.y = pointerlock.getObject().position.y + nord.y;
    star.z = pointerlock.getObject().position.z + nord.z;

    sightgeometry.vertices.push(star)



    var sightmaterial = new THREE.PointsMaterial({
        color: 0x888888
    })

    var sight = new THREE.Points(sightgeometry, sightmaterial);

    scene.add(sight);



    material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    this.getGeometry = function() {
        return geometry;
    }
    this.getMesh = function() {
        return playermesh;
    }
    this.getPosition = function() {
        return playermesh.position;
    }
    this.getRotation = function() {
        return playermesh.rotation;
    }

    this.collision = function() {
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
                // console.log("collision");
                return true;

            }
        }
    }




    this.update = function(data) {
        if (p1) {
            playermesh.position.x = pointerlock.getObject().position.x;
            playermesh.position.y = pointerlock.getObject().position.y;
            playermesh.position.z = pointerlock.getObject().position.z;




            var v1 = new THREE.Vector2(pointerlock.getDirection().x, pointerlock.getDirection().z);
            playermesh.rotation.y = -v1.angle();
            var v2 = new THREE.Vector2(pointerlock.getDirection().y, pointerlock.getDirection().z);
            playermesh.rotation.x = v2.angle(); //NOTE: non so per quale motivo devo mettere rotazione di z invece che x!!!!
            /*inoltre se cancello la rotazione di y allora qui devo rimettere x */

            // this.collision();
            // sight.position.x = pointerlock.getObject().position.x + nord.x;
            // sight.position.y = pointerlock.getObject().position.y + nord.y;
            // sight.position.z = pointerlock.getObject().position.z + nord.z;
        } else {

            playermesh.position.x = data.position.x;
            playermesh.position.y = data.position.y;
            playermesh.position.z = data.position.z;




            var v1 = new THREE.Vector2(data.direction.x, data.direction.z);
            playermesh.rotation.y = -v1.angle();
            var v2 = new THREE.Vector2(data.direction.y, data.direction.z);
            playermesh.rotation.x = v2.angle(); //NOTE: non so per quale motivo devo mettere rotazione di z invece che x!!!!
            /*inoltre se cancello la rotazione di y allora qui devo rimettere x */

            // this.collision();



        }

    }

}
