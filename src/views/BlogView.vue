<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <h1 class="d-none">Blog</h1>
        <h2 class="heading mb-10">Blog</h2>


        <!-- Skeleton Loader while loading posts -->
        <v-row v-if="loading" class="mt-4">
          <v-col v-for="n in 5" :key="n" cols="12" sm="6" md="4">
            <v-skeleton-loader type="card" class="blog-post" />
          </v-col>
        </v-row>

        <!-- Actual posts -->
        <div v-else>
          <v-row>
            <v-col
              v-for="post in posts"
              :key="post.id"
              cols="12"
              sm="6"
              md="4"
            >
              <v-card
                :to="`/blog/${post.slug}`"
                class="mx-auto"
                max-width="400"
                elevation="0"
              >
                <v-card-title>
                  <div class="blackout">
                    {{ post.title.rendered }}
                  </div>
                </v-card-title>

                <v-card-subtitle class="pt-4">
                  <v-chip color="primary">
                    {{ getCategory(post.class_list) }}
                  </v-chip>

                </v-card-subtitle>

                <v-card-text>
                  <div v-html="post.excerpt.rendered" />

                </v-card-text>

                <v-card-actions>
                  <router-link :to="`/blog/${post.slug}`" class="text-orange">
                    Read more
                  </router-link>
                </v-card-actions>
              </v-card>


<!--              <v-card class="blog-post" :to="`/blog/${post.slug}`" elevation="2">-->
<!--                <v-card-title>-->
<!--                  <h3 v-html="post.title.rendered" class="headline" />-->
<!--                </v-card-title>-->
<!--                <v-card-subtitle>-->
<!--                  <div v-html="post.excerpt.rendered" />-->
<!--                </v-card-subtitle>-->
<!--                <v-card-actions>-->
<!--                  <router-link :to="`/blog/${post.slug}`" class="text-primary">-->
<!--                    Read more-->
<!--                  </router-link>-->
<!--                </v-card-actions>-->
<!--              </v-card>-->
            </v-col>
          </v-row>

          <!-- Pagination Component -->
          <v-pagination
            v-if="totalPages > 1"
            v-model="currentPage"
            :length="totalPages"
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

const posts = ref([])
const loading = ref(true)
const currentPage = ref(1)
const totalPages = ref(1)

const perPage = 5 // Number of posts per page

console.log(posts)

// Fetch posts based on the current page
const fetchPosts = async () => {
  try {
    loading.value = true
    const res = await fetch(`/api/wp-json/wp/v2/posts?per_page=${perPage}&page=${currentPage.value}`)
    const data = await res.json()

    // If the response contains headers with total post count (X-WP-Total)
    const totalPosts = res.headers.get('X-WP-Total') || 0
    totalPages.value = Math.ceil(totalPosts / perPage)  // Calculate total pages based on the total post count

    posts.value = data
  } catch (err) {
    console.error('Failed to load posts:', err)
  } finally {
    loading.value = false
  }
}

// Handle page change (triggered by v-pagination)
const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  fetchPosts() // Re-fetch posts when the page changes
}

const getCategory = (classList: string[]) => {
  const categoryClass = classList.find(className => className.startsWith('category-'))
  return categoryClass ? categoryClass.split('-')[1] : 'Uncategorized'
}


// Initial fetch when the component is mounted
onMounted(() => {
  fetchPosts()
})
</script>

<style lang="scss" scoped>
.intro {
  padding: 1rem 0 2rem;
}
.blog-post {
  min-height: 240px;
  cursor: pointer;
}
.blackout {
  width: 100%;
  background: rgba(14,110,102, .1);
  padding: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-5px);
}
.v-card-title {
  padding: 0 0 .5rem 0;
}
</style>
