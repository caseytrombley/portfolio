<template>
  <div class="grid-container">
    <div
      v-for="(cell, index) in gridCells"
      :key="index"
      class="grid-cell"
      :style="{
        transform: `scale(${cell.scale})`,
        animationDelay: `${cell.delay}s`,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const gridRows = 9;
const gridColumns = 18;
const gridCells = ref<any[]>([]);

onMounted(() => {
  const totalCells = gridRows * gridColumns;
  for (let i = 0; i < totalCells; i++) {
    gridCells.value.push({
      scale: (Math.random() * 1.4 - 0.2).toFixed(2),
      delay: (Math.random() * 5).toFixed(2),
    });
  }
});
</script>


<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(18, 1fr); /* 18 columns */
  gap: 10px;
  width: 100%;
  height: 100%;
}

.grid-cell {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-radius: 3px;
  aspect-ratio: 1 / 1;
  opacity: 0;
  animation: scaleAnimation 3s infinite ease-in-out;
  animation-fill-mode: both;
  animation-delay: var(--delay, 0s);
  will-change: transform, opacity;
}

.v-theme--dark .grid-cell {
  background-color: rgba(var(--v-theme-primary), 0.2);
}

.v-theme--light .grid-cell {
  background-color: rgba(var(--v-theme-primary), 0.3);
}

@keyframes scaleAnimation {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>

