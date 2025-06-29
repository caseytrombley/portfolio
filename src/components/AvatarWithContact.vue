<template>
  <div>
    <div v-if="isMobile" class="avatar-block" ref="avatarBlockRef">
      <img src="/avatar.png" alt="Avatar" />
      <ContactMe />
    </div>
    <div v-else class="col1">
      <div class="avatar" ref="avatarRef">
        <img src="/avatar.png" alt="Avatar" />
        <ContactMe />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, defineExpose } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ContactMe from '@/components/ContactMe.vue';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  isMobile: Boolean
});

const avatarBlockRef = ref(null);
const avatarRef = ref(null);
const descRef = ref(null); // passed in or queried outside

// Optional: expose refs for use in parent ScrollTrigger setup
defineExpose({ avatarRef, avatarBlockRef });

onMounted(() => {
  nextTick(() => {
    const avatarEl = props.isMobile ? avatarBlockRef.value : avatarRef.value;
    if (!avatarEl) return;

    gsap.fromTo(
      avatarEl,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );
  });
});
</script>

<style scoped>
.avatar-block {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  animation: scaleUpDown 5s ease-in-out infinite;
}

.avatar-block img {
  width: 60%;
}

.avatar {
  position: absolute;
  margin: 0 auto;
  max-width: 250px;
  overflow: hidden;
}

.avatar img {
  display: block;
  width: 100%;
  height: auto;
}

@media (min-width: 768px) {
  .avatar {
    margin: 0 2rem 0 0;
    max-width: 240px;
  }
}

@media (min-width: 960px) {
  .avatar {
    max-width: 300px;
  }
}
</style>
