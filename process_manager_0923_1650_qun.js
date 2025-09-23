// 代码生成时间: 2025-09-23 16:50:28
// Import necessary Three.js modules
import * as THREE from 'three';
import { GUI } from 'dat.gui';

// Global variables
let scene, camera, renderer, gui;
let processObjects = [];

// Initialize the scene
function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Create the renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Initialize the GUI
  gui = new GUI();

  // Add an example process object
  addProcessObject();
}

// Add a process object to the scene
function addProcessObject() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const processObject = new THREE.Mesh(geometry, material);
  processObject.name = `Process ${processObjects.length + 1}`;
  scene.add(processObject);
  processObjects.push(processObject);

  // Add a GUI control for the new process object
  gui.add(processObject, 'name').listen();

  // Update the scene
  animate();
}

// Animate the scene
function animate() {
  requestAnimationFrame(animate);

  // Update process objects
  processObjects.forEach((obj, index) => {
    obj.rotation.x += 0.01;
    obj.rotation.y += 0.01;
  });

  // Render the scene
  renderer.render(scene, camera);
}

// Handle window resizing
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  animate();
}

// Main entry point of the program
function main() {
  try {
    init();
    window.addEventListener('resize', onWindowResize, false);
  } catch (error) {
    console.error('Error initializing the process manager:', error);
  }
}

// Run the program
main();