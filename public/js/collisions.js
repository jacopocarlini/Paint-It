Collisions = function() {
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

    var intersectN, intersectS, intersectE, intersectO, intersectG, intersectU;

    var l = 9;
    var d = 9;
    var p = 0;

    var altezza = 20;

    this.getNord = function() {
        return isOnObjectN;
    }
    this.getSud = function() {
        return isOnObjectS;
    }
    this.getEst = function() {
        return isOnObjectE;
    }
    this.getOvest = function() {
        return isOnObjectO;
    }
    this.getGiu = function() {
        return isOnObjectG;
    }
    this.getUp = function() {
        return isOnObjectU;
    }

    this.getNordEst = function() {
        return isOnObjectNE;
    }
    this.getSudEst = function() {
        return isOnObjectSE;
    }
    this.getNordOvest = function() {
        return isOnObjectNO;
    }
    this.getSudOvest = function() {
        return isOnObjectSO;
    }


    this.getIntersectN = function() {
        return intersectN;
    }
    this.getIntersectS = function() {
        return intersectS;
    }
    this.getIntersectE = function() {
        return intersectE;
    }
    this.getIntersectO = function() {
        return intersectO;
    }
    this.getIntersectG = function() {
        return intersectG;
    }
    this.getIntersectU = function() {
        return intersectU;
    }


    this.compute = function() {
        isOnObjectN = false;
        isOnObjectS = false;
        isOnObjectE = false;
        isOnObjectO = false;
        isOnObjectG = false;
        isOnObjectU = false;

        var nord = new THREE.Vector3(0, 0, -1);
        nord.x = pointerlock.getDirection().x;
        nord.z = pointerlock.getDirection().z;
        var collisionN = new THREE.Raycaster(pointerlock.getObject().position, nord, 0, altezza);
        intersectN = collisionN.intersectObjects(objects, true);
        isOnObjectN = intersectN.length > 0;
        // console.log(isOnObjectN);


        var sud = new THREE.Vector3(0, 0, 1);
        sud.x = pointerlock.getDirection().x;
        sud.z = -pointerlock.getDirection().z;
        var collisionS = new THREE.Raycaster(pointerlock.getObject().position, sud, 0, altezza);
        intersectS = collisionS.intersectObjects(objects, true);
        isOnObjectS = intersectS.length > 0;


        var est = new THREE.Vector3(1, 0, 0);
        est.z = nord.x;
        est.x = -nord.z;
        var collisionE = new THREE.Raycaster(pointerlock.getObject().position, est, 0, altezza);
        intersectE = collisionE.intersectObjects(objects, true);
        isOnObjectE = intersectE.length > 0;


        var ovest = new THREE.Vector3(-1, 0, 0);
        ovest.z = -nord.x;
        ovest.x = nord.z;
        var collisionO = new THREE.Raycaster(pointerlock.getObject().position, ovest, 0, altezza);
        intersectO = collisionO.intersectObjects(objects, true);
        isOnObjectO = intersectO.length > 0;






        var giu = new THREE.Vector3(0, -1, 0);
        var collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, altezza+20);
        intersectG = collisionG.intersectObjects(objects, true);
        isOnObjectG = intersectG.length > 0;
        // giu.z = nord.z + est.z;
        // giu.x = nord.x + est.x;
        // collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, altezza);
        // intersectG = collisionG.intersectObjects(objects, true);
        // isOnObjectG = isOnObjectG || intersectG.length > 0;
        // giu.z = nord.z + ovest.z;
        // giu.x = nord.x + ovest.x;
        // collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, altezza);
        // intersectG = collisionG.intersectObjects(objects, true);
        // isOnObjectG = isOnObjectG || intersectG.length > 0;
        // giu.z = sud.z + est.z;
        // giu.x = sud.x + est.x;
        // collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, altezza);
        // intersectG = collisionG.intersectObjects(objects, true);
        // isOnObjectG = isOnObjectG || intersectG.length > 0;
        // giu.z = sud.z + ovest.z;
        // giu.x = sud.x + ovest.x;
        // collisionG = new THREE.Raycaster(pointerlock.getObject().position, giu, 0, altezza);
        // intersectG = collisionG.intersectObjects(objects, true);
        // isOnObjectG = isOnObjectG || intersectG.length > 0;





        var up = new THREE.Vector3(0, 1, 0);
        var collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, altezza+20);
        intersectU = collisionU.intersectObjects(objects, true);
        isOnObjectU = intersectU.length > 0;
        // up.z = nord.z + est.z;
        // up.x = nord.x + est.x;
        // collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, altezza);
        // intersectU = collisionU.intersectObjects(objects, true);
        // isOnObjectU = isOnObjectU || intersectU.length > 0;
        // up.z = nord.z + ovest.z;
        // up.x = nord.x + ovest.x;
        // collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, altezza);
        // intersectU = collisionU.intersectObjects(objects, true);
        // isOnObjectU = isOnObjectU || intersectU.length > 0;
        // up.z = sud.z + est.z;
        // up.x = sud.x + est.x;
        // collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, altezza);
        // intersectU = collisionU.intersectObjects(objects, true);
        // isOnObjectU = isOnObjectU || intersectU.length > 0;
        // up.z = sud.z + ovest.z;
        // up.x = sud.x + ovest.x;
        // collisionU = new THREE.Raycaster(pointerlock.getObject().position, up, 0, altezza);
        // intersectU = collisionU.intersectObjects(objects, true);
        // isOnObjectU = isOnObjectU || intersectU.length > 0;






        var nordest = new THREE.Vector3(1, 0, -1);
        nordest.x = nord.x + est.x;
        nordest.z = nord.z + est.z;
        var collisionNE = new THREE.Raycaster(pointerlock.getObject().position, nordest, 0, altezza);
        var intersect = collisionNE.intersectObjects(objects, true);
        isOnObjectNE = intersect.length > 0;

        var nordovest = new THREE.Vector3(-1, 0, -1);
        nordovest.x = nord.x + ovest.x;
        nordovest.z = nord.z + ovest.z;
        var collisionNO = new THREE.Raycaster(pointerlock.getObject().position, nordovest, 0, altezza);
        var intersect = collisionNO.intersectObjects(objects, true);
        isOnObjectNO = intersect.length > 0;

        var sudest = new THREE.Vector3(1, 0, 1);
        sudest.x = sud.x + est.x;
        sudest.z = sud.z + est.z;
        var collisionSE = new THREE.Raycaster(pointerlock.getObject().position, sudest, 0, altezza);
        var intersect = collisionSE.intersectObjects(objects, true);
        isOnObjectSE = intersect.length > 0;

        var sudovest = new THREE.Vector3(-1, 0, 1);
        sudovest.x = sud.x + ovest.x;
        sudovest.z = sud.z + ovest.z;
        var collisionSO = new THREE.Raycaster(pointerlock.getObject().position, sudovest, 0, altezza);
        var intersect = collisionSO.intersectObjects(objects, true);
        isOnObjectSO = intersect.length > 0;



    }




}
