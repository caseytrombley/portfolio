<script setup>
import { ref, onMounted, nextTick } from 'vue';
import LogoIcon from "./LogoIcon.vue";

// Letters for the logo
const lines = [
  ["c", "a", "s", "e", "y"],
  ["t", "r", "o", "m", "b", "l", "e", "y"],
];

const letterAnimations = ref([]); // Tracks animation classes for each letter
const initialAnimation = ref(true); // Track whether we're in the initial animation phase

const restartAnimation = async () => {
  // Clear previous letter animations
  letterAnimations.value = [];
  initialAnimation.value = true; // Restart animation phase

  // Wait for DOM to reset before reapplying animations
  await nextTick();

  // Reset word animation (this triggers "falling in" again)
  const wordElements = document.querySelectorAll('.logo-text .word');
  wordElements.forEach((el, index) => {
    el.style.animation = ''; // Reset the animation
    el.offsetHeight; // Trigger reflow to restart animation
    el.style.animation = `flyIn 1s forwards ${index * 0.3}s`; // Reapply animation with delay
    el.style.opacity = '1'; // Ensure words are visible during animation
  });

  setupAnimations(); // Apply letter animations
};

const setupAnimations = () => {
  // Create animation sequence for each letter
  letterAnimations.value = lines.map(line =>
    line.map(() => ({
      animation: initialAnimation.value ? "flicker" : generateRandomAnimation(),
      delay: `${Math.random() * 0.5}s`, // Stagger each letter randomly
    }))
  );

  // Transition to secondary animations after initial animation finishes
  if (initialAnimation.value) {
    setTimeout(() => {
      initialAnimation.value = false;
      setupAnimations(); // Switch to randomized animations
    }, 1500); // Matches duration of "flyIn" animation
  }
};

const generateRandomAnimation = () => {
  const animations = ["flicker", "randomJitter"];
  return animations[Math.floor(Math.random() * animations.length)];
};

onMounted(() => {
  setupAnimations();
});
</script>

<template>
  <RouterLink to="/" @click="restartAnimation" class="link">
    <div class="logo">
      <div class="logo-icons">
        <LogoIcon class="logo-icon-overlay" />
        <LogoIcon class="logo-icon" />
      </div>
      <div class="logo-text">
        <div v-for="(line, lineIndex) in lines" :key="lineIndex" class="word" :style="{ animationDelay: `${lineIndex * 0.3}s` }">
          <span
            v-for="(letter, letterIndex) in line"
            :key="letterIndex"
            :style="{ animationDelay: letterAnimations[lineIndex]?.[letterIndex]?.delay }"
            :class="letterAnimations[lineIndex]?.[letterIndex]?.animation"
          >
            {{ letter }}
          </span>
        </div>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss" scoped>

// Variables for colors
$trans: transparent;
$white: #ffffff;
$green: #0d7364;
$green2: #0eaa85;
$green3: #016a5a;
$green4: #0dc499;

.v-theme--dark {
  .logo-text {
    color: #0e6e66;
  }
}
.v-theme--light {
  .logo-text {
    color: #25e0cb;
  }
}

.logo {
  display: flex;
  overflow: visible;
}

a {
  color: inherit;
  text-decoration: none;
}

.logo-text {
  font-family: "Syne Mono", serif;
  font-weight: 800;
  font-size: 42px;
  line-height: 1;
  display: flex;
  align-self: flex-start;
  gap: 5px;
  color: #0e6e66;

  .word {
    display: inline-block;
    opacity: 0;

    &:nth-child(1) {
      animation: flyIn 1s forwards;
    }
    &:nth-child(2) {
      animation: flyIn2 1s forwards;
      animation-delay: .3s;
    }

  }

  span {
    display: inline-block;
    opacity: 1; /* Make sure letters are always visible */
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
  }
}

.logo-icons {
  position: relative;
  padding: 0 4px 0 0;
}

.logo-icon {
  animation: dropStatic 1s forwards;

  ::v-deep {
    svg {
      opacity: .2;
      height: 60px;
      transform: translateY(-7px);
    }
  }
}

.logo-icon-overlay {
  position: absolute;
  animation: dropStatic2 1s forwards;
  animation-delay: .8s;

  ::v-deep {
    svg {
      opacity: .3;
      height: 42px;
      transform: translateY(2px) translateX(8px);
    }
  }
}

// Keyframes for animations
@keyframes flicker {
  0% {
    opacity: 1;
    transform: rotate(0deg) translateX(0) translateY(0);
  }
  10% {
    opacity: 0;
    transform: rotate(-0.5deg) translateX(1px) translateY(1px);
  }
  20% {
    opacity: 0.8;
    transform: rotate(0.5deg) translateX(-1px) translateY(0px);
  }
  30% {
    opacity: 0.2;
    transform: rotate(0deg) translateX(0px) translateY(-1px);
  }
  40% {
    opacity: 0.2;
    transform: rotate(0deg) translateX(0) translateY(0);
  }
  50% {
    opacity: 0.2;
    transform: rotate(0.2deg) translateX(-1px) translateY(2px);
  }
  60% {
    opacity: 0.7;
    transform: rotate(-0.3deg) translateX(1px) translateY(1px);
  }
  70% {
    opacity: 0;
    transform: rotate(0.5deg) translateX(-1px) translateY(0px);
  }
  80% {
    opacity: 0.9;
    transform: rotate(-0.2deg) translateX(1px) translateY(-1px);
  }
  90% {
    opacity: 0.6;
    transform: rotate(0deg) translateX(0px) translateY(1px);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg) translateX(0) translateY(0);
  }
}


@keyframes randomJitter {
  0% {
    opacity: 0;
    transform: scale(1) rotate(0deg) translateY(0);
  }
  8% {
    opacity: 1;
    transform: scale(1.02) rotate(-4deg) translateY(1px);
  }
  15% {
    opacity: 0.3;
    transform: scale(1) rotate(3deg) translateY(-1px);
  }
  23% {
    opacity: 1;
    transform: scale(0.98) rotate(-5deg) translateY(0) translateX(-5px);
  }
  30% {
    opacity: 0.9;
    transform: scale(1) rotate(2deg) translateY(0) translateX(-5px);
  }
  38% {
    opacity: 0.9;
    transform: scale(1.02) rotate(6deg) translateY(0) translateX(0);
  }
  45% {
    opacity: 1;
    transform: scale(0.99) rotate(-3deg) translateY(1px);
  }
  53% {
    opacity: 1;
    transform: scale(1) rotate(4deg) translateY(0);
  }
  60% {
    opacity: 0.3;
    transform: scale(0.98) rotate(-2deg) translateY(-2px);
  }
  68% {
    opacity: 0.8;
    transform: scale(1) rotate(5deg) translateY(2px);
  }
  75% {
    opacity: 1;
    transform: scale(1.01) rotate(-4deg) translateY(1px);
  }
  83% {
    opacity: 1;
    transform: scale(1) rotate(3deg) translateY(0) translateX(3px);
  }
  90% {
    opacity: 0.2;
    transform: scale(0.99) rotate(2deg) translateY(0) translateX(6px);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg) translateY(0) translateX(0);
  }
}



@keyframes flyIn {
  0% {
    transform: scale(1.5) translateX(-5px);
    opacity: 0;
  }
  33% {
    transform: scale(1.1) translateX(0);
    opacity: .8;
  }
  58% {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
}

@keyframes flyIn2 {
  0% {
    transform: scale(1.5) translateX(5px);
    opacity: 0;
  }
  33% {
    transform: scale(1.1) translateX(0);
    opacity: .8;
  }
  58% {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
  100% {
    transform: scale(1) translateX(0);
    opacity: 1;
  }
}

@keyframes dropStatic {
  0% {
    opacity: 1;
    transform: translateX(100px);
  }
  10% {
    opacity: 0;
    transform: translateX(90px);
  }
  20% {
    opacity: 0.8;
    transform: translateX(30px);
  }
  30% {
    opacity: 0.2;
    transform: translateX(2px);
  }
  40% {
    opacity: 0.5;
    transform: translateX(-2px);
  }
  50% {
    opacity: 0.1;
    transform: translateX(1px);
  }
  60% {
    opacity: 0.7;
    transform: translateX(-1px);
  }
  70% {
    opacity: 0;
    transform: translateX(2px);
  }
  80% {
    opacity: 0.9;
    transform: translateX(-1px);
  }
  90% {
    opacity: 0.6;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(0);
  }
}


@keyframes dropStatic2 {
  0% {
    opacity: 0;
    transform: translateX(0);
  }
  10% {
    opacity: 0;
    transform: translateX(0);
  }
  20% {
    opacity: 0;
    transform: translateX(0);
  }
  30% {
    opacity: 0.2;
    transform: translateX(2px);
  }
  40% {
    opacity: 0.5;
    transform: translateX(-2px);
  }
  50% {
    opacity: 0;
    transform: translateX(1px);
  }
  60% {
    opacity: 0;
    transform: translateX(-1px);
  }
  70% {
    opacity: 0;
    transform: translateX(5px);
  }
  80% {
    opacity: 0.1;
    transform: translateX(-1px);
  }
  90% {
    opacity: 0.6;
    transform: translateX(0px);
  }
  100% {
    opacity: .4;
    transform: translateX(2px);
  }
}


// Add animation classes
.flicker {
  animation-name: flicker;
}

.randomJitter {
  animation-name: randomJitter;
}

.flyIn {
  animation-name: flyIn;
}
</style>
