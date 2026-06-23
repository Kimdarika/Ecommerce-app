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
      <button class="btn btn-primary w-100" @click="$emit('add-to-cart', product.id)" 
              :disabled="product.stock_quantity === 0">
        <i class="fas fa-cart-plus me-2"></i>
        {{ product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Product } from '@/types'

const props = defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'add-to-cart', productId: number): void
}>()

// FIXED: Proper image handling
const productImage = computed(() => {
  if (!props.product.image) {
    return `https://via.placeholder.com/300x300/ff6b6b/ffffff?text=${encodeURIComponent(props.product.name || 'Product')}`
  }
  
  // If it's a full URL (starts with http or https)
  if (props.product.image.startsWith('http://') || props.product.image.startsWith('https://')) {
    return props.product.image
  }
  
  // If it's from local storage
  return `http://localhost:8000/storage/${props.product.image}`
})

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

.badge {
  font-size: 0.7rem;
  padding: 0.35rem 0.65rem;
  z-index: 10;
}
</style>
