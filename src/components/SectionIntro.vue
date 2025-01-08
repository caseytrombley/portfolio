<template>
  <section class="grad-bottom">
    <v-container max-width="1200px" fluid class="container">
      <h1>Welcome to my portfolio!</h1>
      <div class="text">
        <p>{{ displayedText }}</p>
      </div>
      <div class="image" :class="{ 'fall': moveImageDown }">
        <AppKeyboard :activeKey="activeKey" />
      </div>
    </v-container>
<!--    <div class="bottom-div">-->
<!--      <div v-if="isAnimationComplete" class="animated-arrows">-->
<!--        <span v-for="arrow in arrows" class="arrow">-->
<!--          <v-icon icon="mdi-arrow-down"></v-icon>-->

<!--        </span>-->
<!--      </div>-->
<!--    </div>-->
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppKeyboard from '../components/AppKeyboard.vue';
import { introText } from '../content/index.ts';

const fullText = introText;
const displayedText = ref('');
const activeKey = ref('');
const isAnimationComplete = ref(false); // Tracks animation completion
const moveImageDown = ref(false); // Tracks when the image should move and fade

// Function to animate typing
function typeText() {
  let index = 0;

  function typeNextChar() {
    if (index < fullText.length) {
      const currentChar = fullText[index];
      displayedText.value += currentChar;

      // Update the activeKey for the keyboard, lowercase the key for matching
      activeKey.value = currentChar.toLowerCase();

      index++;
      setTimeout(typeNextChar, 15); // Adjust speed here (100ms per character)
    } else {
      // Clear activeKey after typing is complete
      activeKey.value = '';
      isAnimationComplete.value = true; // Mark animation as complete

      // Delay the image animation by 1 second
      setTimeout(() => {
        moveImageDown.value = true;
      }, 2200);
    }
  }

  typeNextChar();
}

// Start the typing animation
typeText();
</script>



<style lang="scss" scoped>
h1 {
  padding: 0 0 12px;
  opacity: 0;
  animation: drop 0.3s ease-in-out forwards;
  animation-delay: .5s;
}

.text {
  position: absolute;
  padding: 0 15px 0 2px;
  opacity: 0;
  transform: rotate(-1deg);
  animation: textAnim 0.3s ease-in-out forwards;
  animation-delay: .6s;
}

.image {
  width: 100%;
  margin-top: 20%;
  opacity: 0;
  transform: translateX(20%) translateY(0);
  animation: imageAnim 0.3s ease-in-out forwards;
  animation-delay: .3s;

  &.fall {
    opacity: 1;
    animation: fall 0.6s ease-in-out forwards;
    animation-delay: .3s;
  }

  ::v-deep {
    svg {
      transform: scale(1.2) skewX(6deg) skewY(-1deg);
      animation: imageAnim2 12s ease-in-out infinite;
      animation-delay: .5s;
    }
  }
}

p {
  font-size: 1.2rem;
  line-height: 1.2;
  white-space: pre-wrap;
}

@media (min-width: 600px) {
  p {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .text {
    position: absolute;
    width: 93%
  }

  .image {
    margin-top: -20px;
    width: 50%;
    transform: translateX(50%) translateY(0);
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

@keyframes textAnim2 {
  0% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateX(0) translateY(5px) rotate(-1deg);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
}

@keyframes imageAnim {
  0% {
    opacity: 0;
    transform: translateX(300%);
  }
  80% {
    opacity: 1;
    transform: translateX(55%);
  }
  100% {
    opacity: 1;
    transform: translateX(50%);
  }
}

@keyframes fall {
  0% {
    opacity: 1;
    transform: translateX(50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(50%) translateY(300%);
  }
}

@keyframes imageAnim2 {
  0% {
    transform: scale(1.4) skewX(6deg) skewY(-1deg);
  }
  50% {
    transform: scale(1.6) skewX(3deg) skewY(-1deg);
  }
  100% {
    transform: scale(1.4) skewX(6deg) skewY(-1deg);
  }
}

@media (max-width: 599px) {
  @keyframes imageAnim {
    0% {
      opacity: 0;
      transform: translateX(300%);
    }
    80% {
      opacity: 1;
      transform: translateX(25%);
    }
    100% {
      opacity: 1;
      transform: translateX(20%);
    }
  }

  @keyframes fall {
    0% {
      opacity: 1;
      transform: translateX(20%) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(20%) translateY(300%);
    }
  }

  @keyframes imageAnim2 {
    0% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
    50% {
      transform: scale(1.7) skewX(3deg) skewY(-1deg);
    }
    100% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
  }
}

</style>
