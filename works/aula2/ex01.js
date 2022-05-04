import * as THREE from  'three';
import Stats from       '../../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

var material = new THREE.MeshLambertMaterial({ color:"rgb(200,0,0)"});

// Tampo da mesa
// create a cube 1
var tampoGeometry = new THREE.BoxGeometry(1, 1, 1);
var tampo = new THREE.Mesh(tampoGeometry, material);
// position the cube
tampo.position.set(0.0, 0.0, 0.0);
// add the cube to the scene
scene.add(tampo);

// Pés da mesa
var arrayPe = [];
for(let i=0; i<=3; i++) {
  const geometry = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 );
  arrayPe[i] = new THREE.Mesh(geometry, material);
  arrayPe[i].position.set(0.0, 0.0, 0.0);
  scene.add(arrayPe[i]);

  arrayPe[i].translateY(3/2)
}

// Posiciona os elementos
tampo.translateY(3)
tampo.scale.set(11, 0.3, 6)

arrayPe[0].translateX(-5)
arrayPe[0].translateZ(-2)

arrayPe[1].translateX(-5)
arrayPe[1].translateZ(2)

arrayPe[2].translateX(5)
arrayPe[2].translateZ(-2)

arrayPe[3].translateX(5)
arrayPe[3].translateZ(2)



// Use this to show information onscreen
var controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}