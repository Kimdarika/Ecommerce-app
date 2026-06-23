<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2><i class="fas fa-heart text-danger"></i> My Wishlist</h2>
        <p class="text-muted">Products you've saved for later</p>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else-if="items.length === 0" class="text-center py-5">
      <i class="fas fa-heart fa-4x text-muted mb-3"></i>
      <h4>Your wishlist is empty</h4>
      <p class="text-muted">Start adding products you love!</p>
      <router-link to="/products" class="btn btn-primary">
        <i class="fas fa-shopping-bag"></i> Browse Products
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div v-for="item in items" :key="item.id" class="col-md-3 col-sm-6">
        <div class="card h-100 shadow-sm position-relative">
          <button class="btn btn-danger btn-sm position-absolute top-0 end-0 m-2" 
                  @click="removeFromWishlist(item.product_id)">
            <i class="fas fa-times"></i>
          </button>
          <img :src="item.product.image ? `http://localhost:8000/storage/${item.product.image}` : '/placeholder.jpg'" 
               class="card-img-top" :alt="item.product.name">
          <div class="card-body">
            <h5 class="card-title">{{ item.product.name }}</h5>
            <p class="card-text text-truncate">{{ item.product.description }}</p>
            <p class="text-primary fw-bold">${{ Number(item.product.price).toFixed(2) }}</p>
          </div>
          <div class="card-footer bg-transparent">
            <button class="btn btn-primary w-100" @click="addToCart(item.product_id)">
              <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toast = useToast()

const items = computed(() => wishlistStore.items)
const loading = computed(() => wishlistStore.loading)

const removeFromWishlist = async (productId: number) => {
  const result = await wishlistStore.removeFromWishlist(productId)
  if (result.success) {
    toast.info('Removed from wishlist')
  } else {
    toast.error(result.message || 'Failed to remove from wishlist')
  }
}

const addToCart = async (productId: number) => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login first')
    return
  }

  const result = await cartStore.addToCart(productId)
  if (result.success) {
    toast.success('Added to cart! 🎉')
  } else {
    toast.error(result.message || 'Failed to add to cart')
  }
}

onMounted(() => {
  wishlistStore.fetchWishlist()
})
</script>
