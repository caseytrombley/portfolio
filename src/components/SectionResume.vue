<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <h2>Experience</h2>

      <div class="item">
        <div class="box-left">
          <h4>
            Senior Software Engineer at Explore Learning
          </h4>
          <p>
            Designed and developed javascript apps
          </p>
        </div>
        <div class="box-right">
          <p class="label">
            November 2022 - November 2024
          </p>
        </div>
      </div>

      <div class="item">
        <div class="box-left">
          <h4>
            Senior Software Engineer at Explore Learning
          </h4>
          <p>Designed and developed javascript apps
          </p>
        </div>
        <div class="box-right">
          <p class="label">
            November 2022 - November 2024
          </p>
        </div>
      </div>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const boxLeft = item.querySelector(".box-left");
    const boxRight = item.querySelector(".box-right");

    // GSAP ScrollTrigger animation
    gsap.fromTo(
      boxLeft,
      { x: "-100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom", // Start animation when the top of item hits the bottom of viewport
          end: "top center", // End animation when the top of item hits the center of viewport
          scrub: true, // Sync animation to scroll
        },
      }
    );

    gsap.fromTo(
      boxRight,
      { x: "100%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  });
});
</script>



<style lang="scss" scoped>
section {
  background-color: rgba(255, 0, 255, 0.1);
}
h2 {

}

.item {
  display: flex;
  justify-content: space-between;
  padding: 3rem 0;
  border-bottom: 3px solid #cccccc;
}

h4 {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
}

.label {
  font-size: 1.1rem;
  font-weight: 400;
  line-height: 1.1;
  opacity: 0.4;
}

.box-left,
.box-right {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.v-theme--dark {
  .item {
    border-color: rgba(255,255,255,0.05);
  }
}
.v-theme--light {
  .item {
    border-color: rgba(0,0,0,0.05);
  }
}

@media (min-width: 600px) {
  h4 {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  .label {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 1.2;
  }

}

</style>
