<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">My Journey</h2>

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
              <div class="front-layer">

                <TimelineItem :item="item" />


<!--                <v-row>-->
<!--                  <v-col cols="12" md="6">-->
<!--                    <div class="text">-->
<!--                      <h4 class="timeline-title">-->
<!--                        {{ item.title }}-->
<!--                      </h4>-->
<!--                      <p>{{ item.description }}</p>-->
<!--                    </div>-->
<!--                  </v-col>-->
<!--                  <v-col cols="12" md="6">-->
<!--                    <div class="composition">-->
<!--                      this is a content layer I will use to position images-->

<!--                    </div>-->
<!--                  </v-col>-->
<!--                </v-row>-->
              </div>


            </div>
          </div>


        </div>

        <div class="background-layer">
          <div class="overlay"></div>
          <Griddy />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tickLabels, timelineData } from "../content/index";
import Griddy from "./Griddy.vue";
import TimelineItem from "./TimelineItem.vue";

const activeTimeline = ref(0);
</script>

<style lang="scss" scoped>

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
.overlay {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}


.v-theme--dark {
  .overlay {
    background: linear-gradient(to top, #121212 0%, transparent 200px);
    background-repeat: no-repeat;
  }
}

.v-theme--light {
  .overlay {
    background: linear-gradient(to top, #f5fefc 0%, transparent 200px);
    background-repeat: no-repeat;
  }
}

.container {
  display: block;
  height: 100vh;
}

.text {
  padding: 3rem 3rem;
  //background: #27293d;
  //border-radius: 5px;

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
}
.timeline-inner {
  position: relative;
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
  z-index: 1;
}
.timeline-container {
  width: 100%;
  flex-shrink: 0;
  display: block;
  z-index: 2;
}
.timeline-body {
  position: relative;
}

</style>
