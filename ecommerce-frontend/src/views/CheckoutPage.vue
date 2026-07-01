<template>
  <div class="checkout-page">
    <div class="container py-5">
      <!-- Page Header -->
      <div class="checkout-header mb-5">
        <div class="d-flex align-items-center gap-3">
          <div class="checkout-icon-wrapper">
            <i class="fas fa-credit-card"></i>
          </div>
          <div>
            <h2 class="mb-0 fw-bold">Checkout</h2>
            <p class="text-muted mb-0">Complete your order securely</p>
          </div>
        </div>
        <div class="checkout-steps">
          <span class="step active">Cart</span>
          <span class="step-separator"><i class="fas fa-chevron-right"></i></span>
          <span class="step active">Checkout</span>
          <span class="step-separator"><i class="fas fa-chevron-right"></i></span>
          <span class="step">Confirmation</span>
        </div>
      </div>

      <div class="row g-4">
        <!-- Left Column - Order Form -->
        <div class="col-lg-8">
          <div class="card border-0 shadow-lg rounded-4 checkout-card">
            <div class="card-body p-4 p-md-5">
              <form @submit.prevent="placeOrder">
                <!-- Progress Indicator -->
                <div class="checkout-progress mb-4">
                  <div class="progress-bar-step">
                    <span class="step-indicator active">1</span>
                    <span class="step-label">Address</span>
                  </div>
                  <div class="progress-bar-step">
                    <span class="step-indicator">2</span>
                    <span class="step-label">Payment</span>
                  </div>
                  <div class="progress-bar-step">
                    <span class="step-indicator">3</span>
                    <span class="step-label">Confirm</span>
                  </div>
                </div>

                <!-- Shipping Address -->
                <div class="form-section">
                  <div class="section-header">
                    <i class="fas fa-map-marker-alt text-primary"></i>
                    <h5 class="mb-0 fw-semibold">Shipping Address</h5>
                    <span class="badge bg-danger ms-2">Required</span>
                  </div>
                  <div class="mt-3">
                    <div class="form-floating">
                      <textarea class="form-control" v-model="form.shipping_address" 
                                id="shippingAddress" rows="3" 
                                :class="{ 'is-invalid': formErrors.shipping_address }"
                                placeholder="Enter your full shipping address"></textarea>
                      <label for="shippingAddress">
                        <i class="fas fa-home me-2 text-muted"></i>Full Address
                      </label>
                      <div class="invalid-feedback" v-if="formErrors.shipping_address">
                        Please enter your shipping address
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Billing Address -->
                <div class="form-section mt-4">
                  <div class="section-header">
                    <i class="fas fa-file-invoice text-primary"></i>
                    <h5 class="mb-0 fw-semibold">Billing Address</h5>
                    <span class="badge bg-light text-muted ms-2">Optional</span>
                  </div>
                  <div class="mt-3">
                    <div class="form-floating">
                      <textarea class="form-control" v-model="form.billing_address" 
                                id="billingAddress" rows="2"
                                placeholder="Enter your billing address"></textarea>
                      <label for="billingAddress">
                        <i class="fas fa-file-invoice me-2 text-muted"></i>Billing Address
                      </label>
                    </div>
                    <div class="form-check mt-2">
                      <input class="form-check-input" type="checkbox" id="sameAsShipping" 
                             v-model="sameAsShipping" @change="copyShippingAddress">
                      <label class="form-check-label" for="sameAsShipping">
                        Same as shipping address
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Payment Method -->
                <div class="form-section mt-4">
                  <div class="section-header">
                    <i class="fas fa-credit-card text-primary"></i>
                    <h5 class="mb-0 fw-semibold">Payment Method</h5>
                    <span class="badge bg-danger ms-2">Required</span>
                  </div>
                  <div class="mt-3">
                    <div class="payment-options">
                      <div v-for="method in paymentMethods" :key="method.value" 
                           class="payment-option" :class="{ active: form.payment_method === method.value }"
                           @click="form.payment_method = method.value">
                        <div class="payment-option-content">
                          <div class="payment-option-icon">
                            <i :class="method.icon"></i>
                          </div>
                          <div class="payment-option-info">
                            <div class="payment-option-name">{{ method.label }}</div>
                            <div class="payment-option-desc">{{ method.description }}</div>
                          </div>
                          <div class="payment-option-check">
                            <i class="fas fa-check-circle" 
                               v-if="form.payment_method === method.value"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Order Notes -->
                <div class="form-section mt-4">
                  <div class="section-header">
                    <i class="fas fa-pen text-primary"></i>
                    <h5 class="mb-0 fw-semibold">Order Notes</h5>
                    <span class="badge bg-light text-muted ms-2">Optional</span>
                  </div>
                  <div class="mt-3">
                    <div class="form-floating">
                      <textarea class="form-control" v-model="form.notes" 
                                id="orderNotes" rows="2"
                                placeholder="Any special instructions?"></textarea>
                      <label for="orderNotes">
                        <i class="fas fa-comment me-2 text-muted"></i>Special Instructions
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="mt-4 pt-3 border-top">
                  <button type="submit" class="btn btn-primary btn-lg w-100 checkout-submit" 
                          :disabled="loading">
                    <span v-if="loading">
                      <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processing...
                    </span>
                    <span v-else>
                      <i class="fas fa-check-circle me-2"></i>
                      Place Order
                      <i class="fas fa-arrow-right ms-2"></i>
                    </span>
                  </button>
                  <div class="text-center mt-3">
                    <router-link to="/cart" class="text-decoration-none">
                      <i class="fas fa-arrow-left me-1"></i> Back to Cart
                    </router-link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="col-lg-4">
          <div class="card border-0 shadow-lg rounded-4 sticky-card">
            <div class="card-body p-4">
              <div class="summary-header">
                <i class="fas fa-shopping-bag text-primary"></i>
                <h5 class="mb-0 fw-semibold">Order Summary</h5>
                <span class="badge bg-primary rounded-pill ms-auto">{{ cartItems.length }} items</span>
              </div>

              <!-- Cart Items -->
              <div class="summary-items mt-3">
                <div v-for="item in cartItems" :key="item.id" class="summary-item">
                  <div class="summary-item-image">
                    <img :src="getProductImage(item.product)" :alt="item.product.name">
                  </div>
                  <div class="summary-item-info">
                    <div class="summary-item-name">{{ item.product.name }}</div>
                    <div class="summary-item-meta">
                      <span class="quantity">× {{ item.quantity }}</span>
                      <span class="price">${{ (Number(item.product.price) * item.quantity).toFixed(2) }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Totals -->
              <div class="summary-totals mt-3 pt-3 border-top">
                <div class="summary-row">
                  <span>Subtotal</span>
                  <span>${{ subtotal.toFixed(2) }}</span>
                </div>
                <div class="summary-row">
                  <span>Shipping</span>
                  <span>
                    <span v-if="subtotal > 50" class="text-success">
                      <i class="fas fa-check-circle me-1"></i>Free
                    </span>
                    <span v-else>$5.00</span>
                  </span>
                </div>
                <div class="summary-row">
                  <span>Tax (10%)</span>
                  <span>${{ (subtotal * 0.1).toFixed(2) }}</span>
                </div>
                <div class="summary-row" v-if="subtotal <= 50">
                  <span class="text-muted small">Add ${{ (50 - subtotal).toFixed(2) }} for free shipping</span>
                  <span class="shipping-progress">
                    <div class="progress" style="height: 4px; width: 100px;">
                      <div class="progress-bar" role="progressbar" 
                           :style="{ width: (subtotal / 50 * 100) + '%' }"
                           :aria-valuenow="(subtotal / 50 * 100)" 
                           aria-valuemin="0" 
                           aria-valuemax="100"></div>
                    </div>
                  </span>
                </div>
              </div>

              <!-- Grand Total -->
              <div class="summary-total mt-3 pt-3 border-top">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <span class="fw-bold">Total</span>
                    <small class="d-block text-muted">Including all fees</small>
                  </div>
                  <span class="total-price">${{ total.toFixed(2) }}</span>
                </div>
              </div>

              <!-- Secure Checkout Badge -->
              <div class="security-badge mt-3 text-center">
                <i class="fas fa-lock text-success me-2"></i>
                <span class="text-muted small">Secure checkout • 256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'

const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const form = ref({
  shipping_address: '',
  billing_address: '',
  payment_method: 'cash',
  notes: '',
})

const formErrors = ref({
  shipping_address: false,
})

const loading = ref(false)
const sameAsShipping = ref(false)

const paymentMethods = [
  {
    value: 'cash',
    label: 'Cash on Delivery',
    description: 'Pay when you receive your order',
    icon: 'fas fa-money-bill-wave'
  },
  {
    value: 'card',
    label: 'Credit / Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: 'fas fa-credit-card'
  },
  {
    value: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: 'fas fa-university'
  }
]

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalPrice)
const total = computed(() => {
  const shipping = subtotal.value > 50 ? 0 : 5
  const tax = subtotal.value * 0.1
  return subtotal.value + shipping + tax
})

const getProductImage = (product: any) => {
  if (!product.image) {
    return 'https://via.placeholder.com/50x50/0d6efd/ffffff?text=Product'
  }
  if (product.image.startsWith('http')) {
    return product.image
  }
  if (product.image.startsWith('/')) {
    return `http://localhost:8000${product.image}`
  }
  return `http://localhost:8000/storage/${product.image}`
}

const copyShippingAddress = () => {
  if (sameAsShipping.value) {
    form.value.billing_address = form.value.shipping_address
  } else {
    form.value.billing_address = ''
  }
}

const placeOrder = async () => {
  // Validate shipping address
  if (!form.value.shipping_address.trim()) {
    formErrors.value.shipping_address = true
    toast.error('Please enter your shipping address')
    return
  }
  formErrors.value.shipping_address = false

  loading.value = true
  try {
    const response = await axios.post('/orders', form.value)
    toast.success('Order placed successfully! 🎉')
    await cartStore.clearCart()
    router.push(`/orders`)
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to place order')
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  if (cartStore.items.length === 0) {
    await cartStore.fetchCart()
  }

  if (cartStore.items.length === 0) {
    toast.warning('Your cart is empty')
    router.push('/cart')
  }
})
</script>

<style scoped>
.checkout-page {
  background: radial-gradient(circle, rgba(253, 121, 168, 0.08) 0%, transparent 70%);
  min-height: 100vh;
}

.checkout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.checkout-icon-wrapper {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.checkout-steps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.step {
  font-size: 0.85rem;
  color: #adb5bd;
  font-weight: 500;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  transition: all 0.3s;
}

.step.active {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  background: rgba(102, 126, 234, 0.1);
}

.step-separator {
  color: #dee2e6;
  font-size: 0.7rem;
}

.checkout-card {
  background: white;
  transition: transform 0.3s;
}

.checkout-card:hover {
  transform: translateY(-2px);
}

.checkout-progress {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  position: relative;
}

.checkout-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  height: 2px;
  background: #e9ecef;
  transform: translateY(-50%);
  z-index: 0;
}

.progress-bar-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 1;
}

.step-indicator {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: white;
  border: 2px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  color: #adb5bd;
  transition: all 0.3s;
}

.step-indicator.active {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-color: rgb(251, 69, 136), 102, 208;
  color: white;
  box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
}

.step-label {
  font-size: 0.7rem;
  color: #adb5bd;
  font-weight: 500;
}

.form-section {
  background: #f8f9fa;
  padding: 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
  transition: border-color 0.3s;
}

.form-section:focus-within {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.section-header i {
  font-size: 1.1rem;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.payment-option {
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
}

.payment-option:hover {
  border-color: #667eea;
  transform: translateX(4px);
}

.payment-option.active {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.payment-option-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.payment-option-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #667eea;
}

.payment-option.active .payment-option-icon {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
}

.payment-option-info {
  flex: 1;
}

.payment-option-name {
  font-weight: 500;
  color: #212529;
}

.payment-option-desc {
  font-size: 0.8rem;
  color: #6c757d;
}

.payment-option-check {
  color: #667eea;
  font-size: 1.2rem;
}

.checkout-submit {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border: none;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 0.75rem;
  transition: all 0.3s;
}

.checkout-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.checkout-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.sticky-card {
  position: sticky;
  top: 2rem;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.summary-item {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f3f5;
}

.summary-item:last-child {
  border-bottom: none;
}

.summary-item-image {
  width: 50px;
  height: 50px;
  border-radius: 0.5rem;
  overflow: hidden;
  flex-shrink: 0;
  background: #f8f9fa;
}

.summary-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summary-item-info {
  flex: 1;
  min-width: 0;
}

.summary-item-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #212529;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.summary-item-meta .price {
  font-weight: 600;
  color: #212529;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  color: #495057;
}

.summary-total .total-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.security-badge {
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
}

.shipping-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Form floating label fix */
.form-floating > .form-control {
  min-height: 80px;
}

.form-floating > .form-control:focus ~ label,
.form-floating > .form-control:not(:placeholder-shown) ~ label {
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .checkout-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .checkout-steps {
    width: 100%;
    justify-content: space-between;
  }

  .checkout-progress {
    padding: 0 0.5rem;
  }

  .progress-bar-step .step-label {
    display: none;
  }

  .payment-option-content {
    flex-wrap: wrap;
  }

  .sticky-card {
    position: relative;
    top: 0;
  }
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.checkout-card {
  animation: slideUp 0.5s ease;
}

.sticky-card {
  animation: slideUp 0.5s ease 0.1s both;
}
</style>