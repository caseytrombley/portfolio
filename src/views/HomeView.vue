<template>
  <div class="home-view">

<!--    <SectionArtwork />-->
    <SectionIntro />

    <SectionResume />
    <SectionTimeline />
    <SectionArtwork />
  </div>
</template>
<script setup lang="ts">
import SectionIntro from "../components/SectionIntro.vue";
import SectionResume from "../components/SectionResume.vue";
import SectionTimeline from "../components/SectionTimeline.vue";
import SectionArtwork from "../components/SectionArtwork.vue";
</script>
<style lang="scss" scoped>
.home-view {
  position: relative;
  overflow: visible;
}
</style>

