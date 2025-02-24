<template>
  <div class="video-background">
    <div class="video-overlay"></div>
    <video
      autoplay
      loop
      muted
      class="background-video"
      :src="videoSource"
    ></video>
  </div>
</template>

<script setup lang="ts">
const videoSource = '/background-video.mp4';
</script>

<style lang="scss" scoped>
.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;

}

.background-video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.v-theme--dark {
  .video-overlay {
    background: rgba(0,0,0,.8);
  }
}
.v-theme--light {
  .video-overlay {
    background: rgba(255, 255, 255, 0.9);
    mix-blend-mode: hard-light;
  }
}
</style>
