<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="nav-button left" @click.stop="$emit('prev')">‹</button>
      <img :src="`/logos/${logo}`" :alt="`Logo ${index + 1}`" class="modal-image" />
      <button class="nav-button right" @click.stop="$emit('next')">›</button>
      <button class="close-button" @click="$emit('close')">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  logo: string;
  index: number;
  total: number;
}>();
defineEmits(['close', 'next', 'prev']);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.modal-image {
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.5rem;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  user-select: none;
  padding: 1rem;
}

.nav-button.left {
  left: 0;
}

.nav-button.right {
  right: 0;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
