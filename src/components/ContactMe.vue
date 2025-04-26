<template>
  <div class="contact-me">
    <h3 class="lead">
      Need a great developer?
    </h3>
    <div class="subtext">
      Let's talk!
    </div>

    <div class="contact-info">
      <div class="open-sign">
        <div class="top">I'm</div>
        <div class="open">open</div>
        <div class="bottom">for work</div>
      </div>
      <div class="actions">
        <!-- Contact Form Button -->
        <button class="btn email" @click="dialog = true">
          <v-icon>mdi-email</v-icon>
        </button>

        <!-- LinkedIn Button -->
        <button class="btn linkedin" @click="openLinkedIn">
          <img src="/icon-linkedin.png" alt="LinkedIn">
        </button>
      </div>
    </div>

    <!-- Contact Form Dialog -->
    <ContactFormDialog v-model="dialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactFormDialog from './ContactForm.vue'

const dialog = ref(false)

const openLinkedIn = () => {
  window.open("https://www.linkedin.com/in/casey-trombley", "_blank")
}
</script>

<style lang="scss" scoped>
.contact-me {
  padding: 1rem;

  .open-sign {
    display: block;
    position: relative;
    top: -4px;
    transform-origin: top center;
    width: min-content;
    padding: 4px 5px 2px;
    color: #ffffff;
    //background: #10A049;
    background: rgb(17,142,66);
    background: linear-gradient(41deg, rgba(17,142,66,1) 0%, rgba(16,160,73,1) 100%);
    border: 3px solid #ffffff;
    border-radius:18px;
    animation: sway 5s ease-out infinite;

    .top, .bottom {
      position: relative;
      @include font-written;
      font-size: 20px;
      line-height: 1;
      transform: rotate(-3deg);
    }
    .open {
      margin: 0;
      font-size: 28px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: -1.25px;
      text-transform: uppercase;
    }
    .top {
      text-align: left;
      padding: 0 0 0 4px;
      font-size: 22px;
    }
    .bottom {
      text-align: right;
      padding: 0 4px 0 0;
      top: -5px;
    }
  }

  h3 {
    color: #ffbb00;
    font-size: 22px;
    transform: rotate(-1deg);
  }

  .subtext {
    @include font-written;
    font-size: 1.5rem;
    line-height: 1;
    margin: .125rem 0 1rem;
  }

  .contact-info {
    display: flex;
    justify-content: center;
    position: relative;
    top: -4px;
    gap: 1rem;
  }

  .actions {
    display: flex;
    position: relative;
    gap: .5rem;
    top: 15px;
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
    i {
      font-size: 32px;
    }
  }
  .linkedin {
    img {
      height: 36px;
    }
  }
}
</style>
<script setup lang="ts">
</script>
