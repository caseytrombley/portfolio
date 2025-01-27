<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">Work Experience</h2>

      <ul class="experience-list">
        <li v-for="(item, i) in experience" :key="i" class="item">
          <div class="item-row">
            <div class="box box-left">
              <h4>
                {{ item.title }} at {{ item.company }}
              </h4>
              <p>
                {{ item.description }}
              </p>
            </div>
            <div class="box box-right">
              <p class="label">
                {{ item.dates }}
              </p>
            </div>
          </div>
          <div class="line"></div>
        </li>
      </ul>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience } from '../content/index.ts';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  const heading = document.querySelector(".heading");
  const items = document.querySelectorAll(".item");

  if (heading) {
    gsap.fromTo(
      heading,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heading,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );
  }

  items.forEach((item) => {
    const boxLeft = item.querySelector(".box-left");
    const boxRight = item.querySelector(".box-right");
    const line = item.querySelector(".line");

    // GSAP ScrollTrigger animation
    gsap.fromTo(
      boxLeft,
      { x: "-33%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom", // Start animation when the top of item hits the bottom of viewport
          end: "top 70%", // End animation when the top of item hits the center of viewport
          scrub: true, // Sync animation to scroll
        },
      }
    );

    gsap.fromTo(
      boxRight,
      { x: "33%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "top 70%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      line,
      {
        y: "-100px",
        opacity: 0,
        height: "10px",
        width: "0"
      },
      {
        y: "0px",
        opacity: 1,
        height: "3px",
        width: "100%",
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
  padding-bottom: 3rem;
  background-color: rgba(255, 0, 255, 0.1);
}

.experience-list {
  list-style-type: none;
  margin: 0;
  padding: 0;

  .item {
    margin-bottom: 2rem;
  }
}

.item-row {
  display: block;
  padding: 3rem 0;
}

.box + .box {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .item-row {
    display: flex;
    justify-content: space-between;
    padding: 3rem 0;
  }
  .box + .box {
    margin: 0;
  }
}

.line {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #cccccc;
  border-radius: 15px;
  text-align: center;
}

.box-left,
.box-right {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.box-left {
  padding: 0 2rem 0 0;

  p {
    max-width: 600px;
  }
}
.v-theme--dark {
  .item {
    border-color: rgba(255,255,255,0.05);
  }
  .line {
    background-color: rgba(255,255,255,0.05);
  }
}
.v-theme--light {
  .item {
    border-color: rgba(0,0,0,0.05);
  }
  .line {
    background-color: rgba(0,0,0,0.05);
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
