<template>
  <div ref="drawingContainer" class="drawing-container">
    <div class="shape-wrapper">
      <img ref="pencil1" class="pencil" src="/pencil.png" alt="Pencil" />
      <svg class="shape" viewBox="0 0 300 300"> <!-- Define viewBox -->
        <!-- Dynamic path -->
        <path
          ref="path1"
          class="drawing-path"
          :d="pathData"
          fill="none"
          stroke="#cccccc"
          stroke-width="1"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const path1 = ref<SVGPathElement | null>(null);
const pencil1 = ref<HTMLElement | null>(null);
const drawingContainer = ref<HTMLElement | null>(null);

// Example path data, can be replaced dynamically
const pathData = ref("M40.1 14.6c-1-.1-2.3-2.2-1.2-3.9.7-1.1 1.4-2.1.3-3.9-.8-1.4-1.7-1.2-2.7-.9-1.6.5-2.2-1.8-2.2-3.7 0-1-.5-1.9-2.3-1.9-1 0-1.5.8-2 1.7-.8 1.3-3.6 1.7-4.1.3-.5-1.4-3-1.5-4.7-.4-1.6 1.1-3.5.7-3.6.4-.2-.2-.3-.4-.4-.4-.1 0-.5-.9-1.5-1.2-.5-.2-1.1-.1-1.9.2-3 1.2-1.7 4-2.7 6.1-1.4 2.7-2.9-.3-5.5.4-1.9.5-3.3 2.8-3.3 5.2.1 2.2 3 4.7 2.7 6.3-.3 1.3-3.4-.6-4.6 3.2-.4 1.2-.2 2.3.1 3.7.6 2.9 2.1 1.7 3.3 2.9 1.4 1.5 1.6 3.1.2 4.9-2.8 3.9.5 6.7 4.3 6.1 2.1-.3 5.5-1.1 4.9.4-.3 1-1.1 2-.6 2.7 2.7 3 4.8-2 7.5-1.8h.3c.1 0 .4.2.7.4.2.2.5.3.6.4.1.1.4 1.1 1.3 1.6.5.3 1.1.5 1.8.5 1.4 0 3.5-.6 4.4-2 .3-.4.3-1.1.3-1.7.1-1 2.1-.2 4.2.1 2.9.4 5.6-1.4 4.3-5.6-.1-.3-.2-.5-.4-.7-.3-.4-.4-1 0-1.4.2-.2.5-.3.9-.2 3.9.8 6.7-.5 5.5-4-.6-1.8-4.5-2.6-1.5-3.6 1.1-.4 2.3-.8 3-2.3 1.7-3.4.5-8.6-3.8-8-.3.1-.9.2-1.6.1Z");

// Fixed container size (adjust this as needed)
const containerWidth = 300;
const containerHeight = 300;

const animateDrawing = (path: SVGPathElement, pencil: HTMLElement, delay: number) => {
  const pathLength = path.getTotalLength();

  gsap.set(path, { strokeDashoffset: pathLength, strokeDasharray: pathLength });
  gsap.set(pencil, { opacity: 0, rotation: 35, transformOrigin: "50% 100%" });

  return gsap.timeline({ delay })
    .to(pencil, { opacity: 1, duration: 0.1 })
    .to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
    })
    .to(
      pencil,
      {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 1],
        },
        duration: 2,
        ease: "power1.inOut",
      },
      "<"
    )
    .to(
      pencil,
      {
        scale: 1.25,
        y: -100,
        opacity: 0,
        duration: 0.25,
        ease: "power1.out",
      }
    )
    .to(path, {
      fill: "#cccccc",
      duration: 2,
      ease: "power1.inOut",
    });
};

onMounted(() => {
  nextTick(() => {
    if (path1.value && drawingContainer.value) {
      // Calculate the bounding box of the path
      const bbox = path1.value.getBBox();

      // Calculate scaling factor to fit the container size
      const scaleX = containerWidth / bbox.width;
      const scaleY = containerHeight / bbox.height;
      const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

      // Calculate translation values to center the path
      const offsetX = (containerWidth - bbox.width * scale) / 2 - bbox.x * scale;
      const offsetY = (containerHeight - bbox.height * scale) / 2 - bbox.y * scale;

      // Apply scaling and translation to the path
      gsap.set(path1.value, {
        scaleX: scale,
        scaleY: scale,
        x: offsetX,
        y: offsetY,
      });

      // Dynamically adjust the drawing container size based on the fixed dimensions
      drawingContainer.value.style.width = `${containerWidth}px`;
      drawingContainer.value.style.height = `${containerHeight}px`;

      const timeline = gsap.timeline();
      timeline.add(animateDrawing(path1.value, pencil1.value, 0));
    }
  });
});
</script>

<style lang="scss" scoped>
.drawing-container {
  position: relative;
  width: 300px;
  height: 300px;
  overflow: visible;
}

.shape-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;

  svg {
    overflow: visible;
  }
}

.pencil {
  position: absolute;
  height: 50px;
}

.shape {
  width: 100%;
  height: 100%;
  stroke: #959595;
}
</style>
