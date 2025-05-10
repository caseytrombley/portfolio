<template>
  <div class="heading-wrapper">
    <h2 class="heading" :class="color">{{ title }}</h2>
    <h3 v-if="subtitle" class="intro">{{ subtitle }}</h3>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  color?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.heading-wrapper {
  text-align: center;
}
.heading {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  &.light {
    color: #ffffff;
  }
}
.intro {
  font-size: 1.25rem;
  color: #666;
  padding: 1rem 0 2rem;
}

@media (min-width: 480px) {
  .heading {
    font-size: 2rem;
  }
}
</style>
