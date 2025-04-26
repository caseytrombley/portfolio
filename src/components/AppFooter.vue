<template>
  <v-footer dark height="auto" class="footer indigo lighten-1">
    <v-container max-width="1200px" fluid>
      <v-card flat tile class="white--text text-xs-center">
        <div class="footer-top">
          <img src="/logo.svg" alt="Casey" />
          <div>
            <p class="text-sm-body-1">
              <b>Casey Trombley</b> is a software engineer and creative artist.
              He specializes in front-end design and development, with a focus on JavaScript and CSS.
              He’s also a graphic artist and music composer, blending visual and audio creativity into his work.
              Rumor has it that he builds perfect mobile responsive apps while beating VS Code in a staring contest.
            </p>
          </div>
        </div>

        <div class="d-flex">
          <v-card-text>
            &copy;{{ new Date().getFullYear() }} — <strong>Casey Trombley</strong>
          </v-card-text>

          <v-card-actions class="actions d-flex justify-end">
            <button class="btn email" @click="openFormDialog">
              <v-icon>mdi-email</v-icon>
            </button>
            <button class="btn linkedin" @click="openLinkedIn">
              <img src="/icon-linkedin.png" alt="LinkedIn" />
            </button>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>

    <!-- Contact Form Component -->
    <ContactForm :modelValue="formDialog" @update:modelValue="updateFormDialog" />
  </v-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactForm from './ContactForm.vue'

const formDialog = ref(false)

const openLinkedIn = () => {
  window.open("https://www.linkedin.com/in/casey-trombley", "_blank")
}

const openFormDialog = () => {
  formDialog.value = true
}

const updateFormDialog = (value: boolean) => {
  formDialog.value = value
}
</script>


<style lang="scss" scoped>
.footer-top {
  display: flex;
  gap: 1rem;
  margin: 0 auto 1rem;
  padding: 2rem;
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background: rgba(255,255,255,0.03);

  img {
    height: 100px;
  }

  p {
    font-size: 1.25rem;
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
  &:hover {
    animation: flicker 150ms 2 linear;
  }
}
.email {
  color: #ffffff;
  background-color: #d91717;
  border-radius: 5px;
  padding: 2px;
}
.linkedin {
  img {
    height: 36px;
  }
}

.v-theme--dark {
  .footer-top {
    background: rgba(255, 255, 255, 0.03);
  }
}
.v-theme--light {
  .footer-top {
    background: rgb(120, 231, 220, 0.09);
  }
}
</style>
