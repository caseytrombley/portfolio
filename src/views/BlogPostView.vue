<template>

  <section>
    <v-container max-width="1200px" fluid class="container">

      <div class="back-button">
        <v-btn @click="goBack" class="v-btn--outlined">
          <v-icon>mdi-arrow-left-thin</v-icon>
          Back
        </v-btn>
      </div>
      <div class="blog-post-view">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">Post not found.</div>
        <div v-else class="post">
          <h1 v-html="post?.title?.rendered" class="title" />
          <div v-html="post?.content?.rendered" class="content" />

        </div>
      </div>
      <div class="back-button">
        <v-btn @click="goBack" class="v-btn--outlined">
          <v-icon>mdi-arrow-left-thin</v-icon>
          Back
        </v-btn>
      </div>
    </v-container>
  </section>


</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'

import Prism from 'prismjs/prism.js';
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';

onMounted(() => {
  Prism.highlightAll();
});

const route = useRoute()
const router = useRouter()
const blogStore = useBlogStore()
const slug = route.params.slug as string
const post = ref<WPPost | null>(null)
const loading = ref(true)
const error = ref(false)

const goBack = () => {
  router.back()
}

interface WPPost {
  id: number
  slug: string
  title: {
    rendered: string
  }
  content: {
    rendered: string
  }
}

onMounted(async () => {
  try {
    if (!blogStore.posts.length) {
      await blogStore.fetchPosts()
    }

    post.value = blogStore.posts.find(p => p.slug === slug)

    if (!post.value) {
      const res = await fetch(`/.netlify/functions/post-by-slug?slug=${slug}`)
      if (!res.ok) throw new Error('Post fetch failed')
      post.value = await res.json()
    }

    if (!post.value) error.value = true
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
    await nextTick()
    Prism.highlightAll()
  }
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
