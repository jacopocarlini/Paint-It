Player = function() {
    var x, y, z;
    var h, w, d;

    var geometry = new THREE.BoxGeometry(20, 20, 20);
    for (var i = 0, l = geometry.faces.length; i < l; i++) {

        var face = geometry.faces[i];
        face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    }
    var material = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        shading: THREE.FlatShading,
        vertexColors: THREE.VertexColors
    });

    var playermesh = new THREE.Mesh(geometry, material);
    playermesh.position.x = 0;
    playermesh.position.y = 10;
    playermesh.position.z = 0;

    scene.add(playermesh);

    material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    this.getGeometry=function(){
        return geometry;
    }
    this.getMesh=function(){
        return playermesh;
    }
    this.getPosition=function(){
        return playermesh.position;
    }
    this.getRotation=function(){
        return playermesh.rotation;
    }




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
        rotWorldMatrix.multiply(object.matrix);                // pre-multiply

        object.matrix = rotWorldMatrix;

        // old code for Three.js pre r49:
        // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
        // old code for Three.js pre r59:
        // object.rotation.setEulerFromRotationMatrix(object.matrix);
        // code for r59+:
        object.rotation.setFromRotationMatrix(object.matrix);
    }
    this.update = function() {
        playermesh.position.x = pointerlock.getObject().position.x;
        playermesh.position.y = pointerlock.getObject().position.y-10;
        playermesh.position.z = pointerlock.getObject().position.z-50;



        // if (aux) playermesh.rotation.y  +=0.01;


console.log(playermesh.rotation.y);



    }

}
