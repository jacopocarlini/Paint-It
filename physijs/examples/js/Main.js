Physijs.scripts.worker = '/js/physijs_worker.js';
Physijs.scripts.ammo = '/js/ammo.js';

// GLOBALS ==============================================

var renderer, scene, camera, light, clock;

var player, enemy;

var plane, ball;
var ARATE = 2000; // delay for setInterval(function(){}, delay)
var WIDTH = window.innerWidth,
  HEIGHT = window.innerHeight,
  VIEW_ANGLE = 45,
  ASPECT = WIDTH / HEIGHT,
  NEAR = 1,
  FAR = 10000;
var INV_MAX_FPS = 1 / 100;
var frameDelta = 0;


// ANIMATION LOOP==============================================================

function animate() {
  draw();
  requestAnimationFrame(animate);
}

// SETUP ================================================

function setup() {
  setupThreeJS();
  setupWorld();
  requestAnimationFrame(animate);
  scene.simulate();
}

function setupThreeJS() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMapType = THREE.PCFShadowMap;
  renderer.shadowMapAutoUpdate = true;
  $("#viewport").append(renderer.domElement);

  renderStats = new Stats();
  renderStats.domElement.style.position = 'absolute';
  renderStats.domElement.style.top = '0px';
  renderStats.domElement.style.zIndex = 100;
  $('#viewport').append(renderStats.domElement);

  scene = new Physijs.Scene();
  scene.setGravity(new THREE.Vector3(0, -30, 0));
  scene.addEventListener('update', function() {
      frameDelta += clock.getDelta();
      while(frameDelta >= INV_MAX_FPS) {
          update(INV_MAX_FPS);
          frameDelta -= INV_MAX_FPS;
      }
      scene.simulate();
  });

  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  //camera.position.set(60, 40, 120);
  //camera.lookAt(scene.position);
  //scene.add(camera);

  clock = new THREE.Clock();

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 100, 60);
  light.castShadow = true;
  light.shadowCameraLeft = -60;
  light.shadowCameraTop = -60;
  light.shadowCameraRight = 60;
  light.shadowCameraBottom = 60;
  light.shadowCameraNear = 1;
  light.shadowCameraFar = 1000;
  light.shadowBias = -.0001
  light.shadowMapWidth = light.shadowMapHeight = 1024;
  light.shadowDarkness = .7;

  scene.add(light);
}

function setupWorld() {
  plane = new Physijs.BoxMesh(
      new THREE.BoxGeometry(1000, 1000, 5, 50, 50),
      new Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0xeeeeee }), .4, .8),
      0
  );

  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;

  scene.add(plane);

  player = new Player();
  player.camera = camera;
  player.camera.position.y = 30;
  player.camera.position.z = 100;
  player.bodyMesh.add(player.camera);
  player.bodyMesh.position.y = 15;
  scene.add(player.bodyMesh);
}

// DRAW =======================================================================

function draw() {
  renderer.render(scene, camera);
}

// UPDATE =====================================================================

function update(delta) {
  player.update(delta);
}

// INPUT ======================================================================

document.addEventListener('mousemove', function(event) {
  player.rotate(event.movementY, event.movementX, 0);
}, false);

document.addEventListener('keydown', function(event) {
  // Allow CTRL+L, CTRL+T, CTRL+W, and F5 for sanity
  if (!event.ctrlKey || !(event.keyCode == 76 || event.keyCode == 84 || event.keyCode == 87)) {
      if (event.keyCode != 116 && event.keyCode != 123) {
          event.preventDefault();
      }
  }
  switch (event.keyCode) {
      case 38: // up
      case 87: // w
          player.moveDirection.FORWARD = true;
          break;
      case 37: // left
      case 65: // a
          player.moveDirection.LEFT = true;
          break;
      case 40: // down
      case 83: // s
          player.moveDirection.BACKWARD = true;
          break;
      case 39: // right
      case 68: // d
          player.moveDirection.RIGHT = true;
          break;
      case 32: // space
          //player.jump();
          break;
  }
}, false);

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
      case 38: // up
      case 87: // w
          player.moveDirection.FORWARD = false;
          break;
      case 37: // left
      case 65: // a
          player.moveDirection.LEFT = false;
          break;
      case 40: // down
      case 83: // s
          player.moveDirection.BACKWARD = false;
          break;
      case 39: // right
      case 68: // d
          player.moveDirection.RIGHT = false;
          break;
      case 32: // space
          break;
  }
}, false);

// RUN ===============================================

$(document).ready(function() {
  setup();
});
