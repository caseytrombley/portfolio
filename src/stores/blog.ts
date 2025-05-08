import { defineStore } from 'pinia'

interface BlogPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  class_list?: string[]
  category: string
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as BlogPost[],
    totalPages: 1,
    loading: false
  }),
  getters: {
    allCategories: (state) => {
      const categories = new Set<string>(['All'])
      state.posts.forEach(post => {
        categories.add(post.category)
      })
      return Array.from(categories).sort()
    }
  },
  actions: {
    async fetchPosts(page = 1, perPage = 5, category: string = '', sort: 'newest' | 'oldest' = 'newest') {
      this.loading = true
      try {
        const queryParams = new URLSearchParams({
          per_page: perPage.toString(),
          page: page.toString()
        })
        
        if (category && category !== 'All') {
          queryParams.set('categories', category)
        }

        // Add sort parameter
        queryParams.set('orderby', 'date')
        queryParams.set('order', sort === 'newest' ? 'desc' : 'asc')

        const res = await fetch(`/.netlify/functions/blog-posts?${queryParams.toString()}`)
        const data = await res.json()
        const total = res.headers.get('X-WP-Total') || '0'
        
        // Process posts to add category field
        const processedPosts = data.map(post => ({
          ...post,
          category: post.class_list?.find(c => c.startsWith('category-'))
            ? post.class_list.find(c => c.startsWith('category-'))!.split('-')[1]
            : 'uncategorized'
        }))

        this.posts = processedPosts
        this.totalPages = Math.ceil(Number(total) / perPage)
      } catch (e) {
        console.error('Failed to load posts:', e)
      } finally {
        this.loading = false
      }
    }
  }
})
