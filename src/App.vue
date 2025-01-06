<template>
  <v-app>
    <div class="static-background" ref="staticBackground"></div>
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
import { ref, onMounted } from "vue";
import { useTheme } from "vuetify";
import Logo from "./components/Logo.vue";

// Theme-related logic
const themes = ["system", "light", "dark"] as const;
type Theme = (typeof themes)[number];

const theme = useTheme();
const currentTheme = ref<Theme>("system");

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

// Intermittent flicker and noise animations
const staticBackground = ref<HTMLElement | null>(null);

const startIntermittentAnimation = () => {
  const animate = () => {
    if (staticBackground.value) {
      staticBackground.value.classList.add("active");
      setTimeout(() => {
        staticBackground.value?.classList.remove("active");
      }, 500 + Math.random() * 1000); // Animation duration between 0.5s and 1.5s
    }

    const delay = 3000 + Math.random() * 5000; // Delay between 3s and 8s
    setTimeout(animate, delay);
  };

  animate();
};

onMounted(() => {
  startIntermittentAnimation();
});
</script>

<style lang="scss">

.v-application {
  .static-background {
    position: fixed;
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
