import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        items: [],
        loading: false,
    }),

    getters: {
        isInWishlist: (state) => (productId: number) => {
            return state.items.some(item => item.product_id === productId)
        },
    },

    actions: {
        async fetchWishlist() {
            this.loading = true
            try {
                const response = await axios.get('/wishlist')
                this.items = response.data || []
            } catch (error) {
                console.error('Failed to fetch wishlist', error)
            } finally {
                this.loading = false
            }
        },

        async addToWishlist(productId: number) {
            try {
                await axios.post('/wishlist', { product_id: productId })
                await this.fetchWishlist()
                return { success: true }
            } catch (error: any) {
                return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' }
            }
        },

        async removeFromWishlist(productId: number) {
            try {
                await axios.delete(`/wishlist/${productId}`)
                await this.fetchWishlist()
                return { success: true }
            } catch (error: any) {
                return { success: false, message: error.response?.data?.message || 'Failed to remove from wishlist' }
            }
        },
    },
})