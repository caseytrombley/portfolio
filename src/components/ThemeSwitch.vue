<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";

// Theme-related logic
const themes = ["light", "dark"] as const;
type Theme = (typeof themes)[number];

const theme = useTheme();
const currentTheme = ref<Theme>("light");

const themeIcons: Record<Theme, string> = {
  light: "mdi-white-balance-sunny",
  dark: "mdi-moon-waxing-crescent",
};

const setTheme = (newTheme: Theme) => {
  currentTheme.value = newTheme;
  theme.global.name.value = newTheme;
};

// Initialize the theme based on the system preference
const initializeTheme = () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  currentTheme.value = prefersDark ? "dark" : "light";
  theme.global.name.value = currentTheme.value;
};
initializeTheme();


</script>

<template>
  <div class="tw-toggle">
    <input
      type="radio"
      name="theme"
      value="light"
      id="theme-light"
      :checked="currentTheme === 'light'"
      @change="setTheme('light')"
    />
    <label for="theme-light"><v-icon :icon="themeIcons.light"></v-icon></label>

    <input
      type="radio"
      name="theme"
      value="dark"
      id="theme-dark"
      :checked="currentTheme === 'dark'"
      @change="setTheme('dark')"
    />
    <label for="theme-dark"><v-icon :icon="themeIcons.dark"></v-icon></label>

    <span></span>
  </div>
</template>

<style lang="scss" scoped>
.tw-toggle {
  display: inline-flex;
  align-self: flex-start;
  padding: 4px 0 1px;
  border-radius: 20px;
  position: relative;
  border: 2px solid #95a5a6;
}

.tw-toggle label {
  position: relative;
  text-align: center;
  display: inline-block;
  color: #95a5a6;
  z-index: 2;
  margin: 0 0 0 -2px;
  padding: 0 6px 3px;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.tw-toggle input {
  position: absolute;
  z-index: 3;
  opacity: 0;
  cursor: pointer;
}

.tw-toggle span {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  display: block;
  position: absolute;
  top: 2px;
  left: 22px;
  transition: all 0.3s ease-in-out;
}

.tw-toggle input[value="light"]:checked ~ span {
  background: #fbc02d;
  left: 2px;
}

.tw-toggle input[value="dark"]:checked ~ span {
  background: #455a64;
  left: 31px;
}

.tw-toggle input[value="light"]:checked + label i,
.tw-toggle input[value="dark"]:checked + label i {
  color: #fff;
}


</style>
