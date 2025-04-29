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
        <SectionSkeleton name="Case Studies" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionProjects />
      </template>
      <template #fallback>
        <SectionSkeleton name="Current Projects" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionDesigns />
      </template>
      <template #fallback>
        <SectionSkeleton name="Past Projects" />
      </template>
    </Suspense>

    <Suspense>
      <template #default>
        <SectionBlog />
      </template>
      <template #fallback>
        <SectionSkeleton name="My Recent Posts" />
      </template>
    </Suspense>



    <!--    <Suspense>-->
<!--      <template #default>-->
<!--        <SectionTimeline />-->
<!--      </template>-->
<!--      <template #fallback>-->
<!--        <div>Loading Timeline...</div>-->
<!--      </template>-->
<!--    </Suspense>-->



  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import SectionIntro from "../components/SectionIntro.vue";
import SectionResume from "../components/SectionResume.vue";
import SectionSkeleton from "@/components/SectionSkeleton.vue";

// Lazy-load these sections
const SectionCaseStudies = defineAsyncComponent(() => import('../components/SectionCaseStudies.vue'));
const SectionProjects = defineAsyncComponent(() => import('../components/SectionProjects.vue'));
const SectionDesigns = defineAsyncComponent(() => import('@/components/SectionDesigns.vue'));
const SectionTimeline = defineAsyncComponent(() => import('../components/SectionTimeline.vue'));
const SectionBlog = defineAsyncComponent(() => import('../components/SectionBlog.vue'));
</script>

<style lang="scss" scoped>
.home-view {
  position: relative;
  overflow: visible;
}
</style>
