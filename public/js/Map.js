Map = function(data) {
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

    var loader = new THREE.ObjectLoader();
    var cross, h_form, plane;
    loader.load("../models/cross.json",

        function(obj) {
            loader.load("../models/h_form.json", function(obj2) {



                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < obj.children.length; j++) {
                        for (var k = 0, l = obj.children[j].geometry.faces.length; k < l; k++) {

                            var face = obj.children[j].geometry.faces[k];
                            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

                        }

                        material = new THREE.MeshPhongMaterial({
                            specular: 0xffffff,
                            shading: THREE.FlatShading,
                            vertexColors: THREE.VertexColors
                        });
                        obj.children[j].material = material;
                    }
                    for (var j = 0; j < obj2.children.length; j++) {
                        for (var k = 0, l = obj2.children[j].geometry.faces.length; k < l; k++) {

                            var face = obj2.children[j].geometry.faces[k];
                            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

                        }

                        material = new THREE.MeshPhongMaterial({
                            specular: 0xffffff,
                            shading: THREE.FlatShading,
                            vertexColors: THREE.VertexColors
                        });
                        obj2.children[j].material = material;
                    }
                    if (data[i].type == "cross") {
                        cross = obj.clone();

                        cross.position.x = data[i].position.x;
                        cross.position.y = data[i].position.y;
                        cross.position.z = data[i].position.z;

                        cross.rotation.x = data[i].rotation.x;
                        cross.rotation.y = data[i].rotation.y;
                        cross.rotation.z = data[i].rotation.z;
                        scene.add(cross);
                        objects.push(cross);
                    }
                    if (data[i].type == "h_form") {
                        h_form = obj2.clone();

                        h_form.position.x = data[i].position.x;
                        h_form.position.y = data[i].position.y;
                        h_form.position.z = data[i].position.z;

                        h_form.rotation.x = data[i].rotation.x;
                        h_form.rotation.y = data[i].rotation.y;
                        h_form.rotation.z = data[i].rotation.z;
                        scene.add(h_form);
                        objects.push(h_form);
                    }
                    if (data[i].type == "plane") {
                        geometry = new THREE.BoxGeometry(100, 100, 20);

                        for (var i = 0, l = geometry.faces.length; i < l; i++) {

                            var face = geometry.faces[i];
                            face.vertexColors[0] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[1] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
                            face.vertexColors[2] = new THREE.Color().setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

                        }

                        material = new THREE.MeshPhongMaterial({
                            specular: 0xffffff,
                            shading: THREE.FlatShading,
                            vertexColors: THREE.VertexColors
                        });

                        var mesh = new THREE.Mesh(geometry, material);
                        mesh.position.x = data[i].position.x;
                        mesh.position.y = data[i].position.y;
                        mesh.position.z = data[i].position.z;

                        mesh.rotation.x = data[i].rotation.x;
                        mesh.rotation.y = data[i].rotation.y;
                        mesh.rotation.z = data[i].rotation.z;
                        var group = new THREE.Group();
                        group.add(mesh);
                        scene.add(group);
                        objects.push(group);
                    }
                }
            });

        });




        





}
