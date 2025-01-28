<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <h2 class="heading">Case Studies</h2>
      <p class="intro">
        Over the past 20+ years, I’ve specialized in developing SaaS applications and paid software for diverse industries.
        While I can’t share specific client projects due to confidentiality, I’m happy to discuss my process and contributions in detail.
      </p>

      <ul class="case-study-links">
        <li
          v-for="(caseStudy, index) in caseStudies"
          :key="index"
          :class="`case-item item-${index}`"
        >
          <router-link
            class="link"
            :to="{ name: 'case-study', params: { caseStudyID: caseStudy.id } }"
          >
            <v-icon start>mdi-button-pointer</v-icon>
            <strong>Case Study:</strong> {{ caseStudy.title }}
          </router-link>
        </li>
      </ul>

      <CaseStudyModal
        v-model="isModalOpen"
        :caseStudyID="currentCaseStudyID"
      />
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CaseStudyModal from '../components/CaseStudyModal.vue';

gsap.registerPlugin(ScrollTrigger);

const currentCaseStudyID = ref<string | null>(null);
const isModalOpen = ref(false);
const caseStudies = ref([
  {
    id: 'case-study-competitions',
    title: 'Driving Engagement Through Interactive Classroom Competitions',
  },
  {
    id: 'case-study-liberty',
    title: 'Transforming a Legacy Insurance Quoting System with Modern Technologies',
  },
  {
    id: 'case-study-algaecal',
    title: 'Modernizing a Large-Scale E-Commerce Site and Blog for AlgaeCal',
  },
]);

const route = useRoute();
const router = useRouter();

// Watch the route for caseStudyID
watch(
  () => route.params.caseStudyID,
  (caseStudyID) => {
    if (caseStudyID) {
      currentCaseStudyID.value = caseStudyID as string;
      isModalOpen.value = true;
    } else {
      currentCaseStudyID.value = null;
      isModalOpen.value = false;
    }
  },
  { immediate: true }
);

// Watch the modal's state and handle URL changes
watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    router.push({ name: 'home' }); // Reset URL when modal is closed
  }
});

// GSAP animations
onMounted(() => {
  const items = document.querySelectorAll('.case-item');

  items.forEach((item, index) => {
    const direction = index % 2 === 0 ? '-100%' : '100%'; // Alternate directions
    gsap.fromTo(
      item,
      { x: direction, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
});
</script>

<style lang="scss" scoped>
.intro {
  padding: 1rem 0 2rem;
}

.case-study-links {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    + li {
      margin-top: 1.5rem;
    }
  }
}

.case-item {
  opacity: 0; // Start invisible to allow animations
  transform: translateX(0); // Smooth initial transition
}

.link {
  position: relative;
  display: inline-block;
  width: 100%;

  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 400;
  color: initial;
  text-decoration: none;
  letter-spacing: 0.25px;
  background-color: transparent;
  overflow: visible;
  transition: all 0.3s ease;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background-color: rgba(var(--v-theme-secondary), 0.5);
    z-index: -1;
    transition: transform 0.3s ease, opacity 0.3s ease;
    border-radius: 8px;
  }

  &:hover {
    color: white;

    &::after {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translate(5px, 10px);
    width: 100%;
    height: 100%;
    background-color: rgba(var(--v-theme-primary), 0.05);
    z-index: -2;
    transition: transform 0.4s ease-out, background-color 0.4s ease-out;
    border-radius: 8px;
  }

  &:hover::before {
    transform: translate(-50%, -50%) translate(0, 0);
    background-color: rgba(var(--v-theme-secondary), 1);
  }
}

@media (min-width: 600px) {
  li {
    + li {
      margin-top: 1rem;
    }
  }

  .link {
    padding: 2rem;
    font-size: 1.35rem;
  }
}
</style>
