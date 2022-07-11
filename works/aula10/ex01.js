import * as THREE 			from  'three';
import {RaytracingRenderer} from  '../../libs/other/raytracingRenderer.js';
import {degreesToRadians}   from "../../libs/util/util.js";

var scene, renderer;

var container = document.createElement( 'div' );
document.body.appendChild( container );

var scene = new THREE.Scene();

// The canvas is in the XY plane.
// Hint: put the camera in the positive side of the Z axis and the
// objects in the negative side
var camera = new THREE.PerspectiveCamera( 60, 12 / 6, 1, 1000 );
camera.position.set(0, 3, 1.5);
camera.position.z = 6;
camera.position.y = 2.5;

// light
var intensity = 0.5;
var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 0, 2.50, 0 );
scene.add( light );

var light = new THREE.PointLight( 0x55aaff, intensity );
light.position.set( -1.00, 1.50, 2.00 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 1.00, 1.50, 2.00 );
scene.add( light );

renderer = new RaytracingRenderer(window.innerWidth, window.innerHeight, 32, camera);
container.appendChild( renderer.domElement );

// materials
var phongMaterialBox = new THREE.MeshLambertMaterial( {
	color: "rgb(255,255,255)",
} );

var phongMaterialBoxBottom = new THREE.MeshLambertMaterial( {
	color: "rgb(180,180,180)",
} );

var phongMaterialBoxLeft = new THREE.MeshLambertMaterial( {
	color: "rgb(200,0,0)",
} );

var phongMaterialBoxRight = new THREE.MeshLambertMaterial( {
	color: "rgb(0,200,0)",
} );

var phongMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(150,190,220)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
	} );

var phongMaterialBrow = new THREE.MeshPhongMaterial( {
   color: "rgb(225,228,20)",
   specular: "rgb(255,255,255)",
   shininess: 1000,
   } );

var phongMaterialRed = new THREE.MeshPhongMaterial( {
   color: "rgb(255,0,0)",
   specular: "rgb(255,255,255)",
   shininess: 1000,
   } );

var mirrorMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
} );
mirrorMaterial.mirror = true;
mirrorMaterial.reflectivity = 1;

var glassMaterialSmooth = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 10000,
} );
glassMaterialSmooth.glass = true;
glassMaterialSmooth.reflectivity = 0.25;
glassMaterialSmooth.refractionRatio = 1.5;

// geometries
var sphereGeometry = new THREE.SphereGeometry( 1, 24, 24 );
var planeGeometry1 = new THREE.BoxGeometry( 12.00, 0.05, 6.00 );
var planeGeometry2 = new THREE.BoxGeometry( 6.00, 0.05, 6.00 );
var backMirrorGeometry = new THREE.BoxGeometry( 4.50, 0.05, 3.00 );
var boxGeometry = new THREE.BoxGeometry( 1.00, 1.00, 1.00 );

const cylindergeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1.0, 80 );
const cylinder1 = new THREE.Mesh( cylindergeometry, phongMaterial );
cylinder1.position.set( 0, 0, -1.80 );
scene.add( cylinder1 );

const cylinder2 = new THREE.Mesh( cylindergeometry, phongMaterial );
cylinder2.position.set( -3.5, 0, -0.9 );
scene.add( cylinder2 );

const cylinder3 = new THREE.Mesh( cylindergeometry, phongMaterial );
cylinder3.position.set( 3.5, 0, -0.9 );
scene.add( cylinder3 );

const spheregeometry = new THREE.SphereGeometry( .6, 32, 16 );
const sphere = new THREE.Mesh( spheregeometry, mirrorMaterial );
sphere.position.set( 0, 1, -1.8 );
scene.add( sphere );

const torusKnotgeometry = new THREE.TorusKnotGeometry( .35, .1, 40, 16 );
const torusKnot = new THREE.Mesh( torusKnotgeometry, phongMaterialBrow );
torusKnot.position.set( -3.5, 1, -0.9 );
scene.add( torusKnot );

const cylindergeometry2 = new THREE.CylinderGeometry( 0.5, 0.2, 1.0, 80 );
const cylinder4 = new THREE.Mesh( cylindergeometry2, phongMaterialRed );
cylinder4.position.set( 3.5, 1, -0.9 );
scene.add( cylinder4 )

// bottom
var plane = new THREE.Mesh( planeGeometry1, phongMaterialBoxBottom );
plane.position.set( 0, -.5, -3.00 );
scene.add( plane );

// top
var plane = new THREE.Mesh( planeGeometry1, phongMaterialBox );
plane.position.set( 0, 5.5, -3.00 );
scene.add( plane );

// back
var plane = new THREE.Mesh( planeGeometry1, phongMaterialBox );
plane.rotation.x = 1.57;
plane.position.set( 0, 2.50, -3.00 );
scene.add( plane );

// left
var plane = new THREE.Mesh( planeGeometry2, phongMaterialBoxLeft );
plane.rotation.z = 1.57;
plane.position.set( -6.00, 2.50, -3.00 )
scene.add( plane );

// right
var plane = new THREE.Mesh( planeGeometry2, phongMaterialBoxRight );
plane.rotation.z = 1.57;
plane.position.set( 6.00, 2.50, -3.00 )
scene.add( plane );

render();

function render()
{
	renderer.render( scene, camera );
}
