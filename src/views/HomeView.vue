<template>
  <div class="home-view">
   <div class="static-background"></div>
  </div>
</template>

<style lang="scss" scoped>
.home-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.static-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: -1;
  pointer-events: none;
}

.static-background::before,
.static-background::after {
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
  animation: flicker 0.3s forwards, noise 0.2s forwards;
}

.static-background::after {
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

</style>

