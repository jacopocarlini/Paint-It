Collision = function(){
    var isOnObjectN = false;
    var isOnObjectS = false;
    var isOnObjectE = false;
    var isOnObjectO = false;
    var isOnObjectG = false;
    var isOnObjectU = false;

    var l = 9;
    var d = 9;
    var p = 0;

    this.getNord = function(){
        return isOnObjectN;
    }
    this.getSud = function(){
        return isOnObjectS;
    }
    this.getEst = function(){
        return isOnObjectE;
    }
    this.getOvest = function(){
        return isOnObjectO;
    }
    this.getGiu = function(){
        return isOnObjectG;
    }
    this.getUp = function(){
        return isOnObjectU;
    }


    this.compute = function(){
        isOnObjectN = false;
        isOnObjectS = false;
        isOnObjectE = false;
        isOnObjectO = false;
        isOnObjectG = false;
        isOnObjectU = false;

        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (-nord.z)*l;
        pos.z += (nord.x)*l;
        pos.y += l;
        // console.log(Math.sqrt(Math.pow((-nord.z)*(d),2)+Math.pow((nord.x)*(d),2)));
        var collisionN = new THREE.Raycaster(pos, nord, 0, d);
        var intersect1 = collisionN.intersectObjects(objects);
        isOnObjectN = isOnObjectN || intersect1.length > 0;
        // console.log("1 ", intersect1.length > 0);

        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (-nord.z)*l;
        pos.z += (nord.x)*l;
        pos.y -= l;
        collisionN = new THREE.Raycaster(pos, nord, 0, d);
        intersect1 = collisionN.intersectObjects(objects);
        isOnObjectN = isOnObjectN || intersect1.length > 0;
        // console.log("2 ",intersect1.length > 0);

        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.z)*l;
        pos.z += (-nord.x)*l;
        pos.y += l;
        collisionN = new THREE.Raycaster(pos, nord, 0, d);
        intersect1 = collisionN.intersectObjects(objects);
        isOnObjectN = isOnObjectN || intersect1.length > 0;
        // console.log("3 ",intersect1.length > 0);

        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.z)*l;
        pos.z += (-nord.x)*l;
        pos.y -= l;
        collisionN = new THREE.Raycaster(pos, nord, 0, d);
        intersect1 = collisionN.intersectObjects(objects);
        isOnObjectN = isOnObjectN || intersect1.length > 0;
        // console.log("4 ",intersect1.length > 0);





        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (-nord.z)*l;
        pos.z += (nord.x)*l;
        pos.y += l;
        var collisionS = new THREE.Raycaster(pos, sud, 0, d);
        var intersect2 = collisionS.intersectObjects(objects);
        isOnObjectS = isOnObjectS || intersect2.length > 0;

        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.z)*l;
        pos.z += (-nord.x)*l;
        pos.y -= l;
        collisionS = new THREE.Raycaster(pos, sud, 0, d);
        intersect2 = collisionS.intersectObjects(objects);
        isOnObjectS = isOnObjectS || intersect2.length > 0;

        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.z)*l;
        pos.z += (-nord.x)*l;
        pos.y += l;
        collisionS = new THREE.Raycaster(pos, sud, 0, d);
        intersect2 = collisionS.intersectObjects(objects);
        isOnObjectS = isOnObjectS || intersect2.length > 0;

        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.z)*l;
        pos.z += (-nord.x)*l;
        pos.y -= l;
        collisionS = new THREE.Raycaster(pos, sud, 0, d);
        intersect2 = collisionS.intersectObjects(objects);
        isOnObjectS = isOnObjectS || intersect2.length > 0;





        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.z += (nord.z)*l;
        pos.x += (nord.x)*l;
        pos.y += l;
        var collisionE = new THREE.Raycaster(pos, est, 0, d);
        var intersect3 = collisionE.intersectObjects(objects);
        isOnObjectE = isOnObjectE || intersect3.length > 0;

        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.z += (nord.z)*l;
        pos.x += (nord.x)*l;
        pos.y -= l;
        collisionE = new THREE.Raycaster(pos, est, 0, d);
        intersect3 = collisionE.intersectObjects(objects);
        isOnObjectE = isOnObjectE || intersect3.length > 0;

        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x)*l;
        pos.z += (sud.z)*l;
        pos.y += l;
        collisionE = new THREE.Raycaster(pos, est, 0, d);
        intersect3 = collisionE.intersectObjects(objects);
        isOnObjectE = isOnObjectE || intersect3.length > 0;

        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x)*l;
        pos.z += (sud.z)*l;
        pos.y -= l;
        collisionE = new THREE.Raycaster(pos, est, 0, d);
        intersect3 = collisionE.intersectObjects(objects);
        isOnObjectE = isOnObjectE || intersect3.length > 0;






        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.z += (nord.z)*l;
        pos.x += (nord.x)*l;
        pos.y += l;
        var collisionO = new THREE.Raycaster(pos, ovest, 0, d);
        var intersect4 = collisionO.intersectObjects(objects);
        isOnObjectO = isOnObjectO || intersect4.length > 0;

        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.z += (nord.z)*l;
        pos.x += (nord.x)*l;
        pos.y -= l;
        collisionO = new THREE.Raycaster(pos, ovest, 0, d);
        intersect4 = collisionO.intersectObjects(objects);
        isOnObjectO = isOnObjectO || intersect4.length > 0;

        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x)*l;
        pos.z += (sud.z)*l;
        pos.y += l;
        var collisionO = new THREE.Raycaster(pos, ovest, 0, d);
        var intersect4 = collisionO.intersectObjects(objects);
        isOnObjectO = isOnObjectO || intersect4.length > 0;

        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x)*l;
        pos.z += (sud.z)*l;
        pos.y -= l;
        collisionO = new THREE.Raycaster(pos, ovest, 0, d);
        intersect4 = collisionO.intersectObjects(objects);
        isOnObjectO = isOnObjectO || intersect4.length > 0;




        var giu = new THREE.Vector3(0, -1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.x+est.x)*(l+1);
        pos.z += (nord.z+est.z)*(l+1);
        var collisionG = new THREE.Raycaster(pos, giu, 0, d);
        var intersect5 = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect5.length > 0;

        var giu = new THREE.Vector3(0, -1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x+est.x)*(l+1);
        pos.z += (sud.z+est.z)*(l+1);
        collisionG = new THREE.Raycaster(pos, giu, 0, d);
        intersect5 = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect5.length > 0;

        var giu = new THREE.Vector3(0, -1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.x+ovest.x)*(l+1);
        pos.z += (nord.z+ovest.z)*(l+1);
        collisionG = new THREE.Raycaster(pos, giu, 0, d);
        intersect5 = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect5.length > 0;

        var giu = new THREE.Vector3(0, -1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x+ovest.x)*(l+1);
        pos.z += (sud.z+ovest.z)*(l+1);
        collisionG = new THREE.Raycaster(pos, giu, 0, d);
        intersect5 = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect5.length > 0;




        var up = new THREE.Vector3(0, 1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.x+est.x)*l;
        pos.z += (nord.z+est.z)*l;
        var collisionU = new THREE.Raycaster(pos, up, 0, d);
        var intersect6 = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect6.length > 0;

        var up = new THREE.Vector3(0, 1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x+est.x)*(l+1);
        pos.z += (sud.z+est.z)*(l+1);
        collisionU = new THREE.Raycaster(pos, up, 0, d);
        intersect6 = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect6.length > 0;

        var up = new THREE.Vector3(0, 1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (nord.x+ovest.x)*(l+1);
        pos.z += (nord.z+ovest.z)*(l+1);
        collisionU = new THREE.Raycaster(pos, up, 0, d);
        intersect6 = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect6.length > 0;

        var up = new THREE.Vector3(0, 1, 0);
        var pos = pointerlock.getObject().position.clone();
        pos.x += (sud.x+ovest.x)*(l+1);
        pos.z += (sud.z+ovest.z)*(l+1);
        collisionU = new THREE.Raycaster(pos, up, 0, d);
        intersect6 = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect6.length > 0;
    }




}
