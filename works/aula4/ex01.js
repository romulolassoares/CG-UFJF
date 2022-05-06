import * as THREE from  'three';
import Stats from '../../build/jsm/libs/stats.module.js';
import GUI from '../../libs/util/dat.gui.module.js'
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera, 
        degreesToRadians, 
        onWindowResize,
        initDefaultBasicLight,
        createGroundPlaneWired} from "../../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(15, 15, 17)); // Init camera in this position
var trackballControls = new TrackballControls( camera, renderer.domElement );
initDefaultBasicLight(scene);

let plane = createGroundPlaneWired(20, 20);
scene.add(plane);

// create a sphere
const geometry = new THREE.SphereGeometry( 1, 32, 16 );
const material = new THREE.MeshNormalMaterial( { color: 0xffff00 } );

const sphere1 = new THREE.Mesh( geometry, material );
sphere1.position.set(-9.0,1.0,-2.0)
scene.add(sphere1);

const sphere2 = new THREE.Mesh( geometry, material );
sphere2.position.set(-9.0,1.0,2.0)
scene.add(sphere2);

// Variables that will be used for linear interpolation
const lerpConfig1 = {
   destination: new THREE.Vector3(9.0, 1.0, -2.0),
   alpha: 0.01,
   move: false
 }

 const lerpConfig2 = {
   destination: new THREE.Vector3(9.0, 1.0, 2.0),
   alpha: 0.02,
   move: false
 }

// Show world axes
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

buildInterface();
render();

function buildInterface()
{
  var controls = new function ()
  {
    this.sphereAnimation1 = function(){
      lerpConfig1.move = true
    };

    this.sphereAnimation2 = function(){
      lerpConfig2.move = true
    };
    this.resetPosition = function(){
      lerpConfig1.move = false;
      lerpConfig2.move = false;
      sphere1.position.set(-9.0,1.0,-2.0)
      sphere2.position.set(-9.0,1.0,2.0)
   };
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'sphereAnimation1',true).name("Esfera 01");
  gui.add(controls, 'sphereAnimation2',true).name("Esfera 02");
  gui.add(controls, 'resetPosition').name("Reset");
}

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();

  if(lerpConfig1.move) sphere1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha);
  if(lerpConfig2.move) sphere2.position.lerp(lerpConfig2.destination, lerpConfig2.alpha);

  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
