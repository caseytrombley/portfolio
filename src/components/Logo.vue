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
  const wordElements = document.querySelectorAll('.logo-content .word');
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
  transform: translateX(-14px);
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

@media (max-width: 479px) {
  .logo {
    transform: translateX(-1px);
  }
  .logo-text {
    font-size: 28px;
  }
  .logo-icons {
    padding: 0 6px 0 0;
  }

  .logo-icon {
   ::v-deep {
     svg {
       height: 28px;
       transform: translateY(-1px);
     }
   }
  }
  .logo-icon-overlay {
    ::v-deep {
      svg {
        height: 28px;
        transform: translateY(1px) translateX(0);
      }
    }
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
