<template>
  <div class="container">
    <!-- Page Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2><i class="fas fa-box text-primary"></i> All Products</h2>
        <p class="text-muted">Browse our collection of {{ pagination.total || 0 }} quality products</p>
      </div>
      <div>
        <router-link to="/" class="btn btn-outline-secondary me-2">
          <i class="fas fa-home"></i> Home
        </router-link>
        <button class="btn btn-outline-primary" @click="resetFilters">
          <i class="fas fa-sync"></i> Reset
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="row mb-4">
      <div class="col-md-8">
        <div class="d-flex gap-2 flex-wrap">
          <!-- Search -->
          <div class="input-group" style="max-width: 300px;">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
            <input type="text" class="form-control" v-model="filters.search" 
                   placeholder="Search products..." @input="debouncedSearch">
          </div>
          
          <!-- Category Filter -->
          <select class="form-select w-auto" v-model="filters.category" @change="fetchProducts(1)">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }} ({{ category.products_count || 0 }})
            </option>
          </select>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="d-flex gap-2 justify-content-md-end">
          <!-- Sort -->
          <select class="form-select w-auto" v-model="filters.sort" @change="fetchProducts(1)">
            <option value="latest">Latest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
          
          <!-- Per Page -->
          <select class="form-select w-auto" v-model="filters.per_page" @change="fetchProducts(1)">
            <option value="12">12</option>
            <option value="24">24</option>
            <option value="30" selected>30</option>
            <option value="48">48</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="text-muted mt-2">Loading products...</p>
    </div>

    <!-- No Products Found -->
    <div v-else-if="products.length === 0" class="text-center py-5">
      <i class="fas fa-box-open fa-4x text-muted mb-3"></i>
      <h4>No products found</h4>
      <p class="text-muted">Try adjusting your filters or search terms</p>
      <button class="btn btn-primary" @click="resetFilters">
        <i class="fas fa-sync"></i> Reset Filters
      </button>
    </div>

    <!-- Products Grid -->
    <div v-else>
      <div class="row g-4">
        <div v-for="product in products" :key="product.id" class="col-md-3 col-sm-6">
          <ProductCard :product="product" @add-to-cart="handleAddToCart" />
        </div>
      </div>

      <!-- Results Info -->
      <div class="text-center text-muted mt-3">
        Showing {{ (pagination.current_page - 1) * pagination.per_page + 1 }} - 
        {{ Math.min(pagination.current_page * pagination.per_page, pagination.total) }} 
        of {{ pagination.total }} products
      </div>

      <!-- Pagination -->
      <nav class="mt-4" v-if="pagination.last_page > 1">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
            <button class="page-link" @click="goToPage(pagination.current_page - 1)">
              <i class="fas fa-chevron-left"></i> Previous
            </button>
          </li>
          
          <li v-for="page in visiblePages" :key="page" 
              class="page-item" :class="{ active: page === pagination.current_page }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          
          <li class="page-item" :class="{ disabled: pagination.current_page === pagination.last_page }">
            <button class="page-link" @click="goToPage(pagination.current_page + 1)">
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/plugins/axios'
import ProductCard from '@/components/ProductCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'
import type { Product, Category } from '@/types'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const toast = useToast()

// State
const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(false)
const filters = ref({
  search: '',
  category: (route.query.category as string) || '',
  sort: 'latest',
  per_page: 30,
})
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 30,
  total: 0,
})

let searchTimeout: any = null

// Computed
const visiblePages = computed(() => {
  const current = pagination.value.current_page
  const last = pagination.value.last_page
  const pages = []
  
  if (last <= 7) {
    for (let i = 1; i <= last; i++) pages.push(i)
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, '...', last)
    } else if (current >= last - 2) {
      pages.push(1, '...', last - 3, last - 2, last - 1, last)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', last)
    }
  }
  return pages
})

// Methods
const fetchProducts = async (page = 1) => {
  loading.value = true
  try {
    const params: any = { 
      ...filters.value, 
      page,
      per_page: filters.value.per_page 
    }
    if (filters.value.search) params.search = filters.value.search
    
    const response = await axios.get('/products', { params })
    products.value = response.data.data || []
    pagination.value = {
      current_page: response.data.current_page || 1,
      last_page: response.data.last_page || 1,
      per_page: response.data.per_page || 30,
      total: response.data.total || 0,
    }
  } catch (error) {
    console.error('Failed to fetch products', error)
    toast.error('Failed to load products')
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get('/categories')
    categories.value = response.data || []
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= pagination.value.last_page) {
    fetchProducts(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const debouncedSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchProducts(1)
  }, 500)
}

const resetFilters = () => {
  filters.value = {
    search: '',
    category: '',
    sort: 'latest',
    per_page: 30,
  }
  fetchProducts(1)
  router.push('/products')
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

// Watch for category query parameter changes
watch(() => route.query.category, (newCategory) => {
  if (newCategory) {
    filters.value.category = newCategory as string
    fetchProducts(1)
  }
})

// Lifecycle
onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.page-link {
  cursor: pointer;
}

.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>
