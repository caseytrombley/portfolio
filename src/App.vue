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

    <AppFooter />

  </v-app>
  <!-- Dummy Netlify form for static detection -->
  <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
    <input type="hidden" name="form-name" value="contact" />
    <input type="text" name="name" />
    <input type="text" name="phone" />
    <input type="email" name="email" />
    <textarea name="message"></textarea>
  </form>
</template>

<script setup lang="ts">
import Logo from "./components/Logo.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import ScreenEffect from "./components/ScreenEffect.vue";
import AppFooter from "@/components/AppFooter.vue";


</script>

<style lang="scss">
html, body {
  font-size: 18px;
  overflow-x: hidden;
}
main {
  overflow: visible;
}

.v-theme--light {
  .dialog-content-body {
    background-color: #ffffff;
  }
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


</style>
