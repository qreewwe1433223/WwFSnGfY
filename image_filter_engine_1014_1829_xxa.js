// 代码生成时间: 2025-10-14 18:29:42
// Import the necessary modules from THREEJS
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Function to create a new scene
function createScene() {
    const scene = new THREE.Scene();
    // Add a grid helper for better visualization
    const gridHelper = new THREE.GridHelper(50, 10);
    gridHelper.position.set(0, -2, 0);
    scene.add(gridHelper);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    return scene;
}

// Function to create a new camera
function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 20);

    return camera;
}

// Function to create a new renderer
function createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    return renderer;
}

// Function to handle window resize events
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Function to load and apply an image filter
function applyImageFilter(image, filter) {
    if (!image) {
        console.error('No image provided');
        return;
    }

    if (!filter) {
        console.error('No filter provided');
        return;
    }

    // Create a new texture from the image
    const texture = new THREE.Texture(image);
    texture.needsUpdate = true;

    // Create a new material with the texture and apply the filter
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(10, 10);
    const plane = new THREE.Mesh(geometry, material);

    // Apply the filter to the material
    plane.material[filter] = true;

    // Add the plane to the scene
    scene.add(plane);
}

// Initialize the scene, camera, and renderer
const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

// Create orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Listen for window resize events
window.addEventListener('resize', onWindowResize, false);

// Main render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Start the render loop
animate();
