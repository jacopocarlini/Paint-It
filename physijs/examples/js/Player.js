function Player() {
   this.bodyMesh = new Physijs.BoxMesh(
       new THREE.BoxGeometry(25, 25, 25),
       new Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0xff0000 }), 1, .1),
       1
   );
   this.camera;

   this.bodyMesh.rotation.order = 'YXZ';
   this._aggregateRotation = new THREE.Vector3();

   // Public properties
   this.fly = false;
   this.cameraHeight = 40;
   this.maxHealth = 100;
   this.constrainVerticalLook = true;
   this.health = this.maxHealth;
   this.inverseLook = new THREE.Vector3(-1, -1, -1);
   this.mouseSensitivity = new THREE.Vector3(0.25, 0.25, 0.25);
   this.velocity = new THREE.Vector3();
   this.moveDirection = {
       FORWARD: false,
       BACKWARD: false,
       LEFT: false,
       RIGHT: false
   };
}

Player.prototype.constructor = Player;

Player.SPEED = 5;
Player.RADIUS = 20;

Player.prototype.update = (function() {

   return function(delta) {
       // Compute look vector
       var r = this._aggregateRotation
                   .multiply(this.inverseLook)
                   .multiply(this.mouseSensitivity)
                   .multiplyScalar(delta)
                   .add(this.camera.rotation);
       if(this.constrainVerticalLook) {
           r.x = Math.max(Math.PI * -0.5, Math.min(Math.PI * 0.5, r.x));
       }
       if(!this.fly) {
           this.bodyMesh.rotation.x = 0;
       }

       // Thrust
       if(this.moveDirection.FORWARD) {
           this.velocity.z -= Player.SPEED;
       }
       if(this.moveDirection.LEFT) {
           this.velocity.x -= Player.SPEED;
       }
       if(this.moveDirection.BACKWARD) {
           this.velocity.z += Player.SPEED;
       }
       if(this.moveDirection.RIGHT) {
           this.velocity.x += Player.SPEED;
       }
       this.bodyMesh.setLinearVelocity(this.velocity);

       // Look
       this.camera.rotation.set(r.x, r.y, r.z);
       this._aggregateRotation.set(0,0,0);
   };
})();

// Parameters are in pixel distances representing mouse movement
Player.prototype.rotate = function(x, y, z) {
   this._aggregateRotation.x += x;
   this._aggregateRotation.y += y;
   this._aggregateRotation.z += z;
};
