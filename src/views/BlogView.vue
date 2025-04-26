<template>
  <section>
    <v-container max-width="1200px" fluid class="container">
      <div class="blog">
        <h1 class="d-none">Blog</h1>
        <h2 class="heading mb-10">Blog</h2>

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

const blog = useBlogStore()
const currentPage = ref(1)

const perPage = 5

const handlePageChange = (newPage: number) => {
  currentPage.value = newPage
  blog.fetchPosts(newPage, perPage)
}

const getCategory = (classList: string[]) => {
  const categoryClass = classList.find(c => c.startsWith('category-'))
  return categoryClass ? categoryClass.split('-')[1] : 'Uncategorized'
}

onMounted(() => {
  blog.fetchPosts(currentPage.value, perPage)
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
