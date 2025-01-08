<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <h2>Experience</h2>
      <div class="text">
        <p></p>
      </div>
      <div class="image">

      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
section {
  background-color: rgba(255, 0, 255, 0.1);
}
h1 {
  opacity: 0;
  animation: drop 0.3s ease-in-out forwards;
  animation-delay: .5s;
}

.text {
  position: absolute;
  padding: 0 15px 0 2px;
  // opacity: 0;
  // transform: rotate(-1deg);
  //animation: textAnim 0.3s ease-in-out forwards;
  //animation-delay: .6s;
}

.image {
  width: 100%;

}

p {
  font-size: 1.2rem;
  line-height: 1.2;
  white-space: pre-wrap;
}

@media (min-width: 600px) {
  p {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .text {
    position: absolute;
    width: 95%
  }

  .image {
    width: 50%;
    transform: translateX(50%) translateY(0px);
  }
}

@keyframes textAnim {
  0% {
    opacity: 0;
    transform: translateX(-1000px) rotate(-1deg);
  }
  80% {
    opacity: 1;
    transform: translateX(20px) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotate(-1deg);
  }
}

@keyframes textAnim2 {
  0% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateX(0) translateY(5px) rotate(-1deg);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
}

@keyframes imageAnim {
  0% {
    opacity: 0;
    transform: translateX(300%) translateY(-20px);
  }
  80% {
    opacity: 1;
    transform: translateX(55%) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(50%) translateY(-20px);
  }
}

@keyframes imageAnim2 {
  0% {
    transform: scale(1.3) skewX(6deg) skewY(-1deg);
  }
  50% {
    transform: scale(1.4) skewX(3deg) skewY(-1deg);
  }
  100% {
    transform: scale(1.3) skewX(6deg) skewY(-1deg);
  }
}

@media (max-width: 599px) {
  @keyframes imageAnim {
    0% {
      opacity: 0;
      transform: translateX(300%) translateY(12px);
    }
    80% {
      opacity: 1;
      transform: translateX(25%) translateY(12px);
    }
    100% {
      opacity: 1;
      transform: translateX(20%) translateY(12px);
    }
  }

  @keyframes imageAnim2 {
    0% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
    50% {
      transform: scale(1.6) skewX(3deg) skewY(-1deg);
    }
    100% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
  }
}

</style>
