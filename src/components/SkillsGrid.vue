<template>
  <div class="skills-grid">
    <div class="label">
      {{ label }}
      <v-icon icon="mdi-arrow-down-right" class="icon" />
    </div>
    <div class="desc-items" ref="gridContainerRef">
      <div class="grid">
        <div
          class="grid-item"
          v-for="(skill, index) in skills"
          :key="index"
          ref="gridItemRefs"
        >
          <v-icon start>{{ skill.icon }}</v-icon>
          <span>{{ skill.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  label: String,
  skills: Array as () => Array<{ icon: string; label: string }>,
});

const gridContainerRef = ref(null);
const gridItemRefs = ref([]);

onMounted(async () => {
  await nextTick();

  if (!gridContainerRef.value || gridItemRefs.value.length === 0) return;

  gsap.set(gridItemRefs.value, {
    opacity: 0,
    y: 100,
    rotation: 180,
    scale: 0.3,
  });

  gsap.to(gridItemRefs.value, {
    scrollTrigger: {
      trigger: gridContainerRef.value,
      start: 'top center',
      toggleActions: 'play none none none',
    },
    opacity: 1,
    y: 0,
    rotation: 0,
    scale: 1,
    duration: 1,
    stagger: 0.15,
    ease: 'back.out(1.7)',
  });
});
</script>

<style scoped>
.label {
  font-size: 1.5rem;
  line-height: 1;
  margin: 2rem 0 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 6px;
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
  gap: 8px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s, opacity 0.3s;
  will-change: transform, opacity;
}

@media (min-width: 960px) {
  .grid-item {
    flex: 1 1 calc(33.333% - 16px);
  }
}
</style>
