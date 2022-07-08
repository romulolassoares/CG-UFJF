import * as THREE from  'three';
import Stats from '../../build/jsm/libs/stats.module.js';
import GUI from '../../libs/util/dat.gui.module.js'
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import {TeapotGeometry} from '../../build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        createGroundPlane,
        createLightSphere,        
        onWindowResize, 
        degreesToRadians} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information  var renderer = initRenderer();    // View function in util/utils
var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 42)");

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(25, 20, 45);
  camera.up.set( 0, 1, 0 );

var ambientLight = new THREE.AmbientLight("rgb(100, 100, 100)");
scene.add(ambientLight);

var lightPosition = new THREE.Vector3(25, 18, 40);
  var light = new THREE.SpotLight(0xffffff);
  light.position.copy(lightPosition);
  light.castShadow = true;
  light.penumbra = 0.5;    
scene.add(light);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 15 );
  axesHelper.visible = true;
scene.add( axesHelper );

//-- Scene Objects -----------------------------------------------------------
// Ground
var groundPlane = createGroundPlane(50, 50, 100, 100); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
// scene.add(groundPlane);

// Cylinder
const cylinderGeometry = new THREE.CylinderGeometry( 2, 2, 10, 32,true );
const cylinderMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)",side:THREE.DoubleSide});
const cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
scene.add( cylinder );
cylinder.castShadow = true;
cylinder.position.set(0, 7, 0);

scene.add(cylinder);

// Circle
const circleGeometry = new THREE.CircleGeometry( 2, 32 );
const circleMaterial = new THREE.MeshLambertMaterial({color:"rgb(255,255,255)",side:THREE.DoubleSide});
var circles = [];

for (let i = 0; i < 2; i++) {
   let circle = new THREE.Mesh( circleGeometry, circleMaterial );
   circle.rotateX(degreesToRadians(90));
   const x = i === 0 ? 2 : 12;
   circle.position.set(0.0, x, 0);
   scene.add(circle);
   circles.push(circle);
}

//----------------------------------------------------------------------------
//-- Use TextureLoader to load texture files
var textureLoader = new THREE.TextureLoader();
var wood = textureLoader.load('../../assets/textures/wood.png');
var woodTop = textureLoader.load('../../assets/textures/woodtop.png')

// Apply texture to the 'map' property of the respective materials' objects
cylinder.material.map = wood;

circles.forEach(element => {
   element.material.map = woodTop;
});

render();

function render()
{
  stats.update();
  trackballControls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}
