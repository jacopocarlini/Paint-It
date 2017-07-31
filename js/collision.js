Collision = function(){
    var isOnObjectN = false;
    var isOnObjectS = false;
    var isOnObjectE = false;
    var isOnObjectO = false;
    var isOnObjectG = false;
    var isOnObjectU = false;

    var isOnObjectNE = false;
    var isOnObjectSE = false;
    var isOnObjectNO = false;
    var isOnObjectSO = false;

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

    this.getNordEst = function(){
        return isOnObjectNE;
    }
    this.getSudEst = function(){
        return isOnObjectSE;
    }
    this.getNordOvest = function(){
        return isOnObjectNO;
    }
    this.getSudOvest = function(){
        return isOnObjectSO;
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
        var collisionN = new THREE.Raycaster(pointerlock.getObject().position, nord, 0, 10);
        var intersect = collisionN.intersectObjects(objects);
        isOnObjectN = intersect.length > 0;


        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var collisionS = new THREE.Raycaster(pointerlock.getObject().position, sud, 0, 10);
        var intersect = collisionS.intersectObjects(objects);
        isOnObjectS = intersect.length > 0;


        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var collisionE = new THREE.Raycaster(pointerlock.getObject().position, est, 0, 10);
        var intersect = collisionE.intersectObjects(objects);
        isOnObjectE = intersect.length > 0;


        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var collisionO = new THREE.Raycaster(pointerlock.getObject().position, ovest, 0, 10);
        var intersect = collisionO.intersectObjects(objects);
        isOnObjectO = intersect.length > 0;






        var giu = new THREE.Vector3(0, -1, 0);
        var collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
        var intersect = collisionG.intersectObjects(objects);
        isOnObjectG = intersect.length > 0;
        giu.z = nord.z + est.z;
        giu.x = nord.x + est.x;
        collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
        intersect = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect.length > 0;
        giu.z = nord.z + ovest.z;
        giu.x = nord.x + ovest.x;
        collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
        intersect = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect.length > 0;
        giu.z = sud.z + est.z;
        giu.x = sud.x + est.x;
        collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
        intersect = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect.length > 0;
        giu.z = sud.z + ovest.z;
        giu.x = sud.x + ovest.x;
        collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, 10);
        intersect = collisionG.intersectObjects(objects);
        isOnObjectG = isOnObjectG || intersect.length > 0;





        var up = new THREE.Vector3(0, 1, 0);
        var collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
        var intersect = collisionU.intersectObjects(objects);
        isOnObjectU = intersect.length > 0;
        up.z = nord.z + est.z;
        up.x = nord.x + est.x;
        collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
        intersect = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect.length > 0;
        up.z = nord.z + ovest.z;
        up.x = nord.x + ovest.x;
        collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
        intersect = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect.length > 0;
        up.z = sud.z + est.z;
        up.x = sud.x + est.x;
        collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
        intersect = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect.length > 0;
        up.z = sud.z + ovest.z;
        up.x = sud.x + ovest.x;
        collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, 10);
        intersect = collisionU.intersectObjects(objects);
        isOnObjectU = isOnObjectU || intersect.length > 0;






        var nordest = new THREE.Vector3(1, 0, -1);
        nordest.x = nord.x + est.x;
        nordest.z = nord.z + est.z;
        var collisionNE = new THREE.Raycaster(pointerlock.getObject().position, nordest, 0, 10);
        var intersect = collisionNE.intersectObjects(objects);
        isOnObjectNE = intersect.length > 0;

        var nordovest = new THREE.Vector3(-1, 0, -1);
        nordovest.x = nord.x + ovest.x;
        nordovest.z = nord.z + ovest.z;
        var collisionNO = new THREE.Raycaster(pointerlock.getObject().position, nordovest, 0, 10);
        var intersect = collisionNO.intersectObjects(objects);
        isOnObjectNO = intersect.length > 0;

        var sudest = new THREE.Vector3(1, 0, 1);
        sudest.x = sud.x + est.x;
        sudest.z = sud.z + est.z;
        var collisionSE = new THREE.Raycaster(pointerlock.getObject().position, sudest, 0, 10);
        var intersect = collisionSE.intersectObjects(objects);
        isOnObjectSE = intersect.length > 0;

        var sudovest = new THREE.Vector3(-1, 0, 1);
        sudovest.x = sud.x + ovest.x;
        sudovest.z = sud.z + ovest.z;
        var collisionSO = new THREE.Raycaster(pointerlock.getObject().position, sudovest, 0, 10);
        var intersect = collisionSO.intersectObjects(objects);
        isOnObjectSO = intersect.length > 0;



    }




}
