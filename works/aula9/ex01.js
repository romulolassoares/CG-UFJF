import * as THREE from  'three';
import Stats from '../../build/jsm/libs/stats.module.js';
import GUI from '../../libs/util/dat.gui.module.js'
import {OrbitControls} from '../../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        createLightSphere,        
        onWindowResize, 
        degreesToRadians} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information  var renderer = initRenderer();    // View function in util/utils
var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 42)");

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(2.5, 2.0, 4.5);
  camera.up.set( 0, 1, 0 );

  var controls = new OrbitControls(camera, renderer.domElement);

var ambientLight = new THREE.AmbientLight("rgb(100, 100, 100)");
scene.add(ambientLight);

var lightPosition = new THREE.Vector3(2.5, 1.8, 0.0);
  var light = new THREE.SpotLight(0xffffff);
  light.position.copy(lightPosition);
  light.castShadow = true;
  light.penumbra = 0.5;    
  scene.add(light);
  
  var lightSphere = createLightSphere(scene, 0.1, 10, 10, lightPosition);  
  
  var textureLoader = new THREE.TextureLoader();
  var stone  = textureLoader.load('../../assets/textures//marble.png');
  var sun = textureLoader.load('../../assets/textures/sun.jpg');
  
// Set angles of rotation
var angle = 0;
var speed = 0.01;
var animationOn = false; // control if animation is on or of

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 1.5 );
  axesHelper.visible = false;
scene.add( axesHelper );

//-- Scene Objects -----------------------------------------------------------
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide});
const plane = new THREE.Mesh( geometry, material );
plane.position.set(0,0,0);
plane.material.map = stone;
plane.rotateX(degreesToRadians(90));
scene.add( plane );

const plane2 = new THREE.Mesh( geometry, material );
plane2.position.set(0,0.5,0.5);
scene.add(plane2);

const plane3 = new THREE.Mesh( geometry, material );
plane3.position.set(0,0.5,-0.5);
scene.add(plane3);

const plane4 = new THREE.Mesh( geometry, material );
plane4.position.set(0.5,0.5,0);
plane4.rotateY(degreesToRadians(90));
scene.add(plane4);

const plane5 = new THREE.Mesh( geometry, material );
plane5.position.set(-0.5,0.5,0);
plane5.rotateY(degreesToRadians(90));
scene.add(plane5);
//----------------------------------------------------------------------------
//-- Use TextureLoader to load texture files

// Apply texture to the 'map' property of the respective materials' objects
lightSphere.material.map = sun;

buildInterface();
render();

function rotateLight()
{
  // Set angle's animation speed
  if(animationOn)
  {
    // More info:
    light.matrixAutoUpdate = false;
    lightSphere.matrixAutoUpdate = false;      

    angle+=speed;

    var mat4 = new THREE.Matrix4();

    // Will execute T1 and then R1
    light.matrix.identity();  // reset matrix
    light.matrix.multiply(mat4.makeRotationY(angle)); // R1
    light.matrix.multiply(mat4.makeTranslation(lightPosition.x, lightPosition.y, lightPosition.z)); // T1

    lightSphere.matrix.copy(light.matrix);
  }
}

function buildInterface()
{
  //------------------------------------------------------------
  // Interface
  var controls = new function ()
  {
    this.viewAxes = false;
    this.speed = speed;
    this.animation = animationOn;

    this.onViewAxes = function(){
      axesHelper.visible = this.viewAxes;
    };
    this.onEnableAnimation = function(){
      animationOn = this.animation;
    };
    this.onUpdateSpeed = function(){
      speed = this.speed;
    };
  };

  var gui = new GUI();
  gui.add(controls, 'animation', true)
    .name("Animation")
    .onChange(function(e) { controls.onEnableAnimation() });
  gui.add(controls, 'speed', 0.01, 0.05)
    .name("Light Speed")
    .onChange(function(e) { controls.onUpdateSpeed() });
  gui.add(controls, 'viewAxes', false)
    .name("View Axes")
    .onChange(function(e) { controls.onViewAxes() });
}

function render()
{
  stats.update();
  controls.update();
  rotateLight();
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}