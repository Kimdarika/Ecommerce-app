import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        loading: false,
    }),

    getters: {
        totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((sum, item) => sum + (item.quantity * item.product.price), 0),
    },

    actions: {
        async fetchCart() {
            this.loading = true
            try {
                const response = await axios.get('/cart')
                this.items = response.data.items || []
            } catch (error) {
                console.error('Failed to fetch cart', error)
            } finally {
                this.loading = false
            }
        },

        async addToCart(productId: number, quantity = 1) {
            try {
                await axios.post('/cart', { product_id: productId, quantity })
                await this.fetchCart()
                return { success: true }
            } catch (error: any) {
                return { success: false, message: error.response?.data?.message || 'Failed to add to cart' }
            }
        },

        async updateQuantity(itemId: number, quantity: number) {
            try {
                await axios.put(`/cart/${itemId}`, { quantity })
                await this.fetchCart()
                return { success: true }
            } catch (error: any) {
                return { success: false, message: error.response?.data?.message || 'Failed to update' }
            }
        },

        async removeItem(itemId: number) {
            try {
                await axios.delete(`/cart/${itemId}`)
                await this.fetchCart()
                return { success: true }
            } catch (error: any) {
                return { success: false, message: error.response?.data?.message || 'Failed to remove' }
            }
        },

        async clearCart() {
            try {
                await axios.delete('/cart/clear')
                this.items = []
                return { success: true }
            } catch (error) {
                return { success: false, message: 'Failed to clear cart' }
            }
        },
    },
})