<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">My Timeline</h2>

      <!-- Slider connected to activeTimeline -->
      <v-slider
        v-model="activeTimeline"
        :max="4"
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
              <h4 class="timeline-title">
                {{ item.title }}
              </h4>
              <v-row>
                <v-col cols="12" md="6">
                  <p>{{ item.description }}</p>
                </v-col>
                <v-col cols="12" md="6">
                  <Griddy :key="activeTimeline" />
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
}

.container {
  display: block;
  height: 100vh;
}

.timeline-slider {
  padding: 3rem 0;
}

.timeline {
  position: relative;
  overflow: hidden;
  color: white;

  .timeline-inner {
    display: flex;
    transition: transform 0.5s ease;
    width: 100%;
  }

  .timeline-container {
    width: 100%;
    flex-shrink: 0;
    display: block;

    .timeline-icon {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      text-align: center;
      font-size: 2rem;
      background: $secondary;
    }

    .timeline-body {
      background: $timeline-body-bg;
      border-radius: $timeline-body-round;
      padding: 2rem 2rem 3rem;
      //box-shadow: $timeline-body-shadow;
    }

    .badge {
      background: $secondary;
      padding: 4px 8px;
      border-radius: 3px;
      font-size: 12px;
      font-weight: bold;
    }

    &.primary .badge,
    &.primary .timeline-icon {
      background: $primary;
    }

    &.danger .badge,
    &.danger .timeline-icon {
      background: $danger;
    }

    &.success .badge,
    &.success .timeline-icon {
      background: $success;
    }

    &.warning .badge,
    &.warning .timeline-icon {
      background: $warning;
    }

    &.info .badge,
    &.info .timeline-icon {
      background: $info;
    }
  }
}
</style>
