<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">

      <div class="blog">

        <AppHeading
          title="My Recent Posts"
          subtitle="Prepare for insightful ramblings and some questionable decisions. You’re welcome."
        />
        <div v-if="loading">Loading...</div>
        <v-row v-else>
          <v-col
            v-for="post in posts"
            :key="post.id"
            cols="12"
            sm="6"
            md="4"
          >
            <BlogPostCard :post="post" />
          </v-col>
        </v-row>
      </div>

    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BlogPostCard from "@/components/BlogPostCard.vue";
import AppHeading from "@/components/AppHeading.vue";

const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/wp-json/wp/v2/posts?per_page=5')
    posts.value = await res.json()
  } catch (err) {
    console.error('Failed to load posts:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style lang="scss" scoped>
.intro {
  padding: 1rem 0 2rem;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.blog-post {
  cursor: pointer;
}
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-5px);
}
</style>
