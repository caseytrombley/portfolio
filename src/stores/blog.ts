import { defineStore } from 'pinia'

// Helper function to capitalize first letter
const capitalize = (str: string) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

interface BlogPost {
  id: number
  slug: string
  title: { rendered: string }
  excerpt: { rendered: string }
  class_list?: string[]
  category: string
  displayCategory: string
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
        if (post.category && post.category !== 'uncategorized') {
          categories.add(post.category)
        }
      })
      return Array.from(categories).sort()
    },
    allDisplayCategories: (state) => {
      const categories = new Set<string>(['All'])
      state.posts.forEach(post => {
        if (post.displayCategory && post.displayCategory !== 'Uncategorized') {
          categories.add(post.displayCategory)
        }
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
        
        // Process posts to add category and displayCategory fields
        const processedPosts = data.map(post => {
          const categoryClass = post.class_list?.find(c => c.startsWith('category-'))
          if (!categoryClass) {
            return {
              ...post,
              category: '',
              displayCategory: ''
            }
          }
          const baseCategory = categoryClass.split('-')[1]
          return {
            ...post,
            category: baseCategory,
            displayCategory: capitalize(baseCategory)
          }
        })

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
