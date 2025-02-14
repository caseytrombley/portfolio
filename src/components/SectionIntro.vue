<template>
  <section class="intro grad-bottom">
    <v-container max-width="1200px" fluid class="container">
      <div class="intro-text">
        <h1>Welcome to my portfolio!</h1>
        <div class="paragraph">
          <p>{{ displayedText }}</p>
        </div>
      </div>
      <div class="intro-image" :class="{ 'fall': moveImageDown }">
        <AppKeyboard :activeKey="activeKey" />
      </div>

    </v-container>
    <div v-if="moveImageDown" class="animated-arrows">
      <span
        v-for="(arrow, index) in arrows"
        :key="index"
        class="arrow"
        :style="{ left: `${arrow.x}%`, top: `${arrow.y}%`}"
      >
        <v-icon :style="{fontSize: '200px'}" icon="mdi-arrow-down-thick" />
      </span>
    </div>
    <div class="bottom-div">
      <v-container max-width="1200px" fluid class="container">

        <div class="skills">
          <div v-if="isMobile">
            <div class="avatar-block" ref="avatarBlockRef">
              <img src="/avatar.png" alt="Avatar">
              <ContactMe />
            </div>
          </div>
          <div v-else class="col1">
            <div class="avatar" ref="avatarRef">
              <img src="/avatar.png" alt="Avatar">
              <ContactMe />
            </div>
          </div>
          <div class="col2">
            <div class="desc" ref="descRef">
              <h4 class="title">
                My top skills
              </h4>
              <div class="label">Languages<v-icon icon="mdi-arrow-down-right" class="icon" /></div>

              <div class="desc-items">
                <div class="grid">
                  <div class="grid-item">
                    <v-icon start>mdi-language-javascript</v-icon>
                    <span>JavaScript</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-language-typescript</v-icon>
                    <span>TypeScript</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-language-css3</v-icon>
                    <span>CSS</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-language-html5</v-icon>
                    <span>HTML</span>
                  </div>
                </div>
              </div>

              <div class="label">Frameworks<v-icon icon="mdi-arrow-down-right" class="icon" /></div>

              <div class="desc-items">
                <div class="grid">

                  <div class="grid-item">
                    <v-icon start>mdi-vuejs</v-icon>
                    <span>Vue</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-react</v-icon>
                    <span>React</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-code-block-braces</v-icon>
                    <span>Nuxt</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-fire-circle</v-icon>
                    <span>Firebase</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-code-braces</v-icon>
                    <span>Bootstrap</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-alpha-v</v-icon>
                    <span>Vuetify</span>
                  </div>
                  <div class="grid-item">
                    <v-icon start>mdi-alpha-t</v-icon>
                    <span>Tailwind</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </v-container>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import AppKeyboard from '../components/AppKeyboard.vue';
import { introText } from '../content/index.ts';
import ContactMe from "@/components/ContactMe.vue";

gsap.registerPlugin(ScrollTrigger);

const avatarBlockRef = ref(null);
const avatarRef = ref(null);
const descRef = ref(null);
const fullText = introText;
const displayedText = ref('');
const activeKey = ref('');
const isAnimationComplete = ref(false);
const moveImageDown = ref(false);
const arrows = ref<Array<{ x: number; y: number }>>([]);
const animateTriggered = ref(false);

const isMobile = ref(false);

function updateIsMobile() {
  isMobile.value = window.innerWidth <= 768; // Mobile size breakpoint
}

// Declare scrollTriggerInstance here
let scrollTriggerInstance: any = null;

// Function to animate typing
function typeText() {
  let index = 0;

  function typeNextChar() {
    if (index < fullText.length) {
      const currentChar = fullText[index];
      displayedText.value += currentChar;
      activeKey.value = currentChar.toLowerCase();
      index++;
      setTimeout(typeNextChar, 15);
    } else {
      activeKey.value = '';
      isAnimationComplete.value = true;

      // trigger some other anims
      setTimeout(() => {
        animateSkills();
        animateTriggered.value = true;
      }, 1200);

      setTimeout(() => {
        moveImageDown.value = true;
      }, 2200);
    }
  }

  typeNextChar();
}

// Initialize random arrows
function generateRandomArrows() {
  const numArrows = 13;
  for (let i = 0; i < numArrows; i++) {
    arrows.value.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
    });
  }
}

// Set the floating animation with GSAP
function animateArrows() {
  const container = document.querySelector('.animated-arrows');
  if (container) {
    const arrowElements = container.querySelectorAll('.arrow');
    arrowElements.forEach((arrow) => {
      const randomXMovement = (Math.random() - 1) * 20;
      const randomYMovement = (Math.random() - 2) * 20;

      gsap.to(arrow, {
        x: `+=${randomXMovement}`,
        y: `+=${randomYMovement}`,
        repeat: -1,
        yoyo: true,
        duration: Math.random() * 5 + 2,
        ease: 'power1.inOut',
      });
    });
  }
}

// GSAP animations for avatar and description
function animateSkills() {
  if (animateTriggered.value) return;

  const avatar = avatarRef.value;
  const avatarBlock = avatarBlockRef.value;
  const desc = descRef.value;

  if (avatarBlock) {
    gsap.fromTo(
      avatarBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }

  if (avatar) {
    gsap.fromTo(
      avatar,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  }

  if (desc) {
    gsap.fromTo(
      desc,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.1, ease: 'power2.out' }
    );
  }
}

onMounted(() => {
  const handleScroll = () => {
    if (!animateTriggered.value) {
      animateSkills();
      animateTriggered.value = true;
    }

    const avatar = avatarRef.value;
    const desc = descRef.value;

    if (avatar && desc) {
      // Ensure ScrollTrigger is only created once
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill(); // Kill any existing instance first
      }

      // Create new ScrollTrigger
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: desc,
        start: 'top 30%',  // Start the animation when the top of desc reaches the top of the screen
        end: 'bottom top', // End the animation when the bottom of desc reaches the top of the screen
        scrub: true,  // Smooth scroll effect
        markers: false,  // Remove markers
        onUpdate: (self) => {
          const progress = self.progress;


          // Get the height of the avatar and desc
          const avatarHeight = avatar.offsetHeight;
          const descHeight = desc.offsetHeight;

          // Calculate the position of the avatar relative to the desc element
          let avatarOffset = (descHeight - avatarHeight) * progress;

          // console.log('avatarheight', avatarHeight);
          // console.log('descheight', descHeight);
          // console.log('avatarOffset', avatarOffset);
          // console.log('progress', progress);

          // Ensure avatar stays within bounds of the .desc div
          avatarOffset = Math.min(avatarOffset, descHeight - avatarHeight);
          avatarOffset = Math.max(avatarOffset, 0);

          // Apply animation to align avatar to the bottom of the desc
          gsap.to(avatar, {
            y: avatarOffset, // Move the avatar up and down based on scroll
            ease: 'power1.out', // Smooth easing for better animation feel
          });
        },
        onLeave: () => {
          // Make sure the avatar stays in its final position once the animation completes
          gsap.to(avatar, {
            y: 0,  // Reset the avatar to its starting position
            ease: 'power1.out',
          });
        },
      });
    }
  };

  // Add the scroll event listener
  window.addEventListener('scroll', handleScroll);

  // Start the typing animation
  typeText();

  // Clean up event listener on unmount
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill();
    }
  });
});

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});


// Watch for moveImageDown
watch(moveImageDown, async (newVal) => {
  if (newVal) {
    generateRandomArrows();
    await nextTick();
    animateArrows();
  }
});

</script>



<style lang="scss" scoped>
.intro {
  .container {
    position: relative;
    z-index: 3;
    min-height: 30vh;
    @media (min-width: 768px) {
      min-height: 240px;
    }
    @media (min-width: 960px) {
      min-height: 300px;
    }
  }
}
.intro-text {
  position: absolute;
  width: 93%;
}
h1 {
  padding: 0 0 12px;
  opacity: 0;
  animation: drop 0.3s ease-in-out forwards;
  animation-delay: .5s;
}
.paragraph {
  z-index: 3;
  padding: 0 15px 0 2px;
  opacity: 0;
  transform: rotate(-1deg);
  animation: textAnim 0.3s ease-in-out forwards;
  animation-delay: .6s;
}
p {
  font-size: 1.2rem;
  line-height: 1.2;
  white-space: pre-wrap;
}
.intro-image {
  position: absolute;
  z-index: 0;
  width: 100%;
  top: 35%;
  opacity: 0;
  transform: translateX(0) translateY(0);
  animation: imageAnim 0.3s ease-in-out forwards;
  animation-delay: .3s;

  &.fall {
    opacity: 1;
    animation: fall 0.6s ease-in-out forwards;
    animation-delay: .3s;
  }

  ::v-deep {
    svg {
      transform: scale(1.2) skewX(6deg) skewY(-1deg);
      animation: imageAnim2 12s ease-in-out infinite;
      animation-delay: .5s;
    }
  }
}
@media (min-width: 600px) {
  p {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .intro-image {
    width: 50%;
    top: 27px;
    left: -2%;
    transform: translateX(50%) translateY(0);
  }
}
.bottom-div {
  position: relative;
  width: 100%;
  text-align: center;
  //margin-bottom: 0;
  padding: 5rem 0;
}
@media (min-width: 768px) {
  .bottom-div {
    padding: 7rem 0;
  }
}

.skills {
  display: block;
  padding: 0 12px;
  margin: 0 auto;

  .col1, .col2 {
    display: block;
  }

  @media (min-width: 768px) {
    .skills {
      display: flex;
      padding: 0;
    }
    .col1 {
      flex: 0 0 33.3333333333%;
      max-width: 33.3333333333%;
    }

    .col2 {
      flex: 0 0 66.6666666667%;
      max-width: 66.6666666667%;
    }
  }

  h4 {
    margin: 0 0 1rem;
    font-size: 1.125rem;
  }
  .label {
    @include font-written;
    font-size: 1.5rem;
    line-height: 1;
    margin: 2rem 0 1rem;
    text-align: left;

    .icon {
      font-size: .75em;
      top: 4px;
      right: -6px;
    }
  }
}
.avatar-block, .avatar, .desc {
  opacity: 0;
}
.avatar-block {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  animation: scaleUpDown 5s ease-in-out infinite;
  img {
    width: 60%;
  }
}
.avatar {
  position: absolute;
  margin: 0 auto;
  max-width: 250px;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
.desc {
  text-align: left;
  font-size: 1.125rem;
  background: rgba(255,255,255,0.02);
  padding: 2rem;
  margin: -12px;
  border-radius: 15px;
  transform: rotate(-1deg);
}
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-between;
}

.grid-item {
  flex: 1 1 calc(50% - 16px);
  display: flex;
  align-items: center;
  //justify-content: center;
  gap: 8px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

@media (min-width: 960px) {
  .grid-item {
    flex: 1 1 calc(33.333% - 16px);
  }
}

@media (min-width: 768px) {
  .skills {
    display: flex;
    margin: 0 auto;
  }
  .avatar {
    margin: 0 2rem 0 0;
    max-width: 240px;

    img {
      width: 100%;
    }
  }
  .desc {
    font-size: 1.5rem;
    padding: 3rem;
  }
}
@media (min-width: 960px) {
  .avatar {
    margin: 0 2rem 0 0;
    max-width: 300px;

    img {
      width: 100%;
    }
  }
}

.animated-arrows {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 400px;
  overflow: visible;
  animation: drop 3s ease-in-out forwards;
  .arrow {
    position: absolute;
    z-index: 1;
    font-size: 100px;
    color: rgba(0,0,0,0.1);
    pointer-events: none;
  }
}

.v-theme--dark {
  p {
    color: #4d847f;
  }
  .arrow {
    color: rgba(0,0,0,0.1);
  }
}
.v-theme--light {
  p {
    color: #4dbdb3;
  }
  .arrow {
    color: rgba(0,0,0,0.03);
  }
}

@keyframes textAnim {
  0% {
    opacity: 0;
    transform: translateX(-1000px) rotate(-1deg);
  }
  80% {
    opacity: 1;
    transform: translateX(20px) rotate(-1deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotate(-1deg);
  }
}

@keyframes textAnim2 {
  0% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
  50% {
    transform: translateX(0) translateY(5px) rotate(-1deg);
  }
  100% {
    transform: translateX(0) translateY(0) rotate(-1deg);
  }
}

@keyframes imageAnim {
  0% {
    opacity: 0;
    transform: translateX(300%);
  }
  80% {
    opacity: 1;
    transform: translateX(55%);
  }
  100% {
    opacity: 1;
    transform: translateX(50%);
  }
}

@keyframes fall {
  0% {
    opacity: 1;
    transform: translateX(50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(50%) translateY(300%);
  }
}

@keyframes imageAnim2 {
  0% {
    transform: scale(1.4) skewX(6deg) skewY(-1deg);
  }
  50% {
    transform: scale(1.6) skewX(3deg) skewY(-1deg);
  }
  100% {
    transform: scale(1.4) skewX(6deg) skewY(-1deg);
  }
}

@media (max-width: 599px) {
  @keyframes imageAnim {
    0% {
      opacity: 0;
      transform: translateX(300%);
    }
    80% {
      opacity: 1;
      transform: translateX(-5%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fall {
    0% {
      opacity: 1;
      transform: translateX(0) translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateX(0) translateY(300%);
    }
  }

  @keyframes imageAnim2 {
    0% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
    50% {
      transform: scale(1.7) skewX(3deg) skewY(-1deg);
    }
    100% {
      transform: scale(1.5) skewX(6deg) skewY(-1deg);
    }
  }
}

</style>
