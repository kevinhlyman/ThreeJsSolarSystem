import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(1, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/mercury-texture.jpg"),
});
const mercury = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
mercury.position.copy(planetPosition);

function updateMercuryPosition(time) {
  const orbitRadius = 12;
  const orbitSpeed = 1.4;
  const angle = time * orbitSpeed; // Angle of rotation around the sun
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  mercury.position.set(planetX, 0, planetZ); // Update planet position
}

function updateMercuryRotation(time) {
  const rotationSpeed = 0.02;
  mercury.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { mercury, updateMercuryPosition, updateMercuryRotation };