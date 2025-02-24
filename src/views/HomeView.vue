<template>
  <div class="home-view">

    <SectionIntro />
    <SectionResume />

    <!-- Lazy-load these sections -->
    <Suspense>
      <template #default>
        <SectionCaseStudies />
      </template>
      <template #fallback>
        <div>Loading Case Studies...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionProjects />
      </template>
      <template #fallback>
        <div>Loading Projects...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionDesigns />
      </template>
      <template #fallback>
        <div>Loading Designs...</div>
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionTimeline />
      </template>
      <template #fallback>
        <div>Loading Timeline...</div>
      </template>
    </Suspense>

  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import SectionIntro from "../components/SectionIntro.vue";
import SectionResume from "../components/SectionResume.vue";

// Lazy-load these sections
const SectionCaseStudies = defineAsyncComponent(() => import('../components/SectionCaseStudies.vue'));
const SectionProjects = defineAsyncComponent(() => import('../components/SectionProjects.vue'));
const SectionDesigns = defineAsyncComponent(() => import('@/components/SectionDesigns.vue'));
const SectionTimeline = defineAsyncComponent(() => import('../components/SectionTimeline.vue'));
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  overflow: visible;
}
</style>
