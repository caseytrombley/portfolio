<template>
  <div class="wavy-line" ref="wavyLine">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 100"
      preserveAspectRatio="none"
    >
      <path
        d="M0 50 Q 50 10, 100 50 T 200 50 T 300 50 T 400 50 T 500 50"
        fill="none"
      />
    </svg>

  </div>
  <div class="static-lines" ref="staticLines"></div>

<!--  <div class="static-background" ref="staticBackground"></div>-->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Intermittent flicker and noise animations
const staticBackground = ref<HTMLElement | null>(null);
const staticLines = ref<HTMLElement | null>(null);
const wavyLine = ref<HTMLElement | null>(null);

const startWave = () => {
  const animateWave = () => {
    if (wavyLine.value) {
      wavyLine.value.classList.add("active");
      setTimeout(() => {
        wavyLine.value?.classList.remove("active");
      }, 500 + Math.random() * 1000);
    }

    const delay = 5000 + Math.random() * 6000;
    setTimeout(animateWave, delay);
  };

  animateWave();
};


const startStaticAnimation = () => {
  const animateStatic = () => {
    if (staticBackground.value) {
      staticBackground.value.classList.add("active");
      setTimeout(() => {
        staticBackground.value?.classList.remove("active");
      }, 500 + Math.random() * 1000);
    }

    const delay = 5000 + Math.random() * 6000;
    setTimeout(animateStatic, delay);
  };

  animateStatic();
};

const startLineAnimation = () => {
  const animateLines = () => {
    if (staticLines.value) {
      // Random starting position near the top
      const randomStart = Math.random() * 50; // 0 to 50px
      staticLines.value.style.setProperty("--start-position", `${randomStart}px`);
      staticLines.value.classList.add("active");

      setTimeout(() => {
        staticLines.value?.classList.remove("active");
      }, 1000); // Match animation duration
    }

    const delay = 6000 + Math.random() * 7000; // Delay between animations
    setTimeout(animateLines, delay);
  };

  animateLines();
};

onMounted(() => {
  startWave();
  startStaticAnimation();
  startLineAnimation();
});
</script>

<style lang="scss">

.wavy-line {
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;

  svg {
    margin: 0 auto;
    text-align: center;

    stroke-width: 1;
    width: 100%;
    height: 100px;
  }
}

.wavy-line.active {
  svg {
    opacity: .6;
    stroke: #009d90;
    animation: waves 0.5s ease-in-out infinite;
  }
}

.static-lines {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.static-lines.active::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background: #009d90;
  opacity: .02;
  animation: move-lines 0.5s ease-in-out infinite;
  top: calc(var(--start-position, 10px)); /* Randomized start position */

}

.static-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.static-background.active::before,
.static-background.active::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1) 0,
      rgba(255, 255, 255, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 4px
  );
  animation: flicker 0.3s infinite, noise 0.2s infinite;
}

.static-background.active::after {
  background: rgba(255, 255, 255, 0.02);
  mix-blend-mode: overlay;
  animation: flicker 0.15s infinite, noise 0.1s infinite;
}

@keyframes flicker {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes noise {
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(-5px);
  }
  50% {
    transform: translateY(10px) translateX(5px);
  }
  75% {
    transform: translateY(-5px) translateX(-10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes move-lines {
  0% {
    opacity: .06;
    height: 14px;
    transform: translateY(0px);
  }
  25% {
    opacity: .06;
    height: 14px;
    transform: translateY(-7px);
  }
  50% {
    opacity: 0;
    height: 14px;
    transform: translateY(-7px);
  }
  75% {
    opacity: .02;
    transform: translateY(3px);
    height: 14px;
  }
  100% {
    opacity: .06;
    transform: translateY(0px);
    height: 1px;
  }
}

@keyframes waves {
  0% {
    height: 100px;
    width: 100%;
    stroke-width: 1px;
    opacity: .2;
    transform: translateY(0%);
  }
  25% {
    height: 100px;
    width: 100%;
    stroke-width: 20px;
    opacity: 0;
    transform: translateY(8%) translateX(-20px);
  }
  50% {
    height: 40px;
    width: 360px;
    stroke-width: 20px;
    opacity: .04;
    transform: translateY(2%);
  }
  75% {
    height: 10px;
    width: 100%;
    stroke-width: 14px;
    opacity: .2;
    transform: translateY(3%) translateX(40px);
  }
  100% {
    height: 40px;
    width: 100%;
    stroke-width: 2px;
    opacity: .2;
    transform: translateY(-10%) translateX(0);
  }
}


</style>
