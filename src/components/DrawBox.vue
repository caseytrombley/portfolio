<template>
  <div class="drawing-container" :style="{ width: size[0] + 'px', height: size[1] + 'px' }">
    <img ref="pencil" class="pencil" src="/pencil.png" alt="Pencil" />
    <svg
      class="box"
      :viewBox="`0 0 ${size[0]} ${size[1]}`"
      xmlns="http://www.w3.org/2000/svg"
      :width="size[0]"
      :height="size[1]"
    >
      <path
        ref="path"
        class="drawing-path"
        :d="`M20 20 H${size[0] - 20} V${size[1] - 20} H20 Z`"
        fill="none"
        stroke="#cccccc"
        stroke-width="2"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

defineProps({
  size: {
    type: Array as () => [number, number],
    required: true,
  },
});

// Refs for the path and pencil
const path = ref<SVGPathElement | null>(null);
const pencil = ref<HTMLElement | null>(null);

onMounted(() => {
  if (path.value && pencil.value) {
    // Get the total length of the path
    const pathLength = path.value.getTotalLength();

    // Set up initial states
    gsap.set(path.value, { strokeDashoffset: pathLength, strokeDasharray: pathLength });
    gsap.set(pencil.value, { rotation: 35, transformOrigin: "50% 100%" });

    // Animate the drawing
    gsap.timeline()
      .to(path.value, {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power1.inOut",
      })
      .to(
        pencil.value,
        {
          motionPath: {
            path: path.value,
            align: path.value,
            alignOrigin: [0.5, 1],
          },
          duration: 2,
          ease: "power1.inOut",
        },
        "<"
      )
      .to(
        pencil.value,
        {
          scale: 1.25,
          x: 50,
          y: -100,
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        }
      );
  }
});
</script>

<style lang="scss" scoped>
.drawing-container {
  position: relative;
  display: inline-block;
}

.pencil {
  position: absolute;
  height: 50px;
}

.box {
  stroke: #cccccc;
}
</style>
