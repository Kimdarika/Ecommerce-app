<template>
  <div class="container">
    <h2><i class="fas fa-shopping-cart text-primary"></i> Shopping Cart</h2>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else-if="items.length === 0" class="text-center py-5">
      <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
      <h4>Your cart is empty</h4>
      <p class="text-muted">Start shopping and add items to your cart</p>
      <router-link to="/products" class="btn btn-primary">
        <i class="fas fa-shopping-bag"></i> Continue Shopping
      </router-link>
    </div>

    <div v-else class="row">
      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <div v-for="item in items" :key="item.id" class="cart-item border-bottom pb-3 mb-3">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img :src="item.product.image ? `http://localhost:8000/storage/${item.product.image}` : '/placeholder.jpg'" 
                       class="img-fluid rounded" :alt="item.product.name">
                </div>
                <div class="col-md-4">
                  <h6>{{ item.product.name }}</h6>
                  <p class="text-muted small">SKU: {{ item.product.sku }}</p>
                </div>
                <div class="col-md-2">
                  <p class="fw-bold">${{ Number(item.product.price).toFixed(2) }}</p>
                </div>
                <div class="col-md-2">
                  <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" @click="updateQuantity(item.id, item.quantity - 1)">
                      <i class="fas fa-minus"></i>
                    </button>
                    <span>{{ item.quantity }}</span>
                    <button class="btn btn-sm btn-outline-secondary" @click="updateQuantity(item.id, item.quantity + 1)">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="col-md-2 text-end">
                  <p class="fw-bold">${{ (Number(item.product.price) * item.quantity).toFixed(2) }}</p>
                  <button class="btn btn-danger btn-sm" @click="removeItem(item.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Order Summary</h5>
            <hr>
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>{{ total > 50 ? 'Free' : '$5.00' }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
              <span>Tax (10%)</span>
              <span>${{ (total * 0.1).toFixed(2) }}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between mb-3">
              <strong>Total</strong>
              <strong class="text-primary">${{ (total + (total > 50 ? 0 : 5) + total * 0.1).toFixed(2) }}</strong>
            </div>
            <router-link to="/checkout" class="btn btn-primary w-100">
              <i class="fas fa-credit-card"></i> Proceed to Checkout
            </router-link>
            <button class="btn btn-outline-danger w-100 mt-2" @click="clearCart">
              <i class="fas fa-trash-alt"></i> Clear Cart
            </button>
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
.cart-item:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
</style>
