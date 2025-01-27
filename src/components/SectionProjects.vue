<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">Case Studies</h2>
      <div class="text">
        <p>
          Over the past 20+ years, I’ve specialized in developing SaaS applications and paid software for diverse industries.
          While I can’t share specific client projects due to confidentiality, I’m happy to discuss my process and contributions in detail.
        </p>
      </div>

      <div
        class="big-link"
        @click="openCaseStudyModal('case-study-competitions')"
      >
        Case Study: Driving Engagement Through Interactive Classroom Competitions
      </div>
      <div
        class="big-link"
        @click="openCaseStudyModal('case-study-liberty')"
      >
        Case Study: Transforming a Legacy Insurance Quoting System with Modern Technologies
      </div>
      <div
        class="big-link"
        @click="openCaseStudyModal('case-study-algaecal')"
      >
        Case Study: Modernizing a Large-Scale E-Commerce Site and Blog for AlgaeCal
      </div>

      <CaseStudyModal
        v-model="isModalOpen"
        :caseStudyID="currentCaseStudyID"
      />
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CaseStudyModal from './CaseStudyModal.vue';

const currentCaseStudyID = ref<string | null>(null);
const isModalOpen = ref(false);

const openCaseStudyModal = (id: string) => {
  currentCaseStudyID.value = id;
  isModalOpen.value = true;
};
</script>

<style scoped>
.big-link {
  cursor: pointer;
  color: #007bff;
  font-weight: bold;
}

.big-link:hover {
  text-decoration: underline;
}
</style>
