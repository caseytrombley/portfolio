<template>
  <v-footer dark height="auto" class="footer indigo lighten-1">
    <v-container max-width="1200px" fluid>
      <v-card flat tile class="white--text text-xs-center">



        <div class="footer-top">
          <img src="/casey-image.jpg" alt="Casey">
          <div>
            <p>
              <b>Casey Trombley</b> is a professional web developer and artist from the Boston area of Massachusetts.
              His specialty is front-end design and development with javascript and css. He has a bachelors degree in advanced web design from Salem State University.
            </p>
          </div>
        </div>


        <div class="d-flex">
          <v-card-text>
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
.footer-top {
  display: flex;
  gap: 1rem;
  padding: 0 0 1rem;

  img {
    height: 100px;
    border-radius: 50%;
  }

  p {
    font-size: 1.4rem;
    opacity: .3;
  }
}
.actions {
  display: flex;
  justify-items: flex-end;
  align-items: flex-start;
}
.btn {
  height: 36px;
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

