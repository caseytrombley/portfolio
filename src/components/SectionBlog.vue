<template>
  <section class="spaced">
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <AppHeading
          title="My Recent Posts"
          subtitle="Prepare for insightful ramblings and some questionable decisions. You’re welcome."
        />

        <v-row v-if="blog.loading" class="mt-4">
          <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" class="blog-post" />
          </v-col>
        </v-row>

        <div v-else>
          <v-row>
            <v-col
              v-for="post in blog.posts.slice(0, 6)"
              :key="post.id"
              cols="12"
              sm="6"
              md="4"
            >
              <BlogPostCard :post="post" />
            </v-col>
          </v-row>

          <div class="text-center mt-6">
            <v-btn @click="goToBlog" color="primary" variant="text" size="x-large">Go to Blog <v-icon>mdi-arrow-right-thin</v-icon>
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>

    <div class="background-layer">
      <div class="overlay"></div>
      <VideoBackground />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogPostCard from "@/components/BlogPostCard.vue";
import AppHeading from "@/components/AppHeading.vue";
import { useRouter } from 'vue-router'
import VideoBackground from "@/components/VideoBackground.vue";

const router = useRouter()
const blog = useBlogStore()

onMounted(() => {
  if (!blog.posts.length) {
    blog.fetchPosts(1, 6)
  }
})
const goToBlog = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  router.push('/blog')
}
</script>

<style lang="scss" scoped>
.container {
  display: block;
  z-index: 1;
}
.background-layer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 0;
}
.blog-post {
  cursor: pointer;
  min-height: 240px;
}
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-5px);
}
</style>
