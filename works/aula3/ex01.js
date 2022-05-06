import * as THREE from  'three';
import Stats from       '../../build/jsm/libs/stats.module.js';
// import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../../libs/util/KeyboardState.js'
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneWired} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils

// Main camera
// var camera = initCamera(new THREE.Vector3(0, 0, 1));
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 0, 1);
  camera.up.set( 0, 1, 0 );   

// Show text information onscreen
showInformation();   

initDefaultBasicLight(scene);
var clock = new THREE.Clock();

// To use the keyboard
var keyboard = new KeyboardState();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneWired(1000 ,1000)
scene.add(plane);

scene.add( new THREE.HemisphereLight() );

var cameraHolder = new THREE.Object3D();

cameraHolder.add(camera);
cameraHolder.position.set(0,2,0);
scene.add(cameraHolder);
camera.lookAt(0, 0, 0);
camera.up.set( 0, 1, 0 );   

// Use this to show information onscreen

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

function keyboardUpdate() {

   keyboard.update();
 
   var speed = 3;
   var moveDistance = speed * clock.getDelta();
 
   // Keyboard.down - execute only once per key pressed
   if ( keyboard.pressed("left") )   cameraHolder.rotateY( moveDistance );
   if ( keyboard.pressed("right") )  cameraHolder.rotateY( -moveDistance );
   if ( keyboard.pressed("up") )     cameraHolder.rotateX(  moveDistance );
   if ( keyboard.pressed("down") )   cameraHolder.rotateX( -moveDistance );
 
   // Keyboard.pressed - execute while is pressed
   if ( keyboard.pressed(".") )  cameraHolder.rotateZ( -moveDistance );
   if ( keyboard.pressed(",") )  cameraHolder.rotateZ(  moveDistance );

   if ( keyboard.pressed("space") ) cameraHolder.translateZ(-1);
 }

 function showInformation()
{
  // Use this to show information onscreen
  var controls = new InfoBox();
    controls.add("Keyboard Commands");
    controls.addParagraph();
    controls.add("Espaço anda para frente");
    controls.add("Esqueda e Direita - Rotação em X");
    controls.add("Cima e Baixo - Rotação em Y");
    controls.add("< e > / , e . - Rotação em Z");
    controls.show();
}


render();
function render()
{
//   trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  keyboardUpdate();
  renderer.render(scene, camera) // Render scene
}