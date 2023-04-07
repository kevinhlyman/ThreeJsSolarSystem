import * as THREE from 'three';

//Create a texture loader
const textureLoader = new THREE.TextureLoader();

const planetGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const planetMaterial = new THREE.MeshPhongMaterial({
  shininess: 1,
  map: textureLoader.load("../textures/pluto-texture.jpg"),
});
const pluto = new THREE.Mesh(planetGeometry, planetMaterial);
const planetPosition = new THREE.Vector3(10, 0, 0);
pluto.position.copy(planetPosition);

function updatePlutoPosition(time) {
  const orbitRadius = 97;
  const orbitSpeed = 0.11;
  const angle = time * -orbitSpeed; // Angle of rotation around the sun. Make it negative to rotate counter clockwise
  const planetX = Math.cos(angle) * orbitRadius;
  const planetZ = Math.sin(angle) * orbitRadius;
  pluto.position.set(planetX, 0, planetZ); // Update planet position
}

function updatePlutoRotation(time) {
  const rotationSpeed = 0.08;
  pluto.rotation.y += rotationSpeed; // Rotate planet on y-axis
}

export { pluto, updatePlutoPosition, updatePlutoRotation };