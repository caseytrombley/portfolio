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
        <v-row class="skills">
          <v-col cols="12" md="4">
            <div class="avatar">
              <img src="/avatar.png" alt="">
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <div class="desc">
              <h4 class="title">
                My top skills
              </h4>
              <div class="desc-items">
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-icon start>mdi-language-javascript</v-icon>
                          <v-list-item-title>JavaScript</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                          <v-icon start>mdi-language-css3</v-icon>
                          <v-list-item-title>CSS (Sass)</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-list dense>
                        <v-list-item>
                          <v-icon start>mdi-vuejs</v-icon>
                          <v-list-item-title>Vue</v-list-item-title>
                        </v-list-item>

                        <v-list-item>
                          <v-icon start>mdi-react</v-icon>
                          <v-list-item-title>React</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-container>
              </div>

            </div>
          </v-col>
        </v-row>
      </v-container>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import AppKeyboard from '../components/AppKeyboard.vue';
import { introText } from '../content/index.ts';


const fullText = introText;
const displayedText = ref('');
const activeKey = ref('');
const isAnimationComplete = ref(false);
const moveImageDown = ref(false);
const arrows = ref<Array<{ x: number; y: number }>>([]);
const animateTriggered = ref(false);


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

  const avatar = document.querySelector('.avatar');
  const desc = document.querySelector('.desc');

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
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power2.out' }
    );
  }
}

// Start animations when scrolling
onMounted(() => {
  const handleScroll = () => {
    if (!animateTriggered.value) {
      animateSkills();
      animateTriggered.value = true;
    }
  };

  window.addEventListener('scroll', handleScroll);

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

// Watch for moveImageDown
watch(moveImageDown, async (newVal) => {
  if (newVal) {
    generateRandomArrows();
    await nextTick();
    animateArrows();

  }
});

// Start the typing animation
typeText();

</script>


<style lang="scss" scoped>
.intro {
  .container {
    position: relative;
    z-index: 3;
    min-height: 30vh;
    @media (min-width: 960px) {
      min-height: auto;
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
  margin-bottom: 0;
  padding: 5rem 0;
}
@media (min-width: 768px) {
  .bottom-div {
    padding: 7rem 0;
  }
}

.skills {
  display: block;
  margin: 0 auto;
}
.avatar, .desc {
  opacity: 0;
}
.avatar {
  margin: 0 auto;
  max-width: 250px;
  img {
    width: 100%;
  }
}
.desc {
  text-align: left;
  font-size: 1.5rem;
  background: rgba(255,255,255,0.02);
  padding: 3rem;
  margin: -12px;
  border-radius: 15px;
  transform: rotate(-1deg);
  .items {
    ul {
      text-align: left;
    }
  }
}
@media (min-width: 768px) {
  .skills {
    display: flex;
    margin: 0 auto;
  }
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
