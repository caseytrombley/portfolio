<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">

      <h2 class="heading">Recent Projects</h2>

      <TerminalWindow>
        <ul class="project-links">
          <li>
<!--            <router-link-->
<!--              class="link"-->
<!--              :to="{ name: 'project', params: { projectID: 'project-key-and-chord' } }"-->
<!--            >-->
<!--              <img src="/project-image-key-and-chord.jpg" alt="Key and Chord">-->
<!--            </router-link>-->
            <a
              href="https://www.keyandchord.com"
              target="_blank"
              class="link"
            >
              <img src="/project-image-key-and-chord.jpg" alt="Key and Chord">
            </a>
            <div class="description">
              An interactive piano chord dictionary built with Vue for the front end and Firebase for the backend API. It features dynamic chord diagrams, a virtual piano, and Firestore integration for real-time access to chords and inversions across all keys.
            </div>
          </li>

        </ul>
      </TerminalWindow>


<!--      <p class="intro">-->
<!--        Over the past 20+ years, I’ve specialized in developing SaaS applications and paid software for diverse industries.-->
<!--        While I can’t share specific client projects due to confidentiality, I’m happy to discuss my process and contributions in detail.-->
<!--      </p>-->



      <ProjectModal
        v-model="isModalOpen"
        :projectID="currentProjectID"
      />
    </v-container>

  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProjectModal from '../components/ProjectModal.vue';
import TerminalWindow from "./TerminalWindow.vue";

const currentProjectID = ref<string | null>(null);
const isModalOpen = ref(false);

const route = useRoute();
const router = useRouter();

// Watch the route for projectID
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

// Watch the modal's state and handle URL changes
watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    router.push({ name: 'home' }); // Reset URL when modal is closed
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
  margin: 0 0 2rem;
  color: #ffffff;
}

.intro {
  padding: 1rem 0;
}

.project-links {
  list-style-type: none;
  margin: 0;
  padding: 2rem 0;

  li {
    display: flex;
    gap: 1rem;
  }
}

.link {
  position: relative;
  min-width: 130px;
  height: 130px;
  color: #0e6e66;
  text-decoration: none;
  border: 6px solid #25e0cb;
  border-radius: 3px;
  background-color: transparent;
  transition: all 0.3s ease;

  &:hover {
    border-color: #0e6e66;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.description {
  font-family: "Syne Mono", serif, monospace;
  font-weight: 800;
  font-size: 1.125rem;
  line-height: 1.1;
  color: #25e0cb;
}

@media (min-width: 600px) {

  .link {
    position: relative;
    min-width: 160px;
    height: 160px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .description {
    font-size: 1.25rem;
    line-height: 1;
  }
}



//.v-theme--dark {
//  .section {
//    background-color: #0e6e66;
//  }
//}
//.v-theme--light {
//  .section {
//    background-color: rgba(var(--v-theme-primary), 1);
//  }
//}
</style>
