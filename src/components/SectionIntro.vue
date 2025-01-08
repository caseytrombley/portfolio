<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <v-row>
        <v-col cols="12" md="6">
          <p>{{ displayedText }}</p>
        </v-col>
        <v-col cols="12" md="6">
          <AppKeyboard :activeKey="activeKey" />
        </v-col>
      </v-row>
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
      setTimeout(typeNextChar, 10); // Adjust speed here (100ms per character)
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

  p {
    font-size: 1.5rem;
    line-height: 2rem;
    white-space: pre-wrap; /* Preserve spaces */
  }

  svg {
    width: 100%;
    height: auto;
  }
}
</style>
