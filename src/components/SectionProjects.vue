<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <AppHeading
        color="light"
        title="Current Projects"
        subtitle="Let’s just say these projects are under construction... and always will be."
      />

      <TerminalWindow>
        <ul class="project-links">
          <li>
            <a
              href="https://www.keyandchord.com"
              target="_blank"
              class="link"
            >
              <img src="/project-image-key-and-chord.jpg" alt="Key and Chord">
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              An interactive piano chord dictionary built with Vue for the front end and Firebase for the backend API. It features dynamic chord diagrams, a virtual piano, and Firestore integration for real-time access to chords and inversions across all keys.
            </div>
          </li>

          <li>
            <a
              href="https://caseys-app-design-hadithi.netlify.app"
              target="_blank"
              class="link"
            >
              <img src="/project-image-hadithi.jpg" alt="Hadithi">
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Website design for an Arts and Culture publication. This is the front end development site only. I have designed everything and built it with javascript, Vue, and CSS.
            </div>
          </li>

          <li>
            <a
              href="https://crypto-keepr.netlify.app/"
              target="_blank"
              class="link"
            >
              <img src="/project-image-crypto.jpg" alt="Crypto Tracker">
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Information site for cryptocurrencies. This is an ongoing side project in development. It leverages some open source API's for the data along with Chart.js for the visualizations.
            </div>
          </li>

        </ul>
      </TerminalWindow>

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
import AppHeading from "@/components/AppHeading.vue";

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
  color: #ffffff;
}

.project-links {
  list-style-type: none;
  margin: 0;
  padding: 2rem 0;

  li {
    display: flex;
    gap: 1rem;

    + li {
      margin-top: 1rem;
    }
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

  .overlay {
    position: absolute;
    top: 10px;
    //left: 0;
    right: 10px;
    //bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    //justify-content: center;
    //align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }

  .v-icon {
    font-size: 2rem;
    color: #25e0cb;
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

</style>
