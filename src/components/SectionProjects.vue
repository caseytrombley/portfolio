<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <!--      <AppHeading-->
      <!--        color="light"-->
      <!--        title="Current Projects"-->
      <!--        subtitle="Let’s just say these projects are under construction... and always will be."-->
      <!--      />-->

      <TerminalWindow>
        <ul class="project-links" ref="listRef">
          <li>
            <a href="https://nexum-site.netlify.app/" target="_blank" class="link">
              <img src="/project-image-nexum.jpg" alt="Nexum" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Leading both the Figma design and front-end development for Nexum’s new website,
              creating refined, custom UI components that reflect the company’s authority in
              cybersecurity and network defense.
            </div>
          </li>

          <li>
            <a href="https://unlocked-home.netlify.app/" target="_blank" class="link">
              <img src="/project-image-unlocked.jpg" alt="Unlocked Real Estate" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Developed a fully custom, responsive website for Unlocked Real Estate, translating
              detailed Figma designs into polished, high-performance UI components.
            </div>
          </li>

          <li>
            <a href="https://www.keyandchord.com" target="_blank" class="link">
              <img src="/project-image-key-and-chord.jpg" alt="Key and Chord" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              An interactive piano chord dictionary with dynamic chord diagrams and inversions for
              all musical keys.
            </div>
          </li>

          <li>
            <a href="https://jokesterapp.netlify.app/" target="_blank" class="link">
              <img src="/project-image-jokester.jpg" alt="Jokester" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Jokester is a fun, interactive app for browsing, rating, and adding jokes across
              categories like programming, general, and knock-knock. With features like custom joke
              creation, star ratings, and punchline reveals, it's built to bring laughs and a
              playful UI to your day — perfect for developers, friends, or anyone who needs a quick
              chuckle.
            </div>
          </li>

          <li>
            <a href="https://wifilocator.netlify.app/" target="_blank" class="link">
              <img src="/project-image-wifilocator.jpg" alt="WiFi Locator" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              WiFi Locator is an interactive map-based app that helps you find free public Wi-Fi
              hotspots in cities across the U.S. Just search for a city, and instantly explore
              nearby hotspots using real-time OpenStreetMap data — perfect for remote workers,
              travelers, and anyone in need of a reliable internet connection on the go.
            </div>
          </li>

          <li>
            <a href="https://crypto-keepr.netlify.app/" target="_blank" class="link">
              <img src="/project-image-crypto.jpg" alt="Crypto Tracker" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Information site for cryptocurrencies. This is an ongoing side project in development.
              It leverages some open source API's for the data along with Chart.js for the
              visualizations.
            </div>
          </li>

          <li>
            <a href="https://caseys-app-design-hadithi.netlify.app" target="_blank" class="link">
              <img src="/project-image-hadithi.jpg" alt="Hadithi" />
              <div class="overlay">
                <v-icon>mdi-open-in-new</v-icon>
              </div>
            </a>
            <div class="description">
              Website design for an Arts and Culture publication. This is the front end development
              site only. I have designed everything and built it with javascript, Vue, and CSS.
            </div>
          </li>
        </ul>
      </TerminalWindow>

      <ProjectModal v-model="isModalOpen" :projectID="currentProjectID" />
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectModal from '../components/ProjectModal.vue'
import TerminalWindow from './TerminalWindow.vue'
import AppHeading from '@/components/AppHeading.vue'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const listRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()

  const items = listRef.value?.querySelectorAll('li')
  if (!items || items.length === 0) return

  items.forEach((item, i) => {
    gsap.fromTo(
      item,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            const baseDelay = i * 150
            const randomOffset = Math.random() * 300
            setTimeout(() => {
              item.classList.add('glitch')
            }, baseDelay + randomOffset)
          },
          onLeaveBack: () => {
            item.classList.remove('glitch')
          },
        },
      },
    )
  })

  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
})

const currentProjectID = ref<string | null>(null)
const isModalOpen = ref(false)

const route = useRoute()
const router = useRouter()

watch(
  () => route.params.projectID,
  (projectID) => {
    if (projectID) {
      currentProjectID.value = projectID as string
      isModalOpen.value = true
    } else {
      currentProjectID.value = null
      isModalOpen.value = false
    }
  },
  { immediate: true },
)

watch(isModalOpen, (isOpen) => {
  if (!isOpen) {
    router.push({ name: 'home' })
  }
})
</script>

<style lang="scss" scoped>
$blue: #25e0cb;

section {
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 0, 255, 0.1);
  //background-color: #272727;
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
    flex-direction: column;
    gap: 1rem;

    + li {
      margin-top: 1rem;
    }

    &.glitch {
      .link {
        &::before {
          animation: glitchFlicker 3s infinite;
        }
      }
    }
  }
}

.link {
  position: relative;
  //min-width: 130px;
  //height: 130px;
  color: #0e6e66;
  text-decoration: none;
  //border: 6px solid #25e0cb;
  border-radius: 5px;
  background-color: transparent;
  transition: all 0.3s ease;
  overflow: visible;

  &:hover {
    border-color: #0e6e66;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //background: #25e0cb;
    box-shadow:
      rgba(37, 224, 203, 0.12) 0 1px 3px,
      rgba(37, 224, 203, 0.24) 0px 1px 2px;
    border-top: 3px solid #0e6e66;
    border-right: 2px solid #0c4b44;
    border-left: 4px solid #0e6e66;
    border-bottom: 3px solid #1eb4a3;
    border-radius: 5px;
    pointer-events: none;
    z-index: 2;
    //opacity: 0;
    transform: translate(0, 0);
    opacity: 0.5;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
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
  //font-family: "Syne Mono", serif, monospace;
  //font-weight: 800;
  font-size: 1rem;
  line-height: 1.1;
  color: #a0a0a0;
}

@media (min-width: 480px) {
  .project-links {
    li {
      flex-direction: row;
    }
  }
  .link {
    min-width: 130px;
    height: 130px;
  }
}

@media (min-width: 600px) {
  .link {
    min-width: 160px;
    height: 160px;
  }

  .description {
    font-size: 1.1rem;
    line-height: 1;
  }
}
</style>
