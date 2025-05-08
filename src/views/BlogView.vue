<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <h1 class="d-none">Blog</h1>
        <AppHeading title="Blog" />

        <v-row class="mb-4">
          <v-col cols="12">
            <div class="filter-container">
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="Filter by Category"
                prepend-icon="mdi-filter"
                variant="outlined"
                density="compact"
                class="filter-select"
                @update:modelValue="handleCategoryChange"
              />
              <v-select
                v-model="selectedSort"
                :items="sortOptions"
                label="Sort By"
                prepend-icon="mdi-sort"
                variant="outlined"
                density="compact"
                class="sort-select"
                @update:modelValue="handleSortChange"
              />
            </div>
          </v-col>
        </v-row>

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
import { ref, watch, onMounted, computed } from 'vue'
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
const selectedCategory = ref(route.query.category as string || 'All')
const selectedSort = ref((route.query.sort as 'newest' | 'oldest') || 'newest')
const sortOptions = [
  { value: 'newest', title: 'Newest First' },
  { value: 'oldest', title: 'Oldest First' }
]

// Extract unique categories from posts
const categories = computed(() => {
  return blog.allCategories.map(capitalize)
})

// Helper function to capitalize first letter
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const fetchPage = (page: number, category: string = '', sort: 'newest' | 'oldest' = 'newest') => {
  blog.fetchPosts(page, perPage, category, sort)
}

// Watch for page changes and sync with router
watch(currentPage, (newPage) => {
  router.replace({ query: { ...route.query, page: newPage.toString() } })
  fetchPage(newPage, selectedCategory.value, selectedSort.value)
})

// Watch for category changes and sync with router
watch(selectedCategory, (newCategory) => {
  router.replace({ query: { ...route.query, category: newCategory || undefined } })
  fetchPage(currentPage.value, newCategory, selectedSort.value)
})

// Watch for sort changes and sync with router
watch(selectedSort, (newSort) => {
  router.replace({ query: { ...route.query, sort: newSort } })
  fetchPage(currentPage.value, selectedCategory.value, newSort)
})

// Handle category change from select
const handleCategoryChange = (category: string) => {
  selectedCategory.value = category
}

// Handle sort change from select
const handleSortChange = (sort: 'newest' | 'oldest') => {
  selectedSort.value = sort
}

// Handle page change
const handlePageChange = (page: number) => {
  currentPage.value = page
}

// Fetch posts on first load
onMounted(() => {
  fetchPage(currentPage.value, selectedCategory.value, selectedSort.value)
})
</script>

<style lang="scss" scoped>
.blog-post {
  min-height: 240px;
  cursor: pointer;
}

.filter-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: 2rem;

  .filter-select, .sort-select {
    flex: 1 1 300px;
    max-width: 300px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    .filter-select, .sort-select {
      flex: 1 1 100%;
      max-width: 100%;
    }
  }
}
</style>
