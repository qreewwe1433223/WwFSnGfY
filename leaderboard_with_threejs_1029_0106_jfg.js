// 代码生成时间: 2025-10-29 01:06:37
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// LeaderboardModel class for handling leaderboard data
class LeaderboardModel {
  constructor() {
    this.scores = [];
  }

  // Method to add a new score
  addScore(name, score) {
    if (typeof name !== 'string' || typeof score !== 'number') {
      throw new Error('Invalid input types for addScore.');
    }
    this.scores.push({ name, score });
  }

  // Method to get sorted scores in descending order
  getSortedScores() {
    return this.scores.sort((a, b) => b.score - a.score);
  }
}

// LeaderboardView class for rendering the leaderboard
class LeaderboardView {
  constructor(scene) {
    this.scene = scene;
    this.fontLoader = new THREE.FontLoader();
  }

  // Method to load and parse font data
  loadFont(url) {
    return new Promise((resolve, reject) => {
      this.fontLoader.load(url, resolve, undefined, reject);
    });
  }

  // Method to create a text mesh for each score
  createTextMesh(text, size, height, color) {
    return new Promise((resolve) => {
      this.loadFont('fonts/helvetiker_regular.typeface.json').then((font) => {
        const geometry = new THREE.TextGeometry(text, {
          font,
          size,
          height,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: 0.5,
          bevelOffset: 0,
          bevelSegments: 5
        });
        const material = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        resolve(mesh);
      }, (error) => {
        throw new Error('Failed to load font: ' + error);
      });
    });
  }

  // Method to render the leaderboard in 3D space
  renderLeaderboard(model) {
    const scores = model.getSortedScores();
    let positionY = -10;
    scores.forEach((score) => {
      this.createTextMesh(score.name + ': ' + score.score, 5, 2, 0xffffff).then((mesh) => {
        mesh.position.y = positionY;
        this.scene.add(mesh);
        positionY += 2;
      }, (error) => {
        console.error('Error creating text mesh: ', error);
      });
    });
  }
}

// Main function to set up the scene and controls
function main() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;

  const leaderboardModel = new LeaderboardModel();
  const leaderboardView = new LeaderboardView(scene);

  // Sample data
  leaderboardModel.addScore('Player1', 100);
  leaderboardModel.addScore('Player2', 200);
  leaderboardModel.addScore('Player3', 150);

  leaderboardView.renderLeaderboard(leaderboardModel);

  camera.position.z = 5;

  // Animation loop
  const animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();
}

// Call the main function to start the app
main();