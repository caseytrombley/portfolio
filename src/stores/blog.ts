import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as any[],
    totalPages: 1,
    loading: false
  }),
  actions: {
    async fetchPosts(page = 1, perPage = 5) {
      this.loading = true
      try {
        const res = await fetch(`/.netlify/functions/blog-posts?per_page=${perPage}&page=${page}`)
        const data = await res.json()
        const total = res.headers.get('X-WP-Total') || '0'
        this.posts = data
        this.totalPages = Math.ceil(Number(total) / perPage)
      } catch (e) {
        console.error('Failed to load posts:', e)
      } finally {
        this.loading = false
      }
    }
  }
})
