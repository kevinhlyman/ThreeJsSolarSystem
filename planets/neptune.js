import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(3, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/neptune-texture.jpg"),
});
const neptune = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
neptune.position.copy(planetPosition);

function updateNeptunePosition(time) {
  const orbitRadius = 77;
  const orbitSpeed = 0.14;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  neptune.position.set(planetX, 0, planetZ); // Update planet position
}

function updateNeptuneRotation(time) {
  const rotationSpeed = 0.06;
  neptune.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { neptune, updateNeptunePosition, updateNeptuneRotation };