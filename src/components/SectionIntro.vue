<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <h1>Welcome to my portfolio!</h1>
      <div class="text">
        <p>{{ displayedText }}</p>
      </div>
      <div class="image">
        <AppKeyboard :activeKey="activeKey" />
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppKeyboard from '../components/AppKeyboard.vue';
import AppKeyboardOrig from '../components/AppKeyboardOrig.vue';
import { introText } from '@/content/index.ts';

const fullText = introText;
const displayedText = ref('');
const activeKey = ref('');

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
    }
  }

  typeNextChar();
}

// Start the typing animation
typeText();
</script>

<style lang="scss" scoped>
section {
  position: relative;
  height: 100vh;
  text-align: left;

  .container {
    position: relative;
  }

  h1 {
    opacity: 0;
    animation: drop 0.3s ease-in-out forwards;
    animation-delay: .5s;
  }

  .text {
    position: absolute;
    opacity: 0;
    transform: rotate(-1deg);
    animation: textAnim 0.3s ease-in-out forwards;
    animation-delay: .6s;
  }

  .image {
    //width: 70%;
    //transform: translateX(190px);
    opacity: 0;
    animation: imageAnim 0.3s ease-in-out forwards;
    animation-delay: .3s;

    ::v-deep {
      svg {
        transform: scale(1.2) skewX(6deg) skewY(-1deg);
        animation: imageAnim2 12s ease-in-out infinite;
        animation-delay: .5s;
      }
    }
  }

  p {
    color: #4d847f;
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
      //width: 65%
    }

    .image {
      width: 50%;
      transform: translateX(50%) translateY(0px);
    }
  }
}

.v-theme--dark {
  p {
    color: #4d847f;
  }
}
.v-theme--light {
  p {
    color: #4dbdb3;
  }
}

</style>
