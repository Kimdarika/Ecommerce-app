<template>
  <div class="card h-100 shadow-sm product-card">
    <router-link :to="`/product/${product.slug}`" class="image-link">
      <img 
        :src="productImage" 
        class="card-img-top" 
        :alt="product.name"
        @error="handleImageError"
        loading="lazy"
      >
      <span v-if="product.compare_price && product.compare_price > product.price" 
            class="badge bg-danger position-absolute top-0 start-0 m-2">
        -{{ Math.round(((product.compare_price - product.price) / product.compare_price) * 100) }}%
      </span>
    </router-link>
    
    <div class="card-body d-flex flex-column">
      <small class="text-muted">{{ product.category?.name || 'Uncategorized' }}</small>
      
      <router-link :to="`/product/${product.slug}`" class="text-decoration-none text-dark">
        <h6 class="card-title">{{ product.name }}</h6>
      </router-link>
      
      <div class="mt-auto">
        <div class="d-flex align-items-center gap-2">
          <span class="text-primary fw-bold fs-5">${{ Number(product.price).toFixed(2) }}</span>
          <span v-if="product.compare_price" class="text-muted text-decoration-line-through small">
            ${{ Number(product.compare_price).toFixed(2) }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="card-footer bg-transparent">
      <div class="d-flex gap-2">
        <button
          class="btn btn-outline-danger wishlist-btn"
          @click="toggleWishlist"
          :disabled="wishlistLoading"
          :title="isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'"
        >
          <i class="fas fa-heart" :class="{ 'text-danger': isInWishlist }"></i>
        </button>

        <button class="btn btn-primary add-to-cart-btn flex-grow-1" @click="emit('add-to-cart', product.id)" 
                :disabled="product.stock_quantity === 0">
          <i class="fas fa-cart-plus me-2"></i>
          {{ product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'add-to-cart', productId: number): void
}>()

const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

// FIXED: Proper image handling
const productImage = computed(() => {
  if (!props.product.image) {
    return `https://via.placeholder.com/300x300/ff6b6b/ffffff?text=${encodeURIComponent(props.product.name || 'Product')}`
  }
  
  // If it's a full URL (starts with http or https)
  if (props.product.image.startsWith('http://') || props.product.image.startsWith('https://')) {
    return props.product.image
  }

  if (props.product.image.startsWith('/')) {
    return `http://localhost:8000${props.product.image}`
  }

  // If it's from local storage
  return `http://localhost:8000/storage/${props.product.image}`
})

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))
const wishlistLoading = computed(() => wishlistStore.loading)

const toggleWishlist = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login first')
    return
  }

  if (isInWishlist.value) {
    const result = await wishlistStore.removeFromWishlist(props.product.id)
    if (result.success) {
      toast.info('Removed from wishlist 💕')
    } else {
      toast.error(result.message || 'Failed to remove from wishlist')
    }
    return
  }

  const result = await wishlistStore.addToWishlist(props.product.id)
  if (result.success) {
    toast.success('Added to wishlist! ❤️')
  } else {
    toast.error(result.message || 'Failed to add to wishlist')
  }
}

// Fallback on error
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = `https://via.placeholder.com/300x300/ff6b6b/ffffff?text=${encodeURIComponent(props.product.name || 'Product')}`
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
  border-radius: 12px;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15) !important;
}

.image-link {
  position: relative;
  display: block;
  overflow: hidden;
  height: 200px;
  background: #f8f9fa;
}

.card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 40px;
}

.card-footer {
  background: transparent;
  border-top: none;
  padding-top: 0;
}

.wishlist-btn {
  width: 44px;
  flex: 0 0 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border: none;
  color: #fff;
  box-shadow: 0 8px 20px rgba(253, 121, 168, 0.22);
}

.add-to-cart-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #e17055, #fd79a8);
  color: #fff;
}

.add-to-cart-btn:disabled {
  background: #cbd5e1;
  border-color: #cbd5e1;
  box-shadow: none;
}

.badge {
  font-size: 0.7rem;
  padding: 0.35rem 0.65rem;
  z-index: 10;
}
</style>
