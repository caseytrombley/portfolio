<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <h1 class="d-none">Blog</h1>
        <AppHeading title="Blog" />

        <v-row v-if="blog.loading" class="mt-4">
          <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" class="blog-post" />
          </v-col>
        </v-row>

        <div v-else>
          <v-row>
            <v-col
              v-for="post in blog.posts"
              :key="post.id"
              cols="12"
              sm="6"
              md="4"
            >
              <BlogPostCard :post="post" />
            </v-col>
          </v-row>

          <v-pagination
            v-if="blog.totalPages > 1"
            v-model="currentPage"
            :length="blog.totalPages"
            :total-visible="6"
            class="mt-4"
            @update:modelValue="handlePageChange"
          />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogStore } from '@/stores/blog'
import BlogPostCard from "@/components/BlogPostCard.vue";
import AppHeading from "@/components/AppHeading.vue";

const route = useRoute()
const router = useRouter()
const blog = useBlogStore()

const perPage = 6

// Initialize from query param or default to 1
const currentPage = ref(Number(route.query.page) || 1)

const fetchPage = (page: number) => {
  blog.fetchPosts(page, perPage)
}

// Watch for page changes and sync with router
watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: newPage.toString() } })
  fetchPage(newPage)
})

// Fetch posts on first load
onMounted(() => {
  fetchPage(currentPage.value)
})

</script>

<style lang="scss" scoped>
.blog-post {
  min-height: 240px;
  cursor: pointer;
}
</style>
