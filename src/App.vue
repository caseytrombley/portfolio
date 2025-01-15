<template>
  <v-app>
    <ScreenEffect />
    <div class="app-header">
      <v-container max-width="1200px" fluid class="app-header-container">
        <div class="app-title">
          <Logo />
        </div>
        <div class="app-header-controls right-div">
          <ThemeSwitch />
        </div>
      </v-container>
    </div>

    <v-main>
      <RouterView />
    </v-main>

    <v-footer class="footer">
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
import Logo from "./components/Logo.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import ScreenEffect from "./components/ScreenEffect.vue";

</script>

<style lang="scss">
html, body {
  overflow-x: hidden;
}
main {
  overflow: visible;
}
</style>

<style lang="scss" scoped>

.app-header-container {
  display: flex;
  position: relative;
  justify-content: space-between;
}

@media (max-width: 359px) {
  .app-header-container {
    display: block;
  }
}

.app-title {
  padding: 0 0 1rem;
}

.right-div {
  display: flex;
  margin-left: auto;
  justify-content: flex-end;
}

.footer {
  background-color: transparent;
}
</style>
