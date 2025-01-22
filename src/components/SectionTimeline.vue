<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">My Timeline</h2>

      <!-- Slider connected to activeTimeline -->
      <v-slider
        v-model="activeTimeline"
        :max="3"
        :ticks="tickLabels"
        show-ticks="always"
        step="1"
        tick-size="4"
        elevation="0"
        class="timeline-slider"
      >
      </v-slider>

      <!-- Timeline -->
      <div class="timeline">
        <div
          class="timeline-inner"
          :style="{ transform: `translateX(-${activeTimeline * 100}%)`, transition: 'transform 0.5s ease' }"
        >
          <div
            class="timeline-container"
            v-for="(item, index) in timelineData"
            :key="index"
            :class="item.class"
            :style="{
              opacity: index === activeTimeline ? 1 : 0,
              zIndex: index === activeTimeline ? 1 : 0,
              transition: 'opacity .3s ease-out'
            }"
          >
            <div class="timeline-body">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="text">
                    <h4 class="timeline-title">
                      {{ item.title }}
                    </h4>
                    <p>{{ item.description }}</p>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="composition">
                    <div class="front-layer">
                      this is a content layer I will use to position images
                    </div>
                    <div class="background-layer">
                      <Griddy :key="activeTimeline" />
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tickLabels, timelineData } from "../content/index";
import Griddy from "./Griddy.vue";

const activeTimeline = ref(0);
</script>

<style lang="scss" scoped>
/* CSS Variables */
$primary: #1d8cf8;
$secondary: #4f537b;
$info: #11cdef;
$success: #00bf9a;
$warning: #ff8d72;
$danger: #fd5d93;

$timeline-body-bg: #27293d;
$timeline-body-round: 3px;
$timeline-body-shadow: 1px 3px 9px rgba(0, 0, 0, 0.1);

::v-deep {
  .v-slider-thumb {
    color: transparent;
    &__focused {
      outline-color: transparent;
    }
    &__surface {
      height: 90px;
      width: 30px;
      border-radius: 2px;
      background: rgb(248 29 81 / 32%);
    }
  }
  .v-slider-track__tick-label {

    @media (max-width: 599px) {
      font-size: .75em;
    }
  }
}

.container {
  display: block;
  height: 100vh;
}

.text {
  padding: 2rem;
  background: $timeline-body-bg;
  border-radius: $timeline-body-round;

  p {
    font-size: 1.125rem;
  }
}

.composition {
  position: relative;
}

.front-layer {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-layer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 0;
}

.timeline-slider {
  padding: 3rem 0;
}

.timeline {
  position: relative;
  overflow: hidden;

  .timeline-inner {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }

  .timeline-container {
    width: 100%;
    flex-shrink: 0;
    display: block;
  }
}
</style>
