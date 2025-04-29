<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <AppHeading
        title="Past Projects"
        subtitle="Built with ambition, duct tape, and a dream."
        color="light"
      />

      <div class="projects-grid">
        <div
          v-for="project in projects"
          :key="project.id"
          class="project-item"
          @click="openProject(project.id)"
        >
          <img :src="project.image" :alt="`Project ${project.id}`" class="project-image" />
        </div>
      </div>

      <ProjectModal v-model="isModalOpen" :projectID="currentProjectID" />
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectModal from '../components/ProjectModal.vue';
import AppHeading from "@/components/AppHeading.vue";

const currentProjectID = ref<string | null>(null);
const isModalOpen = ref(false);
const route = useRoute();
const router = useRouter();

const projects = [
  { id: 'design-afs', image: '/designs/design-afs.png' },
  { id: 'design-radio', image: '/designs/design-radio.png' },
  { id: 'design-iecm', image: '/designs/design-iecm.png' },
  { id: 'design-stark', image: '/designs/design-stark.png' },
  { id: 'design-go', image: '/designs/design-go.png' },
  { id: 'design-apps', image: '/designs/design-apps.png' },
  { id: 'design-invitations', image: '/designs/design-invitations.png' },
];

const openProject = (projectID: string) => {
  currentProjectID.value = projectID;
  isModalOpen.value = true;
};

watch(
  () => route.params.projectID,
  (projectID) => {
    if (projectID) {
      currentProjectID.value = projectID as string;
      isModalOpen.value = true;
    } else {
      currentProjectID.value = null;
      isModalOpen.value = false;
    }
  },
  { immediate: true }
);

watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    router.push({ name: 'home' });
  }
});
</script>

<style lang="scss" scoped>
section {
  position: relative;
  overflow: hidden;
  background-color: #272727;
}
.heading {
  color: #ffffff;
}

.intro {
  padding: 1rem 0;
  color: #ddd;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem 0;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.project-item {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}
</style>
