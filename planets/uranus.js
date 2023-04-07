import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(3.8, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/uranus-texture.jpg"),
});
const uranus = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
uranus.position.copy(planetPosition);

function updateUranusPosition(time) {
  const orbitRadius = 67;
  const orbitSpeed = 0.18;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  uranus.position.set(planetX, 0, planetZ); // Update planet position
}

function updateUranusRotation(time) {
  const rotationSpeed = 0.045;
  uranus.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { uranus, updateUranusPosition, updateUranusRotation };