<template>
  <v-card
    class="blog-post"
    :to="`/blog/${post.slug}`"
    :max-width="maxWidth"
    :elevation="elevation"
  >
    <v-card-title>
      <div class="blackout">
        <div v-html="post.title.rendered"></div>
      </div>
    </v-card-title>

    <v-card-subtitle class="pt-4" v-if="showCategory">
      <v-chip color="primary">
        {{ post.displayCategory || 'Uncategorized' }}
      </v-chip>
    </v-card-subtitle>

    <template v-if="!post.displayCategory">
      <v-chip color="primary" class="ml-2">
        Uncategorized
      </v-chip>
    </template>

    <v-card-text v-if="showExcerpt">
      <div v-html="post.excerpt.rendered" />
    </v-card-text>

    <v-card-actions>
      <router-link :to="`/blog/${post.slug}`" class="text-orange pl-2 text-decoration-none">
        Read more<v-icon>mdi-arrow-right-thin</v-icon>
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Post {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  class_list?: string[]
  category: string
  displayCategory: string
}

interface Props {
  post: Post
  showCategory?: boolean
  showExcerpt?: boolean
  maxWidth?: number | string
  elevation?: number
}

const props = withDefaults(defineProps<Props>(), {
  showCategory: true,
  showExcerpt: true,
  maxWidth: 400,
  elevation: 0,
})

</script>

<style lang="scss" scoped>
.blog-post {
  min-height: 240px;
  cursor: pointer;
  transition: transform 0.2s;
}

.blog-post:hover {
  transform: translateY(-5px);
}

.blackout {
  padding: 1rem;
  width: 100%;
  white-space: normal;
  //background: rgba(14,110,102, .1);
  //overflow: hidden;
  //text-overflow: ellipsis;
}
.v-card-title {
  padding: 0 0 .5rem 0;
}
</style>
