// Define scene and camera
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Import Planets
import { mercury, updateMercuryPosition, updateMercuryRotation } from '/planets/mercury.js';
import { venus, updateVenusPosition, updateVenusRotation } from '/planets/venus.js';
import { earth, updateEarthRotation, updateEarthPosition } from '/planets/earth.js';
import { mars, updateMarsPosition, updateMarsRotation } from '/planets/mars.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

//Create a background
const bgGeometry = new THREE.SphereGeometry(200,32,32);
const bgMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("textures/background.jpg"),
  side: THREE.BackSide, //Texture the inside of the sphere

});
const bg = new THREE.Mesh(bgGeometry, bgMaterial);
scene.add(bg);

// Create sun sphere
const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  emissiveMap: textureLoader.load("textures/sun-texture.png"),
  emissive: 0xffffff,
  emissiveIntensity: 2,
  metalness: 1,
});
const sunSphere = new THREE.Mesh(sunGeometry, sunMaterial);

// Add sun sphere to scene
scene.add(sunSphere);
//Add in "mercury"
scene.add(mercury);
//Add in "venus"
scene.add(venus);
//Add in "earth"
scene.add(earth);
//Add in "mars"
scene.add(mars);

// //Create a second planet sphere
// const planetGeometry2 = new THREE.SphereGeometry(1.5, 32, 32);
// const planetMaterial2 = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
//   shininess: 1,
//   map: textureLoader.load("textures/grass-texture.jpg"),
// });
// const planetSphere2 = new THREE.Mesh(planetGeometry2, planetMaterial2);
// //Set planet2's initial position
// const planetPosition2 = new THREE.Vector3(10, 0, 0);
// planetSphere2.position.copy(planetPosition2);
// scene.add(planetSphere2);

// // Create moon sphere
// const moonGeometry = new THREE.SphereGeometry(0.5, 32, 32);
// const moonMaterial = new THREE.MeshPhongMaterial({
//   color: 0xffffff,
//   shininess: 1,
//   map: textureLoader.load("textures/moon-texture.jpg"),
// });
// const moonSphere = new THREE.Mesh(moonGeometry, moonMaterial);
// // Set moon's initial position
// const moonPosition = new THREE.Vector3(0, 0, 0);
// moonSphere.position.copy(moonPosition);
// // Add moon sphere to planetSphere2
// planetSphere2.add(moonSphere);

// Create ambient light to provide overall lighting
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
scene.add(ambientLight);

// Create directional light to simulate the sun's light
//const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
//sunLight.position.set(0, 0, -2);
//This PointLight is more better for sun light. It does shadows on the planets
const sunLight = new THREE.PointLight(0xffffff, 0.6);
scene.add(sunLight);


// Create renderer and render the scene
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Append the renderer to the HTML document
const appElement = document.getElementById('app');
appElement.appendChild(renderer.domElement);

//Add in OrbitControls for amera, not to be confused with planet orbit controlling
const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Resize renderer and update camera aspect ratio when window is resized
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.update();
}
window.addEventListener('resize', onWindowResize);

//Where should the camera look?
const theSunArrPosition = 0;
let focusPoint = sessionStorage.getItem('space-project') ? sessionStorage.getItem('space-project') : 0;
let spheres = [sunSphere,mercury,venus,earth,mars];//should move celestial bodies to their own files and create them from here and put them in this array

//For when the user wants to drive around the solar system
let enableSelfDrive = false;
const selfDriveButton = document.getElementById("selfDrive");
selfDriveButton.addEventListener('click', () => {
  enableSelfDrive = !enableSelfDrive;
});

//focusing the camera on specific planets
const focusButton = document.getElementById("toggleFocus");
focusButton.addEventListener('click', () => {
  //This is going to be yucky to start with
  let tempFocusPoint = focusPoint + 1;
  if (tempFocusPoint >= spheres.length) {tempFocusPoint = theSunArrPosition;}
  focusPoint = tempFocusPoint;

  // Persist focus point across refresh for working on specific planets
  sessionStorage.setItem('space-project', focusPoint);
});

// Animate the scene
function animate() {
  requestAnimationFrame(animate);

  // Update planet's position based on time
  const time = Date.now() * 0.001; // Convert time to seconds

  //Update the Sun
  sunSphere.rotation.y += 0.01;

  //Update Mercury
  updateMercuryPosition(time);
  updateMercuryRotation(time);

  //Update Venus
  updateVenusPosition(time);
  updateVenusRotation(time);

  // Update Earth
  updateEarthPosition(time);
  updateEarthRotation(time);

  // Update Mars
  updateMarsPosition(time);
  updateMarsRotation(time);
  
  // //Update planet 2's position
  // const orbitRadius2 = 17;
  // const orbitSpeed2 = 0.9;
  // const siderealSpeed2 = -2;
  // const angle2 = time * orbitSpeed2;
  // const planetX2 = Math.cos(angle2) * orbitRadius2;
  // const planetZ2 = Math.sin(angle2) * orbitRadius2;
  // planetSphere2.position.set(planetX2, 0, planetZ2);
  // const planet2Angle = siderealSpeed2 * time;
  // planetSphere2.rotation.y = planet2Angle;
  
  // // Rotate moon around planetSphere2
  // const moonOrbitRadius = 3;
  // const moonOrbitSpeed = -4;
  // const moonAngle = time * moonOrbitSpeed;
  // const moonX = Math.cos(moonAngle) * moonOrbitRadius;
  // const moonZ = Math.sin(moonAngle) * moonOrbitRadius;
  // moonSphere.position.set(moonX, 0, moonZ);

  if(enableSelfDrive)
  {
    controls.update();
  }else{
    //Rotate the camera around a Celestial body
    if (focusPoint === theSunArrPosition)
    {
      const cameraRadius = 50;
      const sunAngle = time * 0.1;
      //rotate camera in the opposite direction as the planets
      const cameraX = -1 * Math.cos(sunAngle) * cameraRadius;
      const cameraZ = Math.sin(sunAngle) * cameraRadius;
      camera.position.set(cameraX, 20, cameraZ);
      //Look at the sun, instead of manually rotating the camera to look down
      camera.lookAt(sunSphere.position);
      
    }else{
      const cameraRadius = 20;
      const cameraX = spheres[focusPoint].position.x + cameraRadius;
      const cameraZ = spheres[focusPoint].position.z + cameraRadius;
      camera.position.set(cameraX, 10, cameraZ);
      camera.lookAt(spheres[focusPoint].position);
    }
  }
  
  // Render the scene
  renderer.render(scene, camera);
}
animate();
