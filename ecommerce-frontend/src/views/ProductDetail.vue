<template>
  <div class="container">
    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-2">Loading product details...</p>
    </div>

    <!-- Product Not Found -->
    <div v-else-if="!product" class="text-center py-5">
      <i class="fas fa-box-open fa-4x text-muted mb-3"></i>
      <h4>Product Not Found</h4>
      <p class="text-muted">The product you're looking for doesn't exist.</p>
      <router-link to="/products" class="btn btn-primary">
        <i class="fas fa-arrow-left"></i> Back to Products
      </router-link>
    </div>

    <!-- Product Detail -->
    <div v-else>
      <div class="row">
        <!-- Product Images -->
        <div class="col-md-6">
          <div class="product-gallery">
            <img :src="productImage" class="img-fluid rounded shadow main-image" :alt="product.name" @error="handleImageError">
            
            <!-- Gallery Thumbnails -->
            <div v-if="product.gallery && product.gallery.length > 0" class="row g-2 mt-3">
              <div v-for="(img, index) in product.gallery" :key="index" class="col-3">
                <img :src="resolveImageUrl(img)" 
                     class="img-fluid rounded thumb-image" 
                     :alt="`${product.name} ${index + 1}`"
                     @click="productImage = resolveImageUrl(img)"
                     @error="handleThumbImageError">
              </div>
            </div>
          </div>
        </div>

        <!-- Product Info -->
        <div class="col-md-6">
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/products">Products</router-link></li>
              <li class="breadcrumb-item active">{{ product.name }}</li>
            </ol>
          </nav>

          <!-- Product Name -->
          <h2 class="mb-2">{{ product.name }}</h2>
          
          <!-- Category -->
          <p class="text-muted">
            <router-link :to="`/products?category=${product.category_id}`" class="text-decoration-none">
              <i class="fas fa-tag"></i> {{ product.category?.name || 'Uncategorized' }}
            </router-link>
          </p>

          <!-- Rating -->
          <div class="mb-3">
            <span class="text-warning">
              <i v-for="i in 5" :key="i" class="fas fa-star" 
                 :class="i <= Math.round(product.average_rating || 0) ? 'text-warning' : 'text-secondary'"></i>
            </span>
            <span class="text-muted ms-2">({{ product.reviews_count || 0 }} reviews)</span>
          </div>

          <!-- Price -->
          <div class="mb-3">
            <h3 class="text-primary">${{ Number(product.price).toFixed(2) }}</h3>
            <p v-if="product.compare_price" class="text-muted text-decoration-line-through">
              ${{ Number(product.compare_price).toFixed(2) }}
            </p>
          </div>

          <!-- Stock -->
          <div class="mb-3">
            <span class="badge" :class="stockBadgeClass">
              <i :class="stockIconClass"></i> {{ stockStatus }}
            </span>
            <span class="text-muted ms-2">| SKU: {{ product.sku }}</span>
            <span class="text-muted ms-2" v-if="product.stock_quantity > 0">
              | {{ product.stock_quantity }} available
            </span>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <h6>Description</h6>
            <p class="text-muted">{{ product.description }}</p>
          </div>

          <!-- Actions -->
          <div class="d-flex gap-3 flex-wrap">
            <!-- Quantity Selector -->
            <div class="d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary" @click="decreaseQuantity" :disabled="quantity <= 1">
                <i class="fas fa-minus"></i>
              </button>
              <span class="fw-bold px-3">{{ quantity }}</span>
              <button class="btn btn-outline-secondary" @click="increaseQuantity" :disabled="quantity >= product.stock_quantity">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            
            <!-- Add to Cart -->
            <button class="btn btn-primary btn-lg" @click="addToCart" :disabled="product.stock_quantity === 0">
              <i class="fas fa-cart-plus"></i> 
              {{ product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
            
            <!-- Wishlist -->
            <button class="btn btn-outline-danger btn-lg" @click="toggleWishlist">
              <i class="fas fa-heart" :class="isInWishlist ? 'text-danger' : ''"></i>
              {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
            </button>
          </div>

          <!-- Share -->
          <div class="mt-4">
            <small class="text-muted">Share:</small>
            <div class="d-flex gap-2 mt-1">
              <button class="btn btn-outline-primary btn-sm"><i class="fab fa-facebook-f"></i></button>
              <button class="btn btn-outline-info btn-sm"><i class="fab fa-twitter"></i></button>
              <button class="btn btn-outline-danger btn-sm"><i class="fab fa-pinterest"></i></button>
              <button class="btn btn-outline-success btn-sm"><i class="fab fa-whatsapp"></i></button>
            </div>
          </div>
        </div>
      </div>

      <!-- Reviews Section -->
      <div class="mt-5">
        <h4><i class="fas fa-comments text-primary"></i> Customer Reviews</h4>
        
        <!-- Write Review -->
        <div v-if="authStore.isAuthenticated" class="card mb-4">
          <div class="card-body">
            <h5>Write a Review</h5>
            <form @submit.prevent="submitReview">
              <div class="row g-3">
                <div class="col-md-3">
                  <select class="form-select" v-model="reviewData.rating" required>
                    <option value="">Select Rating</option>
                    <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                    <option value="4">⭐⭐⭐⭐ Good</option>
                    <option value="3">⭐⭐⭐ Average</option>
                    <option value="2">⭐⭐ Poor</option>
                    <option value="1">⭐ Terrible</option>
                  </select>
                </div>
                <div class="col-md-7">
                  <input type="text" class="form-control" v-model="reviewData.comment" 
                         placeholder="Share your experience..." required>
                </div>
                <div class="col-md-2">
                  <button type="submit" class="btn btn-primary w-100">
                    <i class="fas fa-paper-plane"></i> Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <!-- Reviews List -->
        <div v-if="product.reviews && product.reviews.length > 0" class="list-group">
          <div v-for="review in product.reviews" :key="review.id" class="list-group-item">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <strong>{{ review.user?.name || 'Anonymous' }}</strong>
                <span class="text-warning ms-2">
                  <i v-for="i in 5" :key="i" class="fas fa-star" 
                     :class="i <= review.rating ? 'text-warning' : 'text-secondary'"></i>
                </span>
              </div>
              <small class="text-muted">{{ new Date(review.created_at).toLocaleDateString() }}</small>
            </div>
            <p class="mb-0 mt-2">{{ review.comment }}</p>
            <small v-if="review.verified_purchase" class="text-success">
              <i class="fas fa-check-circle"></i> Verified Purchase
            </small>
          </div>
        </div>
        
        <div v-else class="text-center py-3">
          <p class="text-muted">No reviews yet. Be the first to review this product!</p>
        </div>
      </div>

      <!-- Related Products -->
      <div class="mt-5" v-if="relatedProducts.length > 0">
        <h4><i class="fas fa-sync text-primary"></i> Related Products</h4>
        <div class="row g-4 mt-2">
          <div v-for="product in relatedProducts" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '@/plugins/axios'
import ProductCard from '@/components/ProductCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToast } from 'vue-toastification'
import type { Product } from '@/types'

const route = useRoute()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

// State
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const loading = ref(true)
const quantity = ref(1)
const reviewData = ref({ rating: '', comment: '' })
const productImage = ref('')

// Computed
const stockStatus = computed(() => {
  if (!product.value) return 'Out of Stock'
  if (product.value.stock_quantity > 10) return 'In Stock'
  if (product.value.stock_quantity > 0) return 'Low Stock'
  return 'Out of Stock'
})

const stockBadgeClass = computed(() => {
  if (!product.value) return 'bg-danger'
  if (product.value.stock_quantity > 10) return 'bg-success'
  if (product.value.stock_quantity > 0) return 'bg-warning'
  return 'bg-danger'
})

const stockIconClass = computed(() => {
  if (!product.value) return 'fa-times-circle'
  if (product.value.stock_quantity > 10) return 'fa-check-circle'
  if (product.value.stock_quantity > 0) return 'fa-exclamation-triangle'
  return 'fa-times-circle'
})

const isInWishlist = computed(() => {
  if (!product.value) return false
  return wishlistStore.isInWishlist(product.value.id)
})

const resolveImageUrl = (image?: string | null) => {
  if (!image) {
    return 'https://via.placeholder.com/600x400/0d6efd/ffffff?text=Product'
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }

  if (image.startsWith('/')) {
    return `http://localhost:8000${image}`
  }

  return `http://localhost:8000/storage/${image}`
}

// Methods
const fetchProduct = async () => {
  loading.value = true
  try {
    const response = await axios.get(`/products/${route.params.slug}`)
    product.value = response.data
    productImage.value = resolveImageUrl(product.value.image)
    
    // Fetch related products
    if (product.value.category_id) {
      const relatedResponse = await axios.get('/products', {
        params: { 
          category: product.value.category_id,
          per_page: 4,
          exclude: product.value.id
        }
      })
      relatedProducts.value = relatedResponse.data.data || []
    }
  } catch (error) {
    toast.error('Product not found')
  } finally {
    loading.value = false
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/600x400/0d6efd/ffffff?text=Product'
}

const handleThumbImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/150x150/0d6efd/ffffff?text=Image'
}

const increaseQuantity = () => {
  if (product.value && quantity.value < product.value.stock_quantity) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login first')
    return
  }
  const result = await cartStore.addToCart(product.value!.id, quantity.value)
  if (result.success) {
    toast.success(`Added ${quantity.value} item(s) to cart! 🎉`)
  } else {
    toast.error(result.message || 'Failed to add to cart')
  }
}

const toggleWishlist = async () => {
  if (!authStore.isAuthenticated) {
    toast.warning('Please login first')
    return
  }
  if (isInWishlist.value) {
    await wishlistStore.removeFromWishlist(product.value!.id)
    toast.info('Removed from wishlist')
  } else {
    await wishlistStore.addToWishlist(product.value!.id)
    toast.success('Added to wishlist! ❤️')
  }
}

const submitReview = async () => {
  try {
    await axios.post(`/products/${product.value!.slug}/reviews`, reviewData.value)
    toast.success('Review submitted!')
    reviewData.value = { rating: '', comment: '' }
    await fetchProduct()
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to submit review')
  }
}

const handleAddToCart = async (productId: number) => {
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

// Watch for slug changes
watch(() => route.params.slug, () => {
  fetchProduct()
})

// Lifecycle
onMounted(async () => {
  await fetchProduct()
  if (authStore.isAuthenticated) {
    await wishlistStore.fetchWishlist()
  }
})
</script>

<style scoped>
.product-gallery {
  position: sticky;
  top: 20px;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.thumb-image {
  width: 100%;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
  border-radius: 8px;
}

.thumb-image:hover {
  border-color: #0d6efd;
  transform: scale(1.05);
}

.breadcrumb {
  background: transparent;
  padding: 0;
}

.breadcrumb-item a {
  text-decoration: none;
  color: #0d6efd;
}

.breadcrumb-item a:hover {
  text-decoration: underline;
}

.btn-lg {
  padding: 0.75rem 2rem;
}

@media (max-width: 768px) {
  .main-image {
    height: 250px;
  }
  
  .thumb-image {
    height: 60px;
  }
}
</style>
