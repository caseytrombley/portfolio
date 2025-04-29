<template>

  <section>
    <v-container max-width="1200px" fluid class="container">

      <div class="back-button">
        <router-link to="/blog" class="v-btn v-btn--outlined"><v-icon>mdi-arrow-left-thin</v-icon>Back to Blog</router-link>
      </div>
      <div class="blog-post-view">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">Post not found.</div>
        <div v-else class="post">
          <h1 v-html="post.title.rendered" class="title" />
          <div v-html="post.content.rendered" class="content" />
        </div>
      </div>
      <div class="back-button">
        <router-link to="/blog" class="v-btn v-btn--outlined"><v-icon>mdi-arrow-left-thin</v-icon> Back to Blog</router-link>
      </div>
    </v-container>
  </section>


</template>

<script lang="ts" setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

import Prism from 'prismjs/prism.js';
import 'prismjs/themes/prism-okaidia.css'; // Use the desired theme (e.g., prism-okaidia.css)
import 'prismjs/components/prism-css'; // Language support for CSS

onMounted(() => {
  Prism.highlightAll();
});

const route = useRoute()
const slug = route.params.slug as string

const blogStore = useBlogStore()
const loading = ref(true)
const error = ref(false)

const post = computed(() => blogStore.posts.find(p => p.slug === slug))

console.log(post)

onMounted(async () => {
  if (!blogStore.posts.length) {
    try {
      await blogStore.fetchPosts()
    } catch (err) {
      console.error(err)
      error.value = true
    }
  }

  if (!post.value) {
    error.value = true
  }

  loading.value = false

  // Ensure DOM is updated before highlighting
  await nextTick()
  Prism.highlightAll()
})
</script>


<style lang="scss" scoped>
.blog-post-view {
  padding: 2rem 0;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.content {
  :deep(p) {
    line-height: 1.7;
    margin-bottom: 1rem;
  }
  :deep(ul) {
    padding: 1rem;
    margin: 1rem 0;
  }
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
}
</style>
