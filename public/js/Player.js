Player = function(data) {
    var p1 = data.p1;
    var life = 3;
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var jump = false;
    var canJump = true;
    var gravity = 0;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var speed = 2.0;
    var mass = 100.0;

    var altezza = 10;
    var playermesh;

    if (p1) {

        playermesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(20, 20, 20),
            new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }), 1, .1),
            0
        );

        playermesh.position.x = pointerlock.getObject().position.x;
        playermesh.position.y = pointerlock.getObject().position.y;
        playermesh.position.z = pointerlock.getObject().position.z;

        playermesh.name="player";

        scene.add(playermesh);


        var sightgeometry = new THREE.SphereGeometry(0.01, 32, 32);
        var sightmaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000
        });
        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var sight = new THREE.Mesh(sightgeometry, sightmaterial);

        scene.add(sight);

    } else {

        playermesh = new Physijs.BoxMesh(
            new THREE.BoxGeometry(20, 20, 20),
            new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                color: 0xff0000
            }), 1, .1),
            0
        );

        playermesh.position.x = data.player.position.x;
        playermesh.position.y = data.player.position.y;
        playermesh.position.z = data.player.position.z;

        playermesh.name="enemy";

        scene.add(playermesh);

    }




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
                return true;

            }
        }
    }


    this.damage = function() {
        life -= 1;
        return life;
    }



    this.update = function(data) {
        if (p1) {

            // console.log("position ", pointerlock.getObject().position);
            // console.log("direction ", pointerlock.getDirection());
            playermesh.position.x = pointerlock.getObject().position.x;
            playermesh.position.y = pointerlock.getObject().position.y;
            playermesh.position.z = pointerlock.getObject().position.z;

            playermesh.__dirtyPosition = true;



            // var v1 = new THREE.Vector2(pointerlock.getDirection().x, pointerlock.getDirection().z);
            // // playermesh.rotation.y = -v1.angle();
            // var v2 = new THREE.Vector2(pointerlock.getDirection().y, pointerlock.getDirection().z);
            // // playermesh.rotation.x = v2.angle(); //NOTE: non so per quale motivo devo mettere rotazione di z invece che x!!!!
            // /*inoltre se cancello la rotazione di y allora qui devo rimettere x */


            nord.x = pointerlock.getDirection().x;
            nord.y = pointerlock.getDirection().y;
            nord.z = pointerlock.getDirection().z;
            sight.position.x = pointerlock.getObject().position.x + (nord.x * 2);
            sight.position.y = pointerlock.getObject().position.y + (nord.y * 2);
            sight.position.z = pointerlock.getObject().position.z + (nord.z * 2);

        } else {


            playermesh.position.x = data.position.x;
            playermesh.position.y = data.position.y;
            playermesh.position.z = data.position.z;

            playermesh.__dirtyPosition = true;


            // var v1 = new THREE.Vector2(data.direction.x, data.direction.z);
            // // playermesh.rotation.y = -v1.angle();
            // var v2 = new THREE.Vector2(data.direction.y, data.direction.z);
            // playermesh.rotation.x = v2.angle(); //NOTE: non so per quale motivo devo mettere rotazione di z invece che x!!!!
            // /*inoltre se cancello la rotazione di y allora qui devo rimettere x */

        }

    }

}
