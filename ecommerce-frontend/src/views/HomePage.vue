<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <span class="badge bg-danger mb-3 px-4 py-2">🔥 Sale Up To 50% On</span>
              <h1 class="display-3 fw-bold">Clean Matte <br>Liquid Foundation</h1>
              <p class="lead text-muted">Discover the perfect foundation for your skin type</p>
              <div class="d-flex gap-3 mt-4 flex-wrap">
                <router-link to="/products" class="btn btn-primary btn-lg px-5">
                  <i class="fas fa-shopping-bag me-2"></i> Shop Now
                </router-link>
                <router-link to="/about" class="btn btn-outline-secondary btn-lg px-5">
                  <i class="fas fa-info-circle me-2"></i> Learn More
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <img 
                src="https://i.pinimg.com/1200x/95/74/9f/95749f8c1234cd7d3b1094364be95deb.jpg" 
                class="img-fluid rounded-4 shadow-lg" 
                alt="Cosmetic Products"
                @error="handleImageError"
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop By Categories -->
    <section class="categories-section py-5">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold">Shop By Categories</h2>
        <div class="row g-4">
          <div v-for="category in displayCategories" :key="category.id" class="col-md-2 col-4">
            <router-link :to="`/products?category=${category.id}`" class="text-decoration-none">
              <div class="category-card text-center">
                <div class="category-icon">
                  <i :class="category.icon" class="fa-3x"></i>
                </div>
                <h6 class="mt-3 mb-0">{{ category.name }}</h6>
                <small class="text-muted">{{ category.products_count || 0 }} products</small>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Discount Section -->
    <section class="discount-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="discount-card bg-gradient-pink text-white p-5 rounded-4">
              <h3 class="display-6 fw-bold">Discount 25% On</h3>
              <h2 class="display-4 fw-bold">Cosmetic Skin Perfectly</h2>
              <p>Get the perfect skin you deserve</p>
              <router-link to="/products" class="btn btn-light btn-lg mt-3">
                <i class="fas fa-shopping-bag me-2"></i> Shop Now
              </router-link>
            </div>
          </div>
          <div class="col-md-6">
            <div class="discount-card bg-gradient-purple text-white p-5 rounded-4">
              <h3 class="display-6 fw-bold">Discount 35% On</h3>
              <h2 class="display-4 fw-bold">Hydrated Skin Perfectly</h2>
              <p>Keep your skin hydrated and glowing</p>
              <router-link to="/products" class="btn btn-light btn-lg mt-3">
                <i class="fas fa-shopping-bag me-2"></i> Shop Now
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="trending-section py-5">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h2 class="fw-bold">Trending Product</h2>
          <div class="d-flex gap-2 flex-wrap">
            <button class="btn btn-outline-primary btn-sm" @click="filterTrending('all')" 
                    :class="{'active': trendingFilter === 'all'}">All</button>
            <button class="btn btn-outline-primary btn-sm" @click="filterTrending('face')"
                    :class="{'active': trendingFilter === 'face'}">For Face</button>
            <button class="btn btn-outline-primary btn-sm" @click="filterTrending('hair')"
                    :class="{'active': trendingFilter === 'hair'}">For Hair</button>
            <button class="btn btn-outline-primary btn-sm" @click="filterTrending('body')"
                    :class="{'active': trendingFilter === 'body'}">For Body</button>
            <button class="btn btn-outline-primary btn-sm" @click="filterTrending('skincare')"
                    :class="{'active': trendingFilter === 'skincare'}">For Skin Care</button>
          </div>
        </div>

        <div class="row g-4">
          <div v-for="product in filteredTrending" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>

        <div class="text-center mt-4">
          <router-link to="/products" class="btn btn-primary btn-lg">
            <i class="fas fa-eye me-2"></i> Shop All Products
          </router-link>
        </div>
      </div>
    </section>

    <!-- Promo Banners -->
    <section class="promo-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="promo-card bg-gradient-orange text-white p-4 rounded-4 text-center">
              <h3>Upto 50% off</h3>
              <h2 class="fw-bold">Mystique Fragrance</h2>
              <p>A mysterious scent that leaves a lasting impression.</p>
              <router-link to="/products" class="btn btn-light mt-2">
                <i class="fas fa-shopping-bag me-2"></i> Shop Now
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="promo-card bg-gradient-blue text-white p-4 rounded-4 text-center">
              <h3>Foundation</h3>
              <h2 class="fw-bold">20% OFF</h2>
              <p>Perfect your look with our premium foundation</p>
              <router-link to="/products" class="btn btn-light mt-2">
                <i class="fas fa-shopping-bag me-2"></i> Shop Now
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="promo-card bg-gradient-green text-white p-4 rounded-4 text-center">
              <h3>Glam Essentials</h3>
              <p>Everyday products for a flawless look.</p>
              <p><strong>Hair - Face - Body</strong></p>
              <router-link to="/products" class="btn btn-light mt-2">
                <i class="fas fa-shopping-bag me-2"></i> Shop Now
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Seller -->
    <section class="bestseller-section py-5">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold">Best Seller</h2>
        <div class="row g-4">
          <div v-for="product in bestSellers" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>
    </section>

    <!-- Top Rated -->
    <section class="toprated-section py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5 fw-bold">Top Rated</h2>
        <div class="row g-4">
          <div v-for="product in topRated" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 text-center">
            <h2 class="fw-bold">Subscribe to Our Newsletter</h2>
            <p class="text-muted">Get the latest updates on new products and upcoming sales</p>
            <div class="input-group mt-3" style="max-width: 500px; margin: 0 auto;">
              <input type="email" class="form-control" placeholder="Enter your email" aria-label="Email">
              <button class="btn btn-primary" type="button">
                <i class="fas fa-paper-plane me-2"></i> Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from '@/plugins/axios'
import ProductCard from '@/components/ProductCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'
import type { Product, Category } from '@/types'

const authStore = useAuthStore()
const cartStore = useCartStore()
const toast = useToast()

// Categories with icons
const displayCategories = ref([
  { id: 1, name: 'Perfume', icon: 'fas fa-spray-can', products_count: 0 },
  { id: 2, name: 'Makeup Brushes', icon: 'fas fa-paint-brush', products_count: 0 },
  { id: 3, name: 'Hair Cream', icon: 'fas fa-hand-sparkles', products_count: 0 },
  { id: 4, name: 'Makeup Lipsticks', icon: 'fas fa-lipstick', products_count: 0 },
  { id: 5, name: 'Skin Care Creams', icon: 'fas fa-flask', products_count: 0 },
  { id: 6, name: 'Face Primer', icon: 'fas fa-face-smile', products_count: 0 },
])

// Products
const allProducts = ref<Product[]>([])
const trendingFilter = ref('all')
const trendingProducts = ref<Product[]>([])
const bestSellers = ref<Product[]>([])
const topRated = ref<Product[]>([])
const loading = ref(false)

// Computed
const filteredTrending = computed(() => {
  if (trendingFilter.value === 'all') return trendingProducts.value
  return trendingProducts.value.filter(p => 
    p.category?.name?.toLowerCase().includes(trendingFilter.value) || false
  )
})

// Methods
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/600x600/ff6b6b/ffffff?text=Beauty+Products'
}

const fetchProducts = async () => {
  loading.value = true
  try {
    const response = await axios.get('/products', { params: { per_page: 30 } })
    allProducts.value = response.data.data || []

    trendingProducts.value = allProducts.value.slice(0, 8)
    bestSellers.value = allProducts.value.slice(8, 12)
    topRated.value = allProducts.value.slice(0, 4)
  } catch (error) {
    console.error('Failed to fetch products', error)
    allProducts.value = []
    trendingProducts.value = []
    bestSellers.value = []
    topRated.value = []
  } finally {
    loading.value = false
  }
}

const filterTrending = (filter: string) => {
  trendingFilter.value = filter
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

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
/* Hero Section */
.hero-section {
  padding: 60px 0;
  background: linear-gradient(135deg, #fff5f7 0%, #ffe8ec 50%, #fff0f0 100%);
  min-height: 500px;
}

.hero-content .badge {
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.hero-content h1 {
  color: #2d3436;
  line-height: 1.2;
}

.hero-image img {
  max-height: 400px;
  width: 100%;
  object-fit: cover;
}

/* Categories */
.category-card {
  background: white;
  padding: 20px 10px;
  border-radius: 16px;
  transition: all 0.3s;
  box-shadow: 0 2px 15px rgba(0,0,0,0.05);
  cursor: pointer;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  border-color: #ff6b6b;
}

.category-icon {
  width: 65px;
  height: 65px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff5f7, #ffe8ec);
  border-radius: 50%;
  transition: all 0.3s;
}

.category-card:hover .category-icon {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
}

.category-card:hover .category-icon i {
  color: white !important;
}

.category-icon i {
  transition: all 0.3s;
}

.category-card h6 {
  font-weight: 600;
  color: #2d3436;
  font-size: 0.9rem;
}

/* Discount Cards */
.discount-card {
  transition: transform 0.3s;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.discount-card:hover {
  transform: translateY(-8px);
}

.bg-gradient-pink {
  background: linear-gradient(135deg, #fd79a8, #e17055);
}

.bg-gradient-purple {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
}

/* Promo Cards */
.promo-card {
  transition: transform 0.3s;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.promo-card:hover {
  transform: translateY(-8px);
}

.bg-gradient-orange {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
}

.bg-gradient-blue {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.bg-gradient-green {
  background: linear-gradient(135deg, #55efc4, #00b894);
}

/* Filter Buttons */
.btn-outline-primary.active {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border-color: #fd79a8;
}

.btn-outline-primary.active:hover {
  background: linear-gradient(135deg, #e17055, #fd79a8);
  color: white;
}

/* Section Titles */
section h2 {
  font-weight: 700;
  color: #2d3436;
  position: relative;
}

.text-center h2:after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-radius: 10px;
}

/* Newsletter */
.newsletter-section {
  background: linear-gradient(135deg, #2d3436, #1a1a2e);
  color: white;
}

.newsletter-section .text-muted {
  color: #b2bec3 !important;
}

.newsletter-section .form-control {
  border-radius: 50px 0 0 50px;
  padding: 12px 20px;
  border: none;
}

.newsletter-section .btn {
  border-radius: 0 50px 50px 0;
  padding: 12px 30px;
}

/* Responsive */
@media (max-width: 992px) {
  .hero-content h1 {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
    text-align: center;
  }
  
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .hero-content .btn {
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem;
  }
  
  .category-card {
    padding: 15px 5px;
  }
  
  .category-icon i {
    font-size: 1.5rem !important;
  }
  
  .category-icon {
    width: 50px;
    height: 50px;
  }
  
  .discount-card {
    padding: 30px 20px !important;
    min-height: 180px;
  }
  
  .discount-card h2 {
    font-size: 2rem !important;
  }
  
  .discount-card h3 {
    font-size: 1.5rem !important;
  }
  
  .promo-card {
    min-height: 150px;
    padding: 20px !important;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 1.8rem;
  }
  
  .hero-content .badge {
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
  }
  
  .trending-section .d-flex {
    flex-direction: column;
    align-items: flex-start !important;
    gap: 10px;
  }
  
  .trending-section .d-flex h2 {
    margin-bottom: 5px;
  }
  
  .btn-outline-primary.btn-sm {
    font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
  }
}
</style>
