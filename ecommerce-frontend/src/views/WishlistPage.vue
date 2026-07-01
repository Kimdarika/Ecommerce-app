<template>
  <div class="wishlist-page">
    <div class="container">
      <!-- Page Header -->
      <div class="wishlist-header">
        <div>
          <span class="section-tag">Saved Items</span>
          <h2 class="section-title">
            <i class="fas fa-heart section-title-icon"></i> My Wishlist
          </h2>
          <p class="section-subtitle">Products you've saved for later</p>
        </div>
        <div class="header-actions" v-if="items.length > 0">
          <span class="items-count">{{ items.length }} items</span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Loading your wishlist...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="empty-state">
        <div class="empty-icon">💖</div>
        <h4>Your wishlist is empty</h4>
        <p class="empty-text">Start adding products you love!</p>
        <router-link to="/products" class="btn-primary">
          <i class="fas fa-shopping-bag"></i> Browse Products
          <span class="btn-arrow">→</span>
        </router-link>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="wishlist-grid">
        <div v-for="item in items" :key="item.id" class="product-card">
          <!-- Remove Button -->
          <button class="remove-btn" @click="removeFromWishlist(item.product_id)">
            <i class="fas fa-times"></i>
          </button>

          <!-- Product Image -->
          <div class="product-image-wrapper">
            <img 
              :src="item.product.image ? `http://localhost:8000/storage/${item.product.image}` : '/placeholder.jpg'" 
              class="product-image" 
              :alt="item.product.name"
              @error="handleImageError"
            >
            <div class="product-badge" v-if="item.product.is_new">NEW</div>
            <div class="product-overlay">
              <button class="quick-view-btn" @click="quickView(item.product)">
                <i class="fas fa-eye"></i> Quick View
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-info">
            <div class="product-header">
              <h3 class="product-name">{{ item.product.name }}</h3>
              <span class="product-brand">{{ item.product.brand || 'Brand' }}</span>
            </div>
            
            <div class="product-details">
              <span class="product-size">Size: {{ item.product.size || 'M' }}</span>
              <span class="product-color">Color: {{ item.product.color || 'Black/White' }}</span>
            </div>

            <div class="product-rating">
              <div class="stars">
                <i v-for="n in 5" :key="n" 
                   class="fas fa-star" 
                   :class="{ 'filled': n <= (item.product.rating || 4.5) }"></i>
              </div>
              <span class="review-count">({{ item.product.reviews || 0 }} reviews)</span>
            </div>

            <div class="product-price">
              <span class="price">${{ Number(item.product.price).toFixed(2) }}</span>
              <span v-if="item.product.original_price" class="original-price">
                ${{ Number(item.product.original_price).toFixed(2) }}
              </span>
            </div>

            <button class="add-to-cart-btn" @click="addToCart(item.product_id)">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const toast = useToast()

const items = computed(() => wishlistStore.items)
const loading = computed(() => wishlistStore.loading)

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Product'
}

const quickView = (product: any) => {
  router.push(`/product/${product.slug || product.id}`)
}

const removeFromWishlist = async (productId: number) => {
  const result = await wishlistStore.removeFromWishlist(productId)
  if (result.success) {
    toast.info('Removed from wishlist 💕')
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

<style scoped>
/* ============================================
   WISHLIST PAGE - PROFESSIONAL PREMIUM STYLE
   ============================================ */
.wishlist-page {
  padding: 40px 0 60px;
  background: #fef8f9 0%;
  min-height: 100vh;
}

/* ============================================
   PAGE HEADER
   ============================================ */
.wishlist-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fd79a8;
  background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  padding: 0.3rem 1rem;
  border-radius: 50px;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.section-title-icon {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-right: 8px;
}

.section-subtitle {
  color: #6c7a89;
  font-size: 0.95rem;
  margin: 0.25rem 0 0;
}

.items-count {
  background: white;
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  color: #1a1a2e;
  border: 1px solid #e2e8f0;
}

/* ============================================
   LOADING STATE
   ============================================ */
.loading-state {
  text-align: center;
  padding: 60px 0;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 3px solid rgba(253, 121, 168, 0.1);
  border-top-color: #fd79a8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #6c7a89;
  margin-top: 16px;
  font-size: 0.95rem;
}

/* ============================================
   EMPTY STATE
   ============================================ */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border: 1px solid #e2e8f0;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.empty-state h4 {
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.empty-text {
  color: #6c7a89;
  margin-bottom: 20px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 2rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.2);
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(253, 121, 168, 0.3);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(5px);
}

/* ============================================
   PRODUCT CARD - PROFESSIONAL STYLE
   ============================================ */
.wishlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #f0f2f5;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  border-color: #fd79a8;
}

/* Remove Button */
.remove-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.95);
  color: #6c7a89;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.remove-btn:hover {
  background: #fee2e2;
  color: #e53e3e;
  transform: scale(1.1);
}

/* Product Image */
.product-image-wrapper {
  position: relative;
  overflow: hidden;
  padding-top: 100%;
  background: #f8fafc;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.03);
}

.product-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  color: white;
  z-index: 3;
  text-transform: uppercase;
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 4;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  padding: 0.5rem 1.5rem;
  background: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.8rem;
  color: #1a1a2e;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.product-card:hover .quick-view-btn {
  transform: translateY(0);
}

.quick-view-btn:hover {
  background: #1a1a2e;
  color: white;
}

/* Product Info */
.product-info {
  padding: 16px 18px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.3;
  flex: 1;
}

.product-brand {
  font-size: 0.7rem;
  color: #9aa5b5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
  margin-left: 8px;
  white-space: nowrap;
}

.product-details {
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #6c7a89;
  margin-bottom: 8px;
}

.product-details span {
  display: flex;
  align-items: center;
}

.product-details span::after {
  content: '•';
  margin-left: 12px;
  color: #d2d6dc;
}

.product-details span:last-child::after {
  display: none;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
}

.stars {
  display: flex;
  gap: 2px;
}

.stars i {
  font-size: 0.7rem;
  color: #e2e8f0;
}

.stars i.filled {
  color: #f5b042;
}

.review-count {
  font-size: 0.7rem;
  color: #9aa5b5;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
}

.original-price {
  font-size: 0.9rem;
  color: #9aa5b5;
  text-decoration: line-through;
}

/* Add to Cart Button */
.add-to-cart-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.add-to-cart-btn:hover {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.3);
}

.add-to-cart-btn i {
  font-size: 0.85rem;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1200px) {
  .wishlist-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .wishlist-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .wishlist-page {
    padding: 20px 0 40px;
  }

  .wishlist-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .product-name {
    font-size: 0.9rem;
  }

  .product-description {
    font-size: 0.8rem;
    -webkit-line-clamp: 2;
  }

  .price {
    font-size: 1.1rem;
  }

  .add-to-cart-btn {
    font-size: 0.8rem;
    padding: 8px;
  }

  .remove-btn {
    width: 26px;
    height: 26px;
    font-size: 0.65rem;
    top: 8px;
    right: 8px;
  }

  .product-details {
    font-size: 0.7rem;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .wishlist-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-tag {
    font-size: 0.65rem;
  }

  .section-subtitle {
    font-size: 0.8rem;
  }

  .product-info {
    padding: 12px 12px 14px;
  }

  .product-name {
    font-size: 0.8rem;
  }

  .product-brand {
    font-size: 0.6rem;
  }

  .product-details {
    font-size: 0.65rem;
    flex-direction: column;
    gap: 2px;
  }

  .product-details span::after {
    display: none;
  }

  .price {
    font-size: 1rem;
  }

  .original-price {
    font-size: 0.8rem;
  }

  .add-to-cart-btn {
    font-size: 0.7rem;
    padding: 7px;
  }

  .add-to-cart-btn i {
    font-size: 0.7rem;
  }

  .product-badge {
    font-size: 0.5rem;
    padding: 2px 8px;
  }

  .quick-view-btn {
    font-size: 0.7rem;
    padding: 0.4rem 1rem;
  }

  .stars i {
    font-size: 0.6rem;
  }

  .review-count {
    font-size: 0.6rem;
  }
}
</style>