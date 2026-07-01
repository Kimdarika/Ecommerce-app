<template>
  <div class="orders-page">
    <div class="container">
      <!-- Page Header -->
      <div class="section-header-with-action">
        <div>
          <span class="section-tag">My Orders</span>
          <h2 class="section-title">
            <i class="fas fa-shopping-bag section-title-icon"></i> Order History
          </h2>
          <p class="section-subtitle">Track and manage your beauty purchases</p>
        </div>
        <router-link to="/products" class="btn-primary">
          <i class="fas fa-shopping-bag"></i> Continue Shopping
          <span class="btn-arrow">→</span>
        </router-link>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p class="loading-text">Loading your orders...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="orders.length === 0" class="empty-state">
        <div class="empty-icon">🛍️</div>
        <h4>No orders yet</h4>
        <p class="empty-text">Start shopping and place your first order!</p>
        <router-link to="/products" class="btn-primary">
          <i class="fas fa-shopping-bag"></i> Start Shopping
          <span class="btn-arrow">→</span>
        </router-link>
      </div>

      <!-- Orders List -->
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <!-- Order Header -->
          <div class="order-header">
            <div class="order-info">
              <span class="order-number">
                <i class="fas fa-receipt"></i> Order #{{ order.order_number || order.id }}
              </span>
              <span class="order-date">
                <i class="fas fa-calendar-alt"></i> {{ new Date(order.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}}
              </span>
            </div>
            <span class="order-status" :class="`status-${order.status || 'pending'}`">
              <span class="status-dot"></span>
              {{ (order.status || 'pending').toUpperCase() }}
            </span>
          </div>

          <!-- Order Body -->
          <div class="order-body">
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <div class="item-image">
                  <img 
                    :src="item.product?.image || item.product?.image_url || 'https://via.placeholder.com/60x60/ff6b6b/ffffff?text=Product'" 
                    :alt="item.product?.name"
                    @error="handleImageError"
                  >
                </div>
                <div class="item-details">
                  <div class="item-name">{{ item.product?.name || 'Product' }}</div>
                  <div class="item-meta">
                    <span class="item-quantity">× {{ item.quantity }}</span>
                    <span class="item-price">${{ (Number(item.price) * item.quantity).toFixed(2) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="order-summary">
              <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ Number(order.total_amount || order.total || 0).toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="order.shipping_cost">
                <span>Shipping</span>
                <span>${{ Number(order.shipping_cost).toFixed(2) }}</span>
              </div>
              <div class="summary-row" v-if="order.tax">
                <span>Tax</span>
                <span>${{ Number(order.tax).toFixed(2) }}</span>
              </div>
              <div class="summary-divider"></div>
              <div class="summary-row total">
                <span>Total</span>
                <span class="total-amount">${{ Number(order.total_amount || order.total || 0).toFixed(2) }}</span>
              </div>
              <div class="payment-info">
                <span class="payment-label">
                  <i class="fas fa-credit-card"></i> Payment
                </span>
                <span class="payment-method">{{ order.payment_method || 'N/A' }}</span>
                <span class="payment-status" :class="`payment-${order.payment_status || 'pending'}`">
                  {{ (order.payment_status || 'pending').toUpperCase() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Order Footer -->
          <div class="order-footer">
            <div class="shipping-address" v-if="order.shipping_address">
              <i class="fas fa-map-marker-alt"></i>
              <span>{{ order.shipping_address }}</span>
            </div>
            <div class="order-actions">
              <button class="btn-outline" @click="viewOrder(order.id)">
                <i class="fas fa-eye"></i> View Details
              </button>
              <button v-if="order.status === 'pending'" class="btn-danger" @click="cancelOrder(order.id)">
                <i class="fas fa-times"></i> Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import { useToast } from 'vue-toastification'
import type { Order } from '@/types'

const router = useRouter()
const toast = useToast()

const orders = ref<Order[]>([])
const loading = ref(true)

const fetchOrders = async () => {
  try {
    const response = await axios.get('/orders')
    orders.value = response.data.data || []
  } catch (error) {
    console.error('Failed to fetch orders', error)
    toast.error('Failed to load orders')
  } finally {
    loading.value = false
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/60x60/ff6b6b/ffffff?text=Product'
}

const viewOrder = (orderId: number) => {
  router.push(`/orders/${orderId}`)
}

const cancelOrder = async (orderId: number) => {
  if (!confirm('Are you sure you want to cancel this order?')) return
  
  try {
    await axios.post(`/orders/${orderId}/cancel`)
    toast.success('Order cancelled successfully')
    await fetchOrders()
  } catch (error) {
    console.error('Failed to cancel order', error)
    toast.error('Failed to cancel order')
  }
}

onMounted(fetchOrders)
</script>

<style scoped>
/* ============================================
   ORDERS PAGE - MATCHING HOME PAGE STYLE
   ============================================ */
.orders-page {
  padding: 40px 0 60px;
  background:#fffbfc 0%;
  min-height: 100vh;
}

/* ============================================
   SECTION HEADER - MATCHING HOME PAGE
   ============================================ */
.section-header-with-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fd79a8;
  background: rgba(253, 121, 168, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 50px;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
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
  font-size: 1.1rem;
  margin: 0.25rem 0 0;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border: none;
  border-radius: 60px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.25);
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(253, 121, 168, 0.35);
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(5px);
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
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  border: 1px solid rgba(253, 121, 168, 0.06);
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

/* ============================================
   ORDER CARD - MATCHING DISCOUNT CARD STYLE
   ============================================ */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.order-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04);
  overflow: hidden;
  border: 1px solid rgba(253, 121, 168, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.order-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(253, 121, 168, 0.08);
}

/* ============================================
   ORDER HEADER - MATCHING DISCOUNT BADGE
   ============================================ */
.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fff5f7, #fce4ec);
  border-bottom: 1px solid rgba(253, 121, 168, 0.06);
  flex-wrap: wrap;
  gap: 10px;
}

.order-info {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.order-number {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.95rem;
}

.order-number i {
  color: #fd79a8;
  margin-right: 6px;
}

.order-date {
  font-size: 0.85rem;
  color: #6c7a89;
}

.order-date i {
  margin-right: 6px;
  color: #9aa5b5;
}

.order-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 16px;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}

.status-pending {
  background: #fef3c7;
  color: #92400e;
}

.status-pending .status-dot {
  background: #f59e0b;
}

.status-processing {
  background: #dbeafe;
  color: #1e40af;
}

.status-processing .status-dot {
  background: #3b82f6;
}

.status-completed {
  background: #d1fae5;
  color: #065f46;
}

.status-completed .status-dot {
  background: #10b981;
}

.status-shipped {
  background: #d1fae5;
  color: #065f46;
}

.status-shipped .status-dot {
  background: #10b981;
}

.status-delivered {
  background: #d1fae5;
  color: #065f46;
}

.status-delivered .status-dot {
  background: #10b981;
}

.status-cancelled {
  background: #fee2e2;
  color: #991b1b;
}

.status-cancelled .status-dot {
  background: #ef4444;
}

/* ============================================
   ORDER BODY
   ============================================ */
.order-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 24px;
  padding: 20px 24px;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  background: #f8fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.order-item:hover {
  background: #f0f4f8;
}

.item-image {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: #f0f2f5;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name {
  font-weight: 500;
  color: #1a1a2e;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 2px;
}

.item-quantity {
  font-size: 0.8rem;
  color: #6c7a89;
}

.item-price {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.9rem;
}

/* ============================================
   ORDER SUMMARY - MATCHING HOME PAGE STYLE
   ============================================ */
.order-summary {
  padding: 16px 20px;
  background: #f8fafc;
  border-radius: 14px;
  border: 1px solid rgba(253, 121, 168, 0.06);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  font-size: 0.9rem;
  color: #1a1a2e;
}

.summary-row.total {
  font-weight: 700;
  font-size: 1.05rem;
}

.total-amount {
  color: #fd79a8;
}

.summary-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

.payment-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #e2e8f0;
  flex-wrap: wrap;
}

.payment-label {
  font-size: 0.8rem;
  color: #6c7a89;
}

.payment-label i {
  margin-right: 4px;
}

.payment-method {
  font-size: 0.8rem;
  font-weight: 500;
  color: #1a1a2e;
}

.payment-status {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 12px;
  border-radius: 50px;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.payment-pending {
  background: #fef3c7;
  color: #92400e;
}

.payment-paid {
  background: #d1fae5;
  color: #065f46;
}

.payment-failed {
  background: #fee2e2;
  color: #991b1b;
}

.payment-refunded {
  background: #e0e7ff;
  color: #3730a3;
}

/* ============================================
   ORDER FOOTER
   ============================================ */
.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background: #fafbff;
  border-top: 1px solid rgba(253, 121, 168, 0.04);
  flex-wrap: wrap;
  gap: 10px;
}

.shipping-address {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #6c7a89;
}

.shipping-address i {
  color: #fd79a8;
}

.order-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  background: transparent;
  color: #1a1a2e;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-outline:hover {
  border-color: #fd79a8;
  color: #fd79a8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(253, 121, 168, 0.08);
}

.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border: none;
  border-radius: 50px;
  background: #fee2e2;
  color: #991b1b;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-danger:hover {
  background: #fecaca;
  transform: translateY(-2px);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 992px) {
  .order-body {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .order-summary {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .orders-page {
    padding: 20px 0 40px;
  }

  .section-header-with-action {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-title {
    font-size: 2rem;
  }

  .order-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 14px 16px;
  }

  .order-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .order-body {
    padding: 16px;
  }

  .order-footer {
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 16px;
  }

  .order-actions {
    width: 100%;
  }

  .order-actions .btn-outline,
  .order-actions .btn-danger {
    flex: 1;
    justify-content: center;
  }

  .order-item {
    padding: 8px 12px;
  }

  .item-image {
    width: 44px;
    height: 44px;
  }

  .item-name {
    font-size: 0.8rem;
  }

  .item-price {
    font-size: 0.8rem;
  }

  .order-summary {
    padding: 12px 16px;
  }

  .summary-row {
    font-size: 0.85rem;
  }

  .summary-row.total {
    font-size: 0.95rem;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.6rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .section-tag {
    font-size: 0.7rem;
  }

  .order-status {
    font-size: 0.65rem;
    padding: 2px 12px;
  }

  .order-number {
    font-size: 0.85rem;
  }

  .order-date {
    font-size: 0.75rem;
  }

  .payment-info {
    gap: 6px;
  }

  .payment-method {
    font-size: 0.75rem;
  }

  .payment-status {
    font-size: 0.6rem;
  }
}
</style>