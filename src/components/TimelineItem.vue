<template>
  <div class="timeline-item">
    <h4 class="timeline-title">{{ item.title }}</h4>
    <div v-html="formattedDescription"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  item: {
    type: Object as () => { title: string; description: string },
    required: true,
  },
});

// Compute the formatted description to handle rich text or Markdown
const formattedDescription = computed(() => {
  // Here you can use a Markdown library like `marked` to render Markdown or process HTML
  return props.item.description; // Assuming the description is already HTML or pre-formatted
});
</script>

<style scoped lang="scss">
.timeline-item {
  padding: 2rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.timeline-item {
  ::v-deep {
    .body {
      display: flex;
    }
    p {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 0 0 1rem;
      width: 85%;
    }

    .image {
      width: 14%;
      margin: 0 2rem 0 0;

    }

    p + .image {
      margin: 0 0 0 1rem;
    }

    img {
      width: 100%;
    }

    .float-right {
      float: right;
    }
    .float-left {
      float: left;
    }
  }
}

</style>
