Map = function() {
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

    // floor 2

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 400;
    mesh.rotation.x = Math.PI;
    scene.add(mesh);

    // floor 3

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.x = 400;
    mesh.rotation.z = Math.PI / 2;
    scene.add(mesh);

    // floor 4

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.x = -400;
    mesh.rotation.z = -Math.PI / 2;
    scene.add(mesh);

    // floor 5

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.z = -400;
    mesh.rotation.x = Math.PI / 2;
    scene.add(mesh);

    // floor 6

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 200;
    mesh.position.z = 400;
    mesh.rotation.x = -Math.PI / 2;
    scene.add(mesh);



    // objects

    geometry = new THREE.BoxGeometry(100, 100, 20);

    for (var i = 0, l = geometry.faces.length; i < l; i++) {

        var face = geometry.faces[i];
        face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    }
    //
    // material = new THREE.MeshPhongMaterial({
    //             specular: 0xffffff,
    //             shading: THREE.FlatShading,
    //             vertexColors: THREE.VertexColors
    //         });
    //
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = -150;
    // mesh.position.y = 20;
    // mesh.position.z = 0;
    // scene.add(mesh);
    // objects.push(mesh);
    //
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = 0;
    // mesh.position.y = 20;
    // mesh.position.z = 0;
    // scene.add(mesh);
    // objects.push(mesh);
    //
    // var mesh = new THREE.Mesh(geometry, material);
    // mesh.position.x = 150;
    // mesh.position.y = 20;
    // mesh.position.z = 0;
    // scene.add(mesh);
    // objects.push(mesh);

    for (var i = 0; i < 100; i++) {
        material = new THREE.MeshPhongMaterial({
            specular: 0xffffff,
            shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
        });

        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.floor(Math.random() * 8 - 4) * 100;
        mesh.position.y = Math.floor(Math.random() * 4) * 100 + 5;
        mesh.position.z = Math.floor(Math.random() * 8 - 4) * 100;
        if(Math.random()>0.5) mesh.rotation.x = -Math.PI / 2;
        

        scene.add(mesh);

        material.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

        objects.push(mesh);

    }

}
