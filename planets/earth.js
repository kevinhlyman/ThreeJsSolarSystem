//Set up an Earth planet
import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const earthGeometry = new THREE.SphereGeometry(2,32,32);
const earthMaterial = new  THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("textures/earth-texture.jpg"),
  bumpMap: textureLoader.load('textures/earth-bump-map.jpg'),
  bumpScale: 1.5
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const cloudGeometry = new THREE.SphereGeometry(.63,32,32);

const cloudMaterial = new THREE.MeshPhongMaterial({
   map: textureLoader.load('textures/earthCloud.png'),
})
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

earth.add(cloudMesh);
// TODO fix cloud mesh and add it to earth mesh. Earth.add is causing errors


const earthPosition = new THREE.Vector3(30, 0, 0);
earth.position.copy(earthPosition);

function updateEarthPosition(time) {
  const orbitRadius = 30;
  const orbitSpeed = 1;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  earth.position.set(planetX, 0, planetZ); // Update planet position
}

function updateEarthRotation(time) {
  const rotationSpeed = 0.01;
  earth.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { earth, updateEarthPosition, updateEarthRotation };