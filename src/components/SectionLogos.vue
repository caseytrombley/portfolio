<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <AppHeading
        title="Logos & Illustration"
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

      <LogoModal
        v-model="isModalOpen"
        :logo="currentLogo.image"
        :index="currentIndex"
        :total="logos.length"
        @next="nextLogo"
        @prev="prevLogo"
      />

    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AppHeading from '@/components/AppHeading.vue';
import LogoModal from "@/components/LogoModal.vue";

const logos = [
  { id: 'afs1-01', image: '/logos/afs1-01.png' },
  { id: 'afs2-01', image: '/logos/afs2-01.png' },
  { id: 'agentportal-01', image: '/logos/agentportal-01.png' },
  { id: 'ar1-01', image: '/logos/ar1-01.png' },
  { id: 'ar2-01', image: '/logos/ar2-01.png' },
  { id: 'brewcraft-01', image: '/logos/brewcraft-01.png' },
  { id: 'dereva-01', image: '/logos/dereva-01.png' },
  { id: 'dialog1-01', image: '/logos/dialog1-01.png' },
  { id: 'dialog2-01', image: '/logos/dialog2-01.png' },
  { id: 'dialog3-01', image: '/logos/dialog3-01.png' },
  { id: 'dialog4-01', image: '/logos/dialog4-01.png' },
  { id: 'dialog5-01', image: '/logos/dialog5-01.png' },
  { id: 'dialog6-01', image: '/logos/dialog6-01.png' },
  { id: 'dialog7-01', image: '/logos/dialog7-01.png' },
  { id: 'greenhill-01', image: '/logos/greenhill-01.png' },
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
  { id: 'mpishi-01', image: '/logos/mpishi-01.png' },
  { id: 'picha-01', image: '/logos/picha-01.png' },

  { id: 'thomeimagesstudy-01', image: '/logos/thomeimagesstudy-01.png' },
  { id: 'thomeimages-01', image: '/logos/thomeimages-01.png' },
  { id: 'team360-01', image: '/logos/team360-01.png' },
  { id: 'captain3-01', image: '/logos/captain3-01.png' },
  { id: 'zeroturbulence-01', image: '/logos/zeroturbulence-01.png' },
  { id: 'm2s-01', image: '/logos/m2s-01.png' },
  { id: 'm2s2-01', image: '/logos/m2s2-01.png' },
  { id: 'captain2-01', image: '/logos/captain2-01.png' },
  { id: 'captain1-01', image: '/logos/captain1-01.png' },
  { id: 'captainposter-01', image: '/logos/captainposter-01.png' },
  { id: 'guidedbywires-01', image: '/logos/guidedbywires-01.png' },
  { id: 'philreddyjr-01', image: '/logos/philreddyjr-01.png' },
  { id: 'philreddyjr2-01', image: '/logos/philreddyjr2-01.png' },
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
