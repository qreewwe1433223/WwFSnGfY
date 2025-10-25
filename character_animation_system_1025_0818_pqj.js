// 代码生成时间: 2025-10-25 08:18:15
// Import necessary THREE.js modules
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

class CharacterAnimationSystem {

  constructor() {
    this.mixer = null;
    this.clock = new THREE.Clock();
  }

  /**
   * Load a character model with animations and add it to the scene
   * @param {string} url - The URL of the character model file (glb/gltf)
   * @param {THREE.Scene} scene - The scene to add the character to
   * @param {THREE.Camera} camera - The camera to use for rendering
   * @param {THREE.Renderer} renderer - The renderer to use for the scene
   */
  loadCharacter(url, scene, camera, renderer) {
    const loader = new GLTFLoader();
    try {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          scene.add(model);

          // Assuming the character has an animation mixer
          this.mixer = new AnimationMixer(model);

          // Start the animation
          this.playAnimation();
        },
        undefined,
        (error) => {
          console.error('An error occurred while loading the character:', error);
        }
      );
    } catch (error) {
      console.error('There was an error loading the character:', error);
    }
  }

  /**
   * Play the animations on the character
   */
  playAnimation() {
    if (!this.mixer) {
      console.warn('Animation mixer not initialized.');
      return;
    }

    // Assuming there's at least one animation available
    const action = this.mixer.clipAction(this.mixer.getClipAction(0));
    action.play();
  }

  /**
   * Update the animation system, call this on every frame
   */
  update() {
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
  }
}

// Example usage:
// const characterSystem = new CharacterAnimationSystem();
// characterSystem.loadCharacter('path/to/character.glb', scene, camera, renderer);
// function animate() {
//   requestAnimationFrame(animate);
//   characterSystem.update();
//   renderer.render(scene, camera);
// }
// animate();