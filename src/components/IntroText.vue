<template>
  <div class="intro-text">
    <h1 class="intro-heading">Welcome to my portfolio!</h1>
    <div class="paragraph">
      <p>{{ displayedText }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';

const props = defineProps({
  displayedText: String,
  activeKey: String, // Provided if you want to highlight or trigger animation on AppKeyboard
});

// Additional functionality like animating `h1` or reacting to `activeKey`
// can go here if needed later.
</script>

<style scoped>
.intro-text {
  position: absolute;
  padding: 0 40px;
}

.intro-heading {
  padding: 0 0 12px;
  opacity: 0;
  animation: drop 0.3s ease-in-out forwards;
  animation-delay: 0.5s;
}

.paragraph {
  text-align: left;
  z-index: 3;
  padding: 0 15px 0 2px;
  opacity: 0;
  transform: rotate(-1deg);
  animation: textAnim 0.3s ease-in-out forwards;
  animation-delay: 0.6s;
}

p {
  font-size: 1.2rem;
  line-height: 1.2;
  white-space: pre-wrap;
}

@media (min-width: 480px) {
  p {
    font-size: 1.5rem;
    line-height: 2rem;
  }
}

@keyframes drop {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textAnim {
  0% {
    opacity: 0;
    transform: translateX(-1000px) rotate(-1deg);
  }
  80% {
    opacity: 1;
    transform: translateX(20px) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotate(-1deg);
  }
}
</style>
