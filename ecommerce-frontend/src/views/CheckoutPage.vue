<template>
  <div class="container">
      <h2><i class="fas fa-credit-card text-primary"></i> Checkout</h2>

    <div class="row">
      <div class="col-md-8">
        <div class="card shadow-sm mb-4">
          <div class="card-body">
            <h5>Shipping Address</h5>
            <form @submit.prevent="placeOrder">
              <div class="mb-3">
                <label class="form-label">Full Address *</label>
                <textarea class="form-control" v-model="form.shipping_address" 
                          rows="3" required></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Billing Address</label>
                <textarea class="form-control" v-model="form.billing_address" rows="3"></textarea>
                <small class="text-muted">Leave empty to use shipping address</small>
              </div>

              <div class="mb-3">
                <label class="form-label">Payment Method *</label>
                <select class="form-select" v-model="form.payment_method" required>
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Order Notes</label>
                <textarea class="form-control" v-model="form.notes" rows="2" 
                          placeholder="Any special instructions?"></textarea>
              </div>

              <button type="submit" class="btn btn-success w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-check-circle me-2"></i>
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Order Summary</h5>
            <hr>
            <div v-for="item in cartItems" :key="item.id" class="d-flex justify-content-between mb-2">
              <span>{{ item.product.name }} × {{ item.quantity }}</span>
              <span>${{ (Number(item.product.price) * item.quantity).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{{ subtotal > 50 ? 'Free' : '$5.00' }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Tax (10%)</span>
              <span>${{ (subtotal * 0.1).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <strong>Total</strong>
              <strong class="text-primary">${{ total.toFixed(2) }}</strong>
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

const loading = ref(false)

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalPrice)
const total = computed(() => {
  const shipping = subtotal.value > 50 ? 0 : 5
  const tax = subtotal.value * 0.1
  return subtotal.value + shipping + tax
})

const placeOrder = async () => {
  if (!form.value.shipping_address) {
    toast.error('Please enter your shipping address')
    return
  }

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
