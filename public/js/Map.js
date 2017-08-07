Map = function(data) {

    var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ color: 0x888888 }),
			.8, // high friction
			.3 // low restitution
		);
    var ground = new Physijs.BoxMesh(
			new THREE.BoxGeometry(800, 1, 800),
			ground_material,
			0 // mass
		);
    ground.name="floor";
    scene.add(ground);



    var ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ color: 0x888888 }),
			.8, // high friction
			.3 // low restitution
		);
    var ground = new Physijs.BoxMesh(
			new THREE.BoxGeometry(800, 1, 800),
			ground_material,
			0 // mass
		);
    ground.name="floor";
    ground.position.y = 400;
    ground.rotation.x = Math.PI;
    scene.add(ground);

    // floor 1
    geometry = new THREE.PlaneGeometry(2000, 800, 100, 100);
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
    scene.add(mesh);
    floors.push(mesh);

    // floor 2

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 400;
    mesh.rotation.x = Math.PI;
    scene.add(mesh);
    floors.push(mesh);


    // floor 3

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.x = 400;
    mesh.rotation.z = Math.PI / 2;
    scene.add(mesh);
    floors.push(mesh);


    // floor 4

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.x = -400;
    mesh.rotation.z = -Math.PI / 2;
    scene.add(mesh);
    floors.push(mesh);


    // floor 5

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.z = -400;
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);
    floors.push(mesh);


    // floor 6

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.z = 400;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);
    floors.push(mesh);





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
                    			new THREE.MeshLambertMaterial({ color: 0x888888 }),
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
                        box.name="box";
                        objects.push(box);
                        scene.add(box);
                    }


}
