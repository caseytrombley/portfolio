<template>
  <div class="drawing-container">
    <!-- First Box -->
    <div class="box-wrapper box-1">
      <img ref="pencil1" class="pencil" src="/pencil.png" alt="Pencil" />
      <svg class="box">
        <path
          ref="path1"
          class="drawing-path"
          d="M20 20 H280 V280 H20 Z"
          fill="none"
          stroke="#cccccc"
          stroke-width="2"
        />
      </svg>
    </div>

    <!-- Second Box (nested inside first box) -->
    <div class="box-wrapper box-2">
      <img ref="pencil2" class="pencil" src="/pencil.png" alt="Pencil" />
      <svg class="box">
        <path
          ref="path2"
          class="drawing-path"
          d="M10 10 H140 V140 H10 Z"
          fill="none"
          stroke="#cccccc"
          stroke-width="2"
        />
      </svg>
    </div>

    <!-- Third Box (nested inside first box) -->
    <div class="box-wrapper box-3">
      <img ref="pencil3" class="pencil" src="/pencil.png" alt="Pencil" />
      <svg class="box">
        <path
          ref="path3"
          class="drawing-path"
          d="M10 10 H140 V140 H10 Z"
          fill="none"
          stroke="#cccccc"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import MotionPathPlugin from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

// Refs for all paths and pencils
const path1 = ref<SVGPathElement | null>(null);
const pencil1 = ref<HTMLElement | null>(null);
const path2 = ref<SVGPathElement | null>(null);
const pencil2 = ref<HTMLElement | null>(null);
const path3 = ref<SVGPathElement | null>(null);
const pencil3 = ref<HTMLElement | null>(null);

onMounted(() => {
  const animateDrawing = (path: SVGPathElement, pencil: HTMLElement, delay: number) => {
    const pathLength = path.getTotalLength();

    // Set initial state for path and pencil
    gsap.set(path, { strokeDashoffset: pathLength, strokeDasharray: pathLength });
    gsap.set(pencil, { y: -40, opacity: 0, rotation: 35, transformOrigin: "50% 100%" });

    return gsap.timeline({ delay })
      .to(pencil, { opacity: 1, duration: 0.1 }) // Make pencil visible
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
          x: 50,
          y: -100,
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
        }
      );
  };

  if (path1.value && pencil1.value && path2.value && pencil2.value && path3.value && pencil3.value) {
    const timeline = gsap.timeline();
    timeline.add(animateDrawing(path1.value, pencil1.value, 0));
    timeline.add(animateDrawing(path2.value, pencil2.value, 0), ">"); // Start after previous ends
    timeline.add(animateDrawing(path3.value, pencil3.value, 0), ">"); // Start after the second ends
  }
});
</script>

<style lang="scss" scoped>
.drawing-container {
  position: relative;
  width: 300px;
  height: 300px;
  //border: 1px solid #ccc;
}

.box-wrapper {
  position: absolute;

  &.box-1 {
    width: 300px;
    height: 300px;
  }

  &.box-2 {
    width: 150px;
    height: 150px;
    top: 50px;
    left: 50px;
  }

  &.box-3 {
    width: 150px;
    height: 150px;
    bottom: 50px;
    right: 50px;
  }
}

.pencil {
  position: absolute;
  height: 50px;
}

.box {
  width: 100%;
  height: 100%;
  stroke: #959595;
}
</style>
