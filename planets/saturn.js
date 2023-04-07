import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(4, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/saturn-texture.jpg"),
});
const saturn = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
saturn.position.copy(planetPosition);

function updateSaturnPosition(time) {
  const orbitRadius = 57;
  const orbitSpeed = 0.24;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  saturn.position.set(planetX, 0, planetZ); // Update planet position
}

function updateSaturnRotation(time) {
  const rotationSpeed = 0.015;
  saturn.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { saturn, updateSaturnPosition, updateSaturnRotation };