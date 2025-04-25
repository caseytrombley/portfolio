<template>

  <section>
    <v-container max-width="1200px" fluid class="container">

      <div class="back-button">
        <router-link to="/blog" class="v-btn v-btn--outlined">← Back to Blog</router-link>
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
        <router-link to="/blog" class="v-btn v-btn--outlined">← Back to Blog</router-link>
      </div>
    </v-container>
  </section>


</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug

const post = ref(null)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
  try {
    const res = await fetch(`/api/wp-json/wp/v2/posts?slug=${slug}`)
    const data = await res.json()

    if (data.length > 0) {
      post.value = data[0]
    } else {
      error.value = true
    }
  } catch (err) {
    console.error(err)
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.blog-post-view {
  //max-width: 700px;
  //margin: 2rem auto;
  padding: 2rem 0;
}

.title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.content :deep(p) {
  line-height: 1.7;
  margin-bottom: 1rem;
}

.loading,
.error {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
}
</style>
