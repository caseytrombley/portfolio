// HomeView.vue
<template>
  <div class="home-view">
    <canvas ref="canvas" class="three-canvas"></canvas>
    <div class="content">
      <h1>Welcome to My Portfolio</h1>
      <p>Explore my web development projects and creative designs.</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

const canvas = ref<HTMLCanvasElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let animationFrameId: number;
let cube: THREE.Mesh;

onMounted(() => {
  // Scene setup
  scene = new THREE.Scene();

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ canvas: canvas.value!, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Add cube
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Animation loop
  const animate = () => {
    animationFrameId = requestAnimationFrame(animate);

    // Rotate cube
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  };

  animate();

  // Handle resizing
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);
    renderer.dispose();
    scene.clear();
  });
});
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.three-canvas {
  display: block;
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  font-family: 'Arial', sans-serif;
}

h1 {
  font-size: 3rem;
  margin: 0;
}

p {
  font-size: 1.25rem;
}

/* Dark Theme */
.v-theme--dark {
  .intro {
    background-color: rgba(var(--v-theme-secondary), 0.3);
    border-bottom: 2rem solid rgba(var(--v-theme-secondary), 0.05);
  }
}

/* Light Theme */
.v-theme--light {
  .intro {
    background-color: #ffe0b0;
    border-bottom: 2rem solid rgba(255, 235, 182, 0.05);
    &::before {
      background-color: rgba(255,255,255, 0.6);
    }
  }
}
</style>

