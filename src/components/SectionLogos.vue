<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <AppHeading
        title="Logo Design & Illustration"
        subtitle="A collection of branding work."
      />

      <div class="logos-grid">
        <div
          v-for="(logo, index) in logos"
          :key="index"
          class="logo-item"
          @click="openModal(index)"
        >
          <img :src="logo.image" :alt="`Logo ${index + 1}`" class="logo-image" />
        </div>
      </div>

      <v-dialog v-model="isModalOpen" max-width="600px">
        <v-card>
          <v-img
            :src="currentLogo.image"
            :alt="currentLogo.id"
            contain
            height="400"
          ></v-img>
          <v-card-actions class="justify-between">
            <v-btn @click="prevLogo" :disabled="currentIndex === 0">Previous</v-btn>
            <v-btn @click="nextLogo" :disabled="currentIndex === logos.length - 1">Next</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppHeading from '@/components/AppHeading.vue';

const logos = [
  { id: 'afs1-01', image: '/logos/afs1-01.png' },
  { id: 'afs2-01', image: '/logos/afs2-01.png' },
  { id: 'agentportal-01', image: '/logos/agentportal-01.png' },
  { id: 'ar1-01', image: '/logos/ar1-01.png' },
  { id: 'ar2-01', image: '/logos/ar2-01.png' },
  { id: 'brewcraft-01', image: '/logos/brewcraft-01.png' },
  { id: 'dialog1-01', image: '/logos/dialog1-01.png' },
  { id: 'dialog2-01', image: '/logos/dialog2-01.png' },
  { id: 'dialog3-01', image: '/logos/dialog3-01.png' },
  { id: 'dialog4-01', image: '/logos/dialog4-01.png' },
  { id: 'dialog5-01', image: '/logos/dialog5-01.png' },
  { id: 'dialog6-01', image: '/logos/dialog6-01.png' },
  { id: 'dialog7-01', image: '/logos/dialog7-01.png' },
  { id: 'grm1-01', image: '/logos/grm1-01.png' },
  { id: 'grm2-01', image: '/logos/grm2-01.png' },
  { id: 'grm3-01', image: '/logos/grm3-01.png' },
  { id: 'grm4-01', image: '/logos/grm4-01.png' },
  { id: 'grm5-01', image: '/logos/grm5-01.png' },
  { id: 'leap1-01', image: '/logos/leap1-01.png' },
  { id: 'leap2-01', image: '/logos/leap2-01.png' },
  { id: 'leap3-01', image: '/logos/leap3-01.png' },
  { id: 'lux1-01', image: '/logos/lux1-01.png' },
  { id: 'lux2-01', image: '/logos/lux2-01.png' },
  { id: 'lux3-01', image: '/logos/lux3-01.png' },
  { id: 'lux4-01', image: '/logos/lux4-01.png' },
  { id: 'lux5-01', image: '/logos/lux5-01.png' },
  { id: 'team360-01', image: '/logos/team360-01.png' },
  { id: 'zeroturbulence-01', image: '/logos/zeroturbulence-01.png' }
];

const isModalOpen = ref(false);
const currentIndex = ref(0);

const openModal = (index: number) => {
  currentIndex.value = index;
  isModalOpen.value = true;
};

const nextLogo = () => {
  if (currentIndex.value < logos.length - 1) {
    currentIndex.value++;
  }
};

const prevLogo = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const currentLogo = computed(() => logos[currentIndex.value]);
</script>
<style scoped lang="scss">
.project-image {
  width: 100%;
  max-width: 150px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.logos-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
  padding: 2rem 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: #1f1f1f;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
}

.logo-image {
  max-width: 100%;
  border-radius: 5px;
}
</style>
