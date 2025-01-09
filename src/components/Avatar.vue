<template>
  <div ref="container" class="avatar-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// References to DOM elements
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (!container.value) return;

  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000); // FOV controls zoom level
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(directionalLight);

  // Load the GLB model
  const loader = new GLTFLoader();
  let mixer: THREE.AnimationMixer | null = null;

  loader.load(
    '/model8.glb', // Update with your correct path
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Calculate the bounding box of the model
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);

      // Scale the model to fill the canvas
      const scaleFactor = 2 / Math.max(size.x, size.y, size.z); // Adjust this multiplier for zoom
      model.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // Center the model
      model.position.sub(center); // Move model center to origin
      model.position.y += size.y * scaleFactor / 2; // Slightly raise it

      // Play animations if present
      mixer = new THREE.AnimationMixer(model);
      gltf.animations.forEach((clip) => {
        mixer!.clipAction(clip).play();
      });

      // Adjust camera position to tightly frame the model
      const distance = Math.max(size.x, size.y, size.z) * scaleFactor * 1.2; // Move closer for tighter framing
      camera.position.set(0, size.y * scaleFactor / 2, distance);
      camera.lookAt(0, size.y * scaleFactor / 2, 0);

      // Adjust aspect ratio and FOV
      camera.aspect = container.value!.clientWidth / container.value!.clientHeight;
      camera.updateProjectionMatrix();
    },
    undefined,
    (error) => {
      console.error('Error loading GLB model:', error);
    }
  );

  // Resize handling
  window.addEventListener('resize', () => {
    if (!container.value) return;
    renderer.setSize(container.value.clientWidth, container.value.clientHeight);
    camera.aspect = container.value.clientWidth / container.value.clientHeight;
    camera.updateProjectionMatrix();
  });

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);

    // Update animation mixer if available
    if (mixer) {
      mixer.update(0.01);
    }

    renderer.render(scene, camera);
  };
  animate();
});
</script>

<style scoped>
.avatar-container {
  width: 600px; /* Adjust based on parent layout */
  height: 600px; /* Example fixed height for a column */
  background-color: transparent; /* No background */
  overflow: hidden; /* Ensures the model doesn't spill out of bounds */
}
</style>
