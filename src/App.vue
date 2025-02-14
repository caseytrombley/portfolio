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



    <v-footer
      dark
      height="auto"
      class="footer indigo lighten-1"
    >
      <v-container max-width="1200px" fluid>
        <v-card
          flat
          tile
          class=" white--text text-xs-center"
        >
          <v-card-text>
            <!--            <v-btn-->
            <!--              v-for="icon in icons"-->
            <!--              :key="icon"-->
            <!--              class="mx-3 white&#45;&#45;text"-->
            <!--              icon-->
            <!--            >-->
            <!--              <v-icon size="24px">{{ icon }}</v-icon>-->
            <!--            </v-btn>-->
          </v-card-text>

          <v-card-text class="white--text pt-0">
            Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            &copy;{{ new Date().getFullYear() }} — <strong>Casey Trombley</strong>
          </v-card-text>


        </v-card>
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
