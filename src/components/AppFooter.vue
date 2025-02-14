<template>
  <v-footer dark height="auto" class="footer indigo lighten-1">
    <v-container max-width="1200px" fluid>
      <v-card flat tile class="white--text text-xs-center">
        <v-card-text>
          <!-- Your existing footer text can remain here -->
        </v-card-text>

        <v-card-text class="white--text pt-0">
          The code we write, the code betrays,
          Tomorrow rewrites yesterday’s ways.

          A shifting tide, a moving goal,
          Foundations bend, we must be bold.

          Patterns break and tools expire,
          We must adapt, we must aspire.
        </v-card-text>

        <v-divider></v-divider>

        <div class="d-flex">
          <v-card-text class="white--text">
            &copy;{{ new Date().getFullYear() }} — <strong>Casey Trombley</strong>
          </v-card-text>

          <!-- Action Buttons: Email & LinkedIn -->
          <v-card-actions class="actions d-flex justify-end">
            <a :href="'mailto:caseytrombley@gmail.com?subject=Portfolio%20Inquiry'" target="_blank" class="btn email">
              <v-icon>mdi-email</v-icon>
            </a>

            <button class="btn linkedin" @click="openLinkedIn">
              <img src="/icon-linkedin.png" alt="LinkedIn">
            </button>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
const openLinkedIn = () => {
  window.open("https://www.linkedin.com/in/casey-trombley", "_blank");
};
</script>


<style lang="scss" scoped>
.actions {
  display: flex;
  justify-items: flex-end;
  align-items: flex-start;
}
.email {
  color: #ffffff;
  background-color: #d91717;
  border-radius: 5px;
  padding: 2px;
  i {
    font-size: 32px;
  }
}
.linkedin {
  img {
    height: 36px;
  }
}
</style>

