<template>
  <v-app>
    <div class="app-header">
      <v-container max-width="1200px" fluid class="app-header-container">
        <div class="app-title">
          <Logo />
        </div>
        <div class="app-header-controls right-div">

          <!-- Theme switcher -->
          <v-menu offset-y max-width="300px">
            <template #activator="{ props }">
              <v-btn icon v-bind="props" elevation="0" variant="plain">
                <v-icon :icon="currentThemeIcon"></v-icon>
                <v-tooltip activator="parent" location="end">
                  <template #default>
                    <span>{{ themeLabels[currentTheme] }}</span>
                  </template>
                </v-tooltip>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="theme in themes"
                :key="theme"
                @click="setTheme(theme)"
                :class="[{ 'v-list-item--active': currentTheme === theme }, 'd-flex']"
              >
                <v-list-item-title>
                  <v-icon :icon="themeIcons[theme]" class="me-3"></v-icon>
                  {{ themeLabels[theme] }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-container>
    </div>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="bg-grey-darken-4">
      <v-container max-width="1200px" fluid>
        <div>
          &copy; {{ new Date().getFullYear() }}
          <a href="https://www.caseytrombley.com" target="_blank" rel="noopener noreferrer">
            caseytrombley
          </a>
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useChordsStore } from "./stores/chordsStore";
import { useTheme } from "vuetify";
import Logo from "./components/Logo.vue";

// Define theme-related types and logic
const themes = ["system", "light", "dark"] as const; // Define themes as a constant tuple
type Theme = (typeof themes)[number]; // Create a type from the tuple: 'system' | 'light' | 'dark'

const theme = useTheme();
const currentTheme = ref<Theme>("system"); // Ensure currentTheme is typed correctly

const themeIcons: Record<Theme, string> = {
  light: "mdi-white-balance-sunny",
  dark: "mdi-moon-waxing-crescent",
  system: "mdi-monitor",
};

const themeLabels: Record<Theme, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "System theme",
};

const currentThemeIcon = ref(themeIcons.system);

const setTheme = (newTheme: Theme) => {
  currentTheme.value = newTheme;
  if (newTheme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme.global.name.value = prefersDark ? "dark" : "light";
    currentThemeIcon.value = themeIcons.system;
  } else {
    theme.global.name.value = newTheme;
    currentThemeIcon.value = themeIcons[newTheme];
  }
};

const initializeTheme = () => {
  if (currentTheme.value === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    theme.global.name.value = prefersDark ? "dark" : "light";
    currentThemeIcon.value = themeIcons.system;
  } else {
    currentThemeIcon.value = themeIcons[currentTheme.value];
  }
};
initializeTheme();


</script>

<style>

.open-sans-font {
  font-family: "Open Sans", serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

.londrina-sketch-regular {
  font-family: "Londrina Sketch", serif;
  font-weight: 400;
  font-style: normal;
}
.rubik-vinyl-regular {
  font-family: "Rubik Vinyl", serif;
  font-weight: 400;
  font-style: normal;
}


</style>

<style lang="scss" scoped>
.app-header-container {
  display: block;

}
@media (min-width: 768px) {
  .app-header-container {
    display: flex;
    position: relative;
    justify-content: space-between;
  }
}
.app-title {
  padding: 0 0 1rem;
}
@media (min-width: 900px) {
  .app-title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 0;
  }
}

.right-div {
  display: flex;
  margin-left: auto;
}

.v-list-item {
  display: flex;
  align-items: center;
}


</style>
