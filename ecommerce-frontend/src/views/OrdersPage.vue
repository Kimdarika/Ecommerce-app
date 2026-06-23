<template>
  <div class="container">
    <h2><i class="fas fa-shopping-bag text-primary"></i> My Orders</h2>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-5">
      <i class="fas fa-shopping-bag fa-4x text-muted mb-3"></i>
      <h4>No orders yet</h4>
      <p class="text-muted">Start shopping and place your first order!</p>
      <router-link to="/products" class="btn btn-primary">
        <i class="fas fa-shopping-bag"></i> Start Shopping
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div v-for="order in orders" :key="order.id" class="col-12">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <div>
              <strong>Order #{{ order.order_number }}</strong>
              <span class="text-muted ms-3">{{ new Date(order.created_at).toLocaleDateString() }}</span>
            </div>
            <span class="badge" :class="`bg-${order.status_badge || 'secondary'}`">
              {{ order.status.toUpperCase() }}
            </span>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-8">
                <div v-for="item in order.items" :key="item.id" class="d-flex justify-content-between mb-2">
                  <span>{{ item.product.name }} × {{ item.quantity }}</span>
                  <span>${{ (Number(item.price) * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <div class="col-md-4">
                <div class="d-flex justify-content-between">
                  <span>Total:</span>
                  <strong>${{ Number(order.total_amount).toFixed(2) }}</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Payment:</span>
                  <span>{{ order.payment_method }}</span>
                </div>
                <div class="d-flex justify-content-between">
                  <span>Status:</span>
                  <span>{{ order.payment_status }}</span>
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
import { ref, onMounted } from 'vue'
import axios from '@/plugins/axios'
import type { Order } from '@/types'

const orders = ref<Order[]>([])
const loading = ref(true)

const fetchOrders = async () => {
  try {
    const response = await axios.get('/orders')
    orders.value = response.data.data || []
  } catch (error) {
    console.error('Failed to fetch orders', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchOrders)
</script>