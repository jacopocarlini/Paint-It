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

        var altezza = 20;
        var diff = 15;
        var playermesh, mixer, walkAction, idleAction, aimAction, aimUpAction, aimDownAction;
        var clock = new THREE.Clock();
        var skeleton;

        if (p1) {

            playermesh = new Physijs.BoxMesh(
                new THREE.BoxGeometry(20, 20, 20),
                new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                    color: 0x0000ff
                }), 1, 0.1),
                0
            );

            playermesh.position.x = pointerlock.getObject().position.x;
            playermesh.position.y = pointerlock.getObject().position.y;
            playermesh.position.z = pointerlock.getObject().position.z;

            playermesh.name = "player";

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

            for (var i = 0; i < materials.length; i++) {
                materials[i].skinning = true;
            }
            playermesh = new THREE.SkinnedMesh(geometry, materials);

            // playermesh = geometry;
            // playermesh.geometry.scale(2,2,2);
            playermesh.position.x = data.player.position.x;
            playermesh.position.y = data.player.position.y - diff;
            playermesh.position.z = data.player.position.z;
            // playermesh.rotation.x = data.player.rotation.x;
            // playermesh.rotation.y = data.player.rotation.y;
            // playermesh.rotation.z = data.player.rotation.z;
            playermesh.rotation.x = 0;
            if (direction == 1) playermesh.rotation.y = Math.PI / 2;
            else playermesh.rotation.y = -Math.PI / 2;
            playermesh.rotation.z = 0;
            // playermesh.geometry.scale(0.25, 0.25, 0.25);

            console.log(playermesh);

            skeleton = playermesh.skeleton;
            // var rootBone = skeleton.bones[ 0 ];
            // playermesh.add( rootBone );
            //
            // // Bind the skeleton to the mesh
            // playermesh.bind( skeleton );




            // var helper = new THREE.SkeletonHelper( playermesh );
            // helper.material.linewidth = 3;
            // scene.add( helper );

            mixer = new THREE.AnimationMixer(playermesh);
            walkAction = mixer.clipAction('walk');
            idleAction = mixer.clipAction('idle');
            walkAction.enabled = true;
            idleAction.enabled = true;
            aimAction = mixer.clipAction('aim');
            aimAction.enabled = true;
            aimUpAction = mixer.clipAction('aim_up');
            aimDownAction = mixer.clipAction('aim_down');
            aimUpAction.enabled = true;
            aimDownAction.enabled = true;
            walkAction.setEffectiveWeight(1.5);

            scene.add(playermesh);

            var box = new THREE.Box3().setFromObject(playermesh);
            var size = box.getSize();
            console.log(size);
            var hitbox = new Physijs.BoxMesh(
                new THREE.CubeGeometry(size.x, size.y, size.z),
                new Physijs.createMaterial(new THREE.MeshLambertMaterial({
                    color: 0x0000ff
                }), 1, 0.1),
                0
            );
            hitbox.visible = false;
            hitbox.name = "enemy";
            hitbox.position.x = playermesh.position.x;
            hitbox.position.y = playermesh.position.y + (diff - 7);
            hitbox.position.z = playermesh.position.z;
            scene.add(hitbox);

            // a = new THREE.BoxHelper(playermesh, 0xff0000);
            // scene.add(a);
            // b = new THREE.BoxHelper(hitbox, 0x00ff00);
            // scene.add(b);
            // c = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({
            //     color: 0x00ff00
            // }));
            // c.position.x = data.player.position.x;
            // c.position.y = data.player.position.y;
            // c.position.z = data.player.position.z;
            // d = new THREE.BoxHelper(c, 0x0000ff);
            // scene.add(d);




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
            console.log("damage");
            life -= 1;
            return life;
        }



        this.update = function(data) {
            var time = Date.now() * 0.001;
            if (p1) {

                // console.log(pointerlock.getObject().position);
                playermesh.position.x = pointerlock.getObject().position.x;
                playermesh.position.y = pointerlock.getObject().position.y;
                playermesh.position.z = pointerlock.getObject().position.z;

                playermesh.__dirtyPosition = true;


                nord.x = pointerlock.getDirection().x;
                nord.y = pointerlock.getDirection().y;
                nord.z = pointerlock.getDirection().z;
                sight.position.x = pointerlock.getObject().position.x + (nord.x * 2);
                sight.position.y = pointerlock.getObject().position.y + (nord.y * 2);
                sight.position.z = pointerlock.getObject().position.z + (nord.z * 2);

            } else {


                playermesh.position.x = data.position.x;
                playermesh.position.z = data.position.z;
                var v1 = new THREE.Vector2(data.rotation.x, data.rotation.z);
                if (data.gravity == 0) {
                    playermesh.position.y = data.position.y - diff;
                    playermesh.rotation.x = 0;
                    playermesh.rotation.y = -v1.angle();

                    hitbox.position.y = playermesh.position.y + (diff - 7);

                } else {
                    playermesh.position.y = data.position.y + diff;
                    playermesh.rotation.x = Math.PI;
                    playermesh.rotation.y = v1.angle();

                    hitbox.position.y = playermesh.position.y - 7;
                }



                hitbox.__dirtyPosition = true;
                hitbox.position.x = playermesh.position.x;

                hitbox.position.z = playermesh.position.z;

                hitbox.rotation.x = playermesh.rotation.x;
                var mixerUpdateDelta = clock.getDelta();
                var speed = 3;
                if (data.run) speed = 6;
                else speed = 3;
                mixer.update(mixerUpdateDelta * speed);

                if (data.move == "walk") {
                    idleAction.stop();
                    walkAction.play();
                }
                if (data.move == "idle") {
                    walkAction.stop();
                    idleAction.play()
                }

                if (data.gravity == 0) {


                if(data.rotation.y>0.3){
                    aimAction.stop();
                    aimDownAction.stop();
                    aimUpAction.play();
                }
                if(data.rotation.y<-0.3){
                    aimAction.stop();
                    aimUpAction.stop();
                    aimDownAction.play();
                }

                }
                else{
                    if(data.rotation.y<-0.3){
                        aimAction.stop();
                        aimDownAction.stop();
                        aimUpAction.play();
                    }
                    if(data.rotation.y>0.3){
                        aimAction.stop();
                        aimUpAction.stop();
                        aimDownAction.play();
                    }

                }

                if(data.rotation.y<=0.3 && data.rotation.y>=-0.3){
                    aimUpAction.stop();
                    aimDownAction.stop();
                    aimAction.play();
                }
                // console.log(skeleton.bones[2].rotation);


                    // var v2 = new THREE.Vector2(data.direction.y, data.direction.z);
                    // playermesh.rotation.x = v2.angle(); //NOTE: non so per quale motivo devo mettere rotazione di z invece che x!!!!
                    // /*inoltre se cancello la rotazione di y allora qui devo rimettere x */

                }

            }

        }
