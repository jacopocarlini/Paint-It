Map = function(data) {

    function ground(px, py, pz, rx, ry, rz) {

        var ground_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                color: 0x888888
            }),
            .8, // high friction
            .3 // low restitution
        );
        var ground = new Physijs.BoxMesh(
            new THREE.BoxGeometry(1000, 1, 1000),
            ground_material,
            0 // mass
        );
        ground.name = "floor";
        ground.position.x = px;
        ground.position.y = py;
        ground.position.z = pz;
        ground.rotation.x = rx;
        ground.rotation.y = ry;
        ground.rotation.z = rz;
        scene.add(ground);
        floors.push(ground);
    }


    ground(0, -1, 0, 0, 0, 0);
    ground(0, 401, 0, 0, 0, 0);
    ground(401, 200, 0, 0, 0, Math.PI / 2);
    ground(-401, 200, 0, 0, 0, -Math.PI / 2);
    ground(0, 200, 401, -Math.PI / 2, 0, 0);
    ground(0, 200, -401, Math.PI / 2, 0, 0);


    function floor(px, py, pz, rx, ry, rz){
        geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
        geometry.rotateX(-Math.PI / 2);

        for (var i = 0, l = geometry.vertices.length; i < l; i++) {

            var vertex = geometry.vertices[i];
            vertex.x += Math.random() * 20 - 10;
            vertex.y += Math.random() * 2;
            vertex.z += Math.random() * 20 - 10;

        }

        for (var i = 0, l = geometry.faces.length; i < l; i++) {

            var face = geometry.faces[i];
            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        }

        material = new THREE.MeshBasicMaterial({
            vertexColors: THREE.VertexColors
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = px;
        mesh.position.y = py;
        mesh.position.z = pz;
        mesh.rotation.x = rx;
        mesh.rotation.y = ry;
        mesh.rotation.z = rz;
        scene.add(mesh);

    }

    floor(0, 0, 0, 0, 0, 0);
    floor(0, 400, 0, -Math.PI, 0, 0);
    floor(400, 200, 0, 0, 0, Math.PI / 2);
    floor(-400, 200, 0, 0, 0, -Math.PI / 2);
    floor(400, 200, 0, 0, 0, Math.PI / 2);
    floor(0, 200, 400, -Math.PI / 2, 0, 0);
    floor(0, 200, -400, Math.PI / 2, 0, 0);



    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }



    // objects

    for (var i = 0; i < data.length; i++) {
        var box_material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                color: 0x888888
            }),
            .8, // high friction
            .3 // low restitution
        );
        var box = new Physijs.BoxMesh(
            new THREE.BoxGeometry(100, 100, 20),
            box_material,
            0
        );
        // console.log(box);
        box.position.x = data[i].position.x;
        box.position.y = data[i].position.y;
        box.position.z = data[i].position.z;

        box.rotation.x = data[i].rotation.x;
        box.rotation.y = data[i].rotation.y;
        box.rotation.z = data[i].rotation.z;
        box.name = "box";
        box.colore = "grey";
        objects.push(box);
        scene.add(box);
    }


}
