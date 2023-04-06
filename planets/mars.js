import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(1.5, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/mars-texture.jpg"),
});
const mars = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
mars.position.copy(planetPosition);

function updateMarsPosition(time) {
  const orbitRadius = 35;
  const orbitSpeed = 1.8;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  mars.position.set(planetX, 0, planetZ); // Update planet position
}

function updateMarsRotation(time) {
  const rotationSpeed = 0.05;
  mars.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { mars, updateMarsPosition, updateMarsRotation };