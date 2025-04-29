<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <h1 class="d-none">Blog</h1>
        <AppHeading title="Blog" />

        <v-row v-if="blog.loading" class="mt-4">
          <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4">
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
            :total-visible="5"
            class="mt-4"
            @update:modelValue="handlePageChange"
          />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlogStore } from '@/stores/blog'
import BlogPostCard from "@/components/BlogPostCard.vue";
import AppHeading from "@/components/AppHeading.vue";

const blog = useBlogStore()
const currentPage = ref(1)

const perPage = 5

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  blog.fetchPosts(newPage, perPage)
}


onMounted(() => {
  blog.fetchPosts(currentPage.value, perPage)
})
</script>

<style lang="scss" scoped>
.blog-post {
  min-height: 240px;
  cursor: pointer;
}
</style>
