<template>
  <div class="contact-me">
    <h3 class="lead">
      Need a good developer?
    </h3>
    <div class="subtext">
      Let's talk!
    </div>

    <div class="d-flex">
      <div class="open-sign">
        <div class="top">I'm</div>
        <div class="open">open</div>
        <div class="bottom">for work</div>
      </div>
      <div class="actions">
        <!-- Email Button -->
        <a :href="'mailto:caseytrombley@gmail.com?subject=Portfolio%20Inquiry'" target="_blank" class="btn email">
          <v-icon>mdi-email</v-icon>
        </a>

        <!-- LinkedIn Button -->
        <button class="btn linkedin" @click="openLinkedIn">
          <img src="/icon-linkedin.png" alt="LinkedIn">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const openLinkedIn = () => {
  window.open("https://www.linkedin.com/in/casey-trombley", "_blank");
};
</script>


<style lang="scss" scoped>
.contact-me {
  padding: 1rem;
  margin: .5rem 0;

  .open-sign {
    display: block;
    position: relative;
    top: -7px;
    transform: rotate(-1deg);
    width: min-content;
    padding: 4px 5px 2px;
    color: #ffffff;
    //background: #10A049;
    background: rgb(17,142,66);
    background: linear-gradient(41deg, rgba(17,142,66,1) 0%, rgba(16,160,73,1) 100%);
    border: 3px solid #ffffff;
    border-radius:18px;

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

  .d-flex {
    display: flex;
    position: relative;
    top: -5px;
    gap: 1rem;
  }

  .actions {
    display: flex;
    gap: .5rem;
    padding: 5px 0 0;
  }

  .btn {
    padding: 5px;
    text-align: center;
    transition: all .2s ease-in-out;
    cursor: pointer;
    width: 60px;
    height: 60px;
    color: inherit;

    i {
      font-size: 44px;
    }

    img {
      position: relative;
      top: 3px;
      width: 40px;

    }

    &:hover {
      animation: shake 150ms 2 linear;
    }
  }
}
</style>
<script setup lang="ts">
</script>
