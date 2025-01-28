<template>
  <div class="static-background" ref="staticBackground"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const staticBackground = ref<HTMLElement | null>(null);

const startStaticAnimation = () => {
  const animateStatic = () => {
    if (staticBackground.value) {
      staticBackground.value.classList.add("active");
      setTimeout(() => {
        staticBackground.value?.classList.remove("active");
      }, 500 + Math.random() * 1000);
    }

    const delay = 3000 + Math.random() * 4000;
    setTimeout(animateStatic, delay);
  };

  animateStatic();
};


onMounted(() => {
  startStaticAnimation();
});
</script>

<style lang="scss" scoped>

.static-background {
  position: absolute;
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

</style>
