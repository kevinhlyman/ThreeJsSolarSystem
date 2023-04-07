import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(5, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/jupiter-texture.jpg"),
});
const jupiter = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
jupiter.position.copy(planetPosition);

function updateJupiterPosition(time) {
  const orbitRadius = 47;
  const orbitSpeed = 0.3;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  jupiter.position.set(planetX, 0, planetZ); // Update planet position
}

function updateJupiterRotation(time) {
  const rotationSpeed = 0.02;
  jupiter.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { jupiter, updateJupiterPosition, updateJupiterRotation };