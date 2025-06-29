<template>
  <div class="animated-arrows" ref="containerRef">
    <span
      v-for="(arrow, index) in arrows"
      :key="index"
      class="arrow"
      :style="{ left: `${arrow.x}%`, top: `${arrow.y}%` }"
    >
      <v-icon :style="{ fontSize: '200px' }" icon="mdi-arrow-down-thick" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue';
import { gsap } from 'gsap';

const props = defineProps({
  arrows: {
    type: Array as () => Array<{ x: number; y: number }>,
    required: true
  }
});

const containerRef = ref(null);

function animateArrows() {
  if (!containerRef.value) return;

  const arrowElements = containerRef.value.querySelectorAll('.arrow');
  arrowElements.forEach((arrow: Element) => {
    const randomX = (Math.random() - 1) * 20;
    const randomY = (Math.random() - 2) * 20;

    gsap.to(arrow, {
      x: `+=${randomX}`,
      y: `+=${randomY}`,
      repeat: -1,
      yoyo: true,
      duration: Math.random() * 5 + 2,
      ease: 'power1.inOut'
    });
  });
}

onMounted(async () => {
  await nextTick();
  animateArrows();
});
</script>

<style scoped>
.animated-arrows {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 400px;
  overflow: visible;
  animation: drop 3s ease-in-out forwards;
}

.arrow {
  position: absolute;
  z-index: 1;
  font-size: 100px;
  color: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.v-theme--dark .arrow {
  color: rgba(0, 0, 0, 0.1);
}

.v-theme--light .arrow {
  color: rgba(0, 0, 0, 0.03);
}
</style>
