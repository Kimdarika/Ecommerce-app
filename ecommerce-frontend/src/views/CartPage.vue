<template>
  <div class="cart-page">
    <div class="container">
      <!-- Header Section -->
      <div class="cart-header">
        <div class="header-content">
          <div class="header-left">
            <div class="icon-wrapper">
              <i class="fas fa-shopping-cart"></i>
            </div>
            <div>
              <h1>Shopping Cart</h1>
              <p class="text-muted">{{ items.length }} items in your cart</p>
            </div>
          </div>
          <div class="header-right" v-if="items.length > 0">
            <button class="btn-clear" @click="clearCart">
              <i class="fas fa-trash-alt"></i> Clear Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="state-wrapper">
        <div class="loading-state">
          <div class="spinner">
            <div class="spinner-ring"></div>
          </div>
          <p>Loading your cart...</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="items.length === 0" class="state-wrapper">
        <div class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-shopping-cart"></i>
            <div class="empty-icon-bg"></div>
          </div>
          <h3>Your cart is empty</h3>
          <p>Start shopping and add items to your cart</p>
          <router-link to="/products" class="btn-primary">
            <i class="fas fa-shopping-bag"></i> Continue Shopping
          </router-link>
        </div>
      </div>

      <!-- Cart Content -->
      <div v-else class="cart-content">
        <div class="row g-4">
          <!-- Cart Items -->
          <div class="col-lg-8">
            <div class="cart-items-card">
              <div class="card-header">
                <span class="header-title">Cart Items</span>
                <span class="item-count">{{ items.length }} items</span>
              </div>
              
              <div v-for="item in items" :key="item.id" class="cart-item">
                <div class="item-image">
                  <img 
                    :src="item.product.image ? getImageUrl(item.product.image) : '/placeholder.jpg'" 
                    :alt="item.product.name"
                    @error="handleImageError"
                  >
                </div>
                <div class="item-details">
                  <div class="item-header">
                    <h5 class="item-name">{{ item.product.name }}</h5>
                    <button class="btn-remove" @click="removeItem(item.id)">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                  <div class="item-meta">
                    <span class="item-brand">{{ item.product.brand || 'Premium' }}</span>
                    <span class="item-sku">SKU: {{ item.product.sku }}</span>
                  </div>
                  <div class="item-price">${{ Number(item.product.price).toFixed(2) }}</div>
                  <div class="item-actions">
                    <div class="quantity-selector">
                      <button class="qty-btn" @click="updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">
                        <i class="fas fa-minus"></i>
                      </button>
                      <span class="qty-value">{{ item.quantity }}</span>
                      <button class="qty-btn" @click="updateQuantity(item.id, item.quantity + 1)">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                    <div class="item-total">
                      <span class="total-label">Total</span>
                      <span class="total-price">${{ (Number(item.product.price) * item.quantity).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Continue Shopping -->
            <div class="continue-shopping">
              <router-link to="/products" class="btn-continue">
                <i class="fas fa-arrow-left"></i> Continue Shopping
              </router-link>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="col-lg-4">
            <div class="summary-card">
              <h4 class="summary-title">Order Summary</h4>
              
              <div class="summary-row">
                <span class="summary-label">Subtotal</span>
                <span class="summary-value">${{ total.toFixed(2) }}</span>
              </div>
              
              <div class="summary-row">
                <span class="summary-label">Shipping</span>
                <span class="summary-value" :class="{'free-shipping': total > 50}">
                  {{ total > 50 ? 'Free 🎉' : '$5.00' }}
                </span>
              </div>
              
              <div class="summary-row">
                <span class="summary-label">Tax (10%)</span>
                <span class="summary-value">${{ (total * 0.1).toFixed(2) }}</span>
              </div>
              
              <div class="summary-divider"></div>
              
              <div class="summary-row total-row">
                <span class="summary-label total-label">Total</span>
                <span class="summary-value total-price">${{ (total + (total > 50 ? 0 : 5) + total * 0.1).toFixed(2) }}</span>
              </div>

              <div class="free-shipping-banner" v-if="total > 0 && total < 50">
                <i class="fas fa-truck"></i>
                Add ${{ (50 - total).toFixed(2) }} more for free shipping!
              </div>

              <router-link to="/checkout" class="btn-checkout">
                <i class="fas fa-credit-card"></i> Proceed to Checkout
              </router-link>
              
              <button class="btn-clear-cart" @click="clearCart">
                <i class="fas fa-trash-alt"></i> Clear Cart
              </button>

              <div class="secure-checkout">
                <i class="fas fa-lock"></i>
                <span>Secure Checkout</span>
                <div class="payment-icons">
                  <i class="fab fa-cc-visa"></i>
                  <i class="fab fa-cc-mastercard"></i>
                  <i class="fab fa-cc-amex"></i>
                  <i class="fab fa-cc-paypal"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

const cartStore = useCartStore()
const toast = useToast()

const items = computed(() => cartStore.items)
const loading = computed(() => cartStore.loading)
const total = computed(() => cartStore.totalPrice)

const getImageUrl = (image: string) => {
  if (!image) return '/placeholder.jpg'
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image
  }
  return `http://localhost:8000/storage/${image}`
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Product'
}

const updateQuantity = async (itemId: number, quantity: number) => {
  if (quantity < 1) return
  const result = await cartStore.updateQuantity(itemId, quantity)
  if (!result.success) {
    toast.error(result.message || 'Failed to update')
  }
}

const removeItem = async (itemId: number) => {
  const result = await cartStore.removeItem(itemId)
  if (result.success) {
    toast.info('Item removed from cart')
  } else {
    toast.error(result.message || 'Failed to remove')
  }
}

const clearCart = async () => {
  if (confirm('Clear your entire cart?')) {
    await cartStore.clearCart()
    toast.info('Cart cleared')
  }
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<style scoped>
/* ============================================
   CART PAGE
   ============================================ */
.cart-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 2rem 0 4rem;
  background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
}

/* ============================================
   HEADER
   ============================================ */
.cart-header {
  margin-bottom: 2.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.header-left h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a2e;
}

.header-left p {
  margin: 0;
  font-size: 0.9rem;
  color: #6c7a89;
}

.btn-clear {
  padding: 0.5rem 1.25rem;
  border: 2px solid #fee2e2;
  background: white;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #dc2626;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-clear:hover {
  background: #fee2e2;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.15);
}

/* ============================================
   STATE WRAPPER
   ============================================ */
.state-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* ============================================
   LOADING STATE
   ============================================ */
.loading-state {
  text-align: center;
}

.spinner {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
}

.spinner-ring {
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 4px solid #f0e6f6;
  border-radius: 50%;
  border-top-color: #667eea;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  margin-top: 1rem;
  color: #6c7a89;
  font-weight: 500;
}

/* ============================================
   EMPTY STATE
   ============================================ */
.empty-state {
  text-align: center;
  padding: 3rem 2rem;
}

.empty-icon {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon i {
  font-size: 3.5rem;
  color: #667eea;
  z-index: 2;
}

.empty-icon-bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 50%;
  animation: pulseBg 2s ease-in-out infinite;
}

@keyframes pulseBg {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; }
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.empty-state p {
  color: #6c7a89;
  margin-bottom: 1.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  color: white;
}

/* ============================================
   CART CONTENT
   ============================================ */
.cart-content {
  margin-top: 0.5rem;
}

/* ============================================
   CART ITEMS CARD
   ============================================ */
.cart-items-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  border: 1px solid #f0e6f6;
}

.card-header {
  padding: 1.25rem 1.5rem;
  background: #faf8fc;
  border-bottom: 1px solid #f0e6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 1rem;
}

.item-count {
  font-size: 0.85rem;
  color: #6c7a89;
  background: #f0e6f6;
  padding: 0.2rem 0.8rem;
  border-radius: 50px;
}

/* ============================================
   CART ITEM
   ============================================ */
.cart-item {
  padding: 1.25rem 1.5rem;
  display: flex;
  gap: 1.25rem;
  border-bottom: 1px solid #f0e6f6;
  transition: background 0.3s ease;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item:hover {
  background: #faf8fc;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f8f6fa;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.item-name {
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  font-size: 1rem;
}

.btn-remove {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: #9aa5b5;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: #fee2e2;
  color: #dc2626;
  transform: scale(1.1);
}

.item-meta {
  display: flex;
  gap: 0.75rem;
  margin: 0.25rem 0 0.5rem;
  font-size: 0.8rem;
  color: #6c7a89;
}

.item-brand {
  font-weight: 500;
  color: #667eea;
}

.item-sku {
  color: #9aa5b5;
}

.item-price {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 1.05rem;
  margin-bottom: 0.5rem;
}

.item-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: auto;
  flex-wrap: wrap;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #e8ecf1;
  border-radius: 50px;
  padding: 0.2rem;
  background: white;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
}

.qty-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.qty-value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a1a2e;
}

.item-total {
  text-align: right;
  margin-left: auto;
}

.total-label {
  display: block;
  font-size: 0.7rem;
  color: #9aa5b5;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.total-price {
  font-weight: 700;
  font-size: 1.1rem;
  color: #667eea;
}

/* ============================================
   CONTINUE SHOPPING
   ============================================ */
.continue-shopping {
  margin-top: 1.5rem;
}

.btn-continue {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c7a89;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-continue:hover {
  color: #667eea;
  transform: translateX(-4px);
}

/* ============================================
   SUMMARY CARD
   ============================================ */
.summary-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e6f6;
  position: sticky;
  top: 1.5rem;
}

.summary-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: #1a1a2e;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f0e6f6;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
}

.summary-label {
  color: #6c7a89;
  font-size: 0.95rem;
}

.summary-value {
  font-weight: 600;
  color: #1a1a2e;
}

.free-shipping {
  color: #10b981;
}

.summary-divider {
  height: 2px;
  background: #f0e6f6;
  margin: 0.75rem 0;
}

.total-row {
  padding: 0.75rem 0 0.5rem;
}

.total-label {
  font-weight: 700;
  font-size: 1.05rem;
  color: #1a1a2e;
}

.total-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #667eea;
}

.free-shipping-banner {
  background: #d1fae5;
  color: #065f46;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.free-shipping-banner i {
  color: #10b981;
}

.btn-checkout {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.9rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(102, 126, 234, 0.3);
}

.btn-checkout:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  color: white;
}

.btn-clear-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.7rem;
  background: transparent;
  color: #dc2626;
  border: 2px solid #fee2e2;
  border-radius: 50px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.75rem;
}

.btn-clear-cart:hover {
  background: #fee2e2;
  transform: translateY(-2px);
}

.secure-checkout {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px solid #f0e6f6;
  text-align: center;
}

.secure-checkout i {
  color: #10b981;
  margin-right: 0.25rem;
}

.secure-checkout span {
  font-size: 0.8rem;
  color: #6c7a89;
}

.payment-icons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.payment-icons i {
  font-size: 1.5rem;
  color: #9aa5b5;
  transition: all 0.3s ease;
}

.payment-icons i:hover {
  color: #1a1a2e;
  transform: scale(1.1);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 992px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-image {
    width: 100%;
    height: 200px;
  }
  
  .item-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .item-total {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .cart-page {
    padding: 1rem 0 2rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .icon-wrapper {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
  
  .header-left h1 {
    font-size: 1.4rem;
  }
  
  .btn-clear {
    width: 100%;
    justify-content: center;
  }
  
  .cart-item {
    padding: 1rem;
  }
  
  .item-image {
    height: 150px;
  }
  
  .item-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
  
  .quantity-selector {
    align-self: flex-start;
  }
  
  .item-total {
    text-align: left;
  }
  
  .summary-card {
    position: static;
  }
  
  .empty-icon {
    width: 100px;
    height: 100px;
  }
  
  .empty-icon i {
    font-size: 2.8rem;
  }
  
  .empty-state h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 1rem;
  }
  
  .card-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .item-header {
    flex-wrap: wrap;
  }
  
  .item-name {
    font-size: 0.9rem;
  }
  
  .item-price {
    font-size: 0.95rem;
  }
  
  .total-price {
    font-size: 0.95rem;
  }
  
  .btn-checkout {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>