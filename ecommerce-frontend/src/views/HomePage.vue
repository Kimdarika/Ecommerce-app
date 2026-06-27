<template>
  <div class="home-page">
    <!-- Hero Section with Slideshow -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <div class="hero-content">
              <span class="hero-badge">
                <i class="fas fa-fire"></i> Sale Up To 50% On
              </span>
              <h1 class="hero-title">
                Chhouk Shop <br><span class="gradient-text">Liquid Foundation</span>
              </h1>
              <p class="hero-description">Discover the perfect foundation for your radiant skin</p>
              <div class="hero-actions">
                <router-link to="/products" class="btn-primary-hero">
                  <i class="fas fa-shopping-bag"></i> Shop Now
                  <span class="btn-arrow">→</span>
                </router-link>
                <router-link to="/about" class="btn-secondary-hero">
                  <i class="fas fa-play-circle"></i> Learn More
                </router-link>
              </div>
              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-number">50K+</span>
                  <span class="stat-label">Happy Customers</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <span class="stat-number">4.9★</span>
                  <span class="stat-label">Average Rating</span>
                </div>
                <div class="stat-divider"></div>
                <div class="stat-item">
                  <span class="stat-number">500+</span>
                  <span class="stat-label">Products</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-slideshow">
              <div class="slideshow-container">
                <div 
                  v-for="(slide, index) in slides" 
                  :key="index"
                  class="slide"
                  :class="{ active: currentSlide === index }"
                >
                  <img 
                    :src="slide.image" 
                    :alt="slide.title"
                    class="slide-image"
                    @error="handleSlideImageError"
                  >
                  <div class="slide-overlay">
                    <span class="slide-tag">{{ slide.tag }}</span>
                    <h3 class="slide-title">{{ slide.title }}</h3>
                    <p class="slide-desc">{{ slide.description }}</p>
                  </div>
                </div>
                
                <button class="slide-btn slide-btn-prev" @click="prevSlide">
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button class="slide-btn slide-btn-next" @click="nextSlide">
                  <i class="fas fa-chevron-right"></i>
                </button>
                
                <div class="slide-indicators">
                  <span 
                    v-for="(slide, index) in slides" 
                    :key="index"
                    class="indicator-dot"
                    :class="{ active: currentSlide === index }"
                    @click="goToSlide(index)"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Shop By Categories -->
    <section class="categories-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Categories</span>
          <h2 class="section-title">Shop By Collection</h2>
          <p class="section-subtitle">Discover products tailored to your beauty needs</p>
        </div>
        <div class="row g-4">
          <div v-for="category in displayCategories" :key="category.id" class="col-md-2 col-4">
            <router-link :to="`/products?category=${category.id}`" class="category-link">
              <div class="category-card">
                <div class="category-icon">
                  <i :class="category.icon"></i>
                </div>
                <h6 class="category-name">{{ category.name }}</h6>
                <span class="category-count">{{ category.products_count || 0 }} products</span>
                <div class="category-hover"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Discount Section -->
    <section class="discount-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6">
            <div class="discount-card discount-card-1">
              <div class="discount-badge">-25%</div>
              <div class="discount-content">
                <span class="discount-tag">Limited Offer</span>
                <h3>Discount 25% On</h3>
                <h2>Cosmetic Skin Perfectly</h2>
                <p>Get the perfect skin you deserve with our premium range</p>
                <router-link to="/products" class="discount-cta">
                  Claim Offer <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="discount-card discount-card-2">
              <div class="discount-badge">-35%</div>
              <div class="discount-content">
                <span class="discount-tag">Flash Sale</span>
                <h3>Discount 35% On</h3>
                <h2>Hydrated Skin Perfectly</h2>
                <p>Keep your skin hydrated and glowing all day long</p>
                <router-link to="/products" class="discount-cta">
                  Claim Offer <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trending Products -->
    <section class="trending-section">
      <div class="container">
        <div class="section-header-with-filter">
          <div>
            <span class="section-tag">Trending</span>
            <h2 class="section-title">Most Popular Products</h2>
            <p class="section-subtitle">Curated picks based on what our customers love</p>
          </div>
          <div class="filter-tabs">
            <button 
              v-for="filter in ['all', 'face', 'hair', 'body', 'skincare']" 
              :key="filter"
              class="filter-tab" 
              @click="filterTrending(filter)" 
              :class="{'active': trendingFilter === filter}"
            >
              {{ filter === 'all' ? 'All' : filter.charAt(0).toUpperCase() + filter.slice(1) }}
            </button>
          </div>
        </div>

        <div class="row g-4">
          <div v-for="product in filteredTrending" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>

        <div class="view-all-wrapper">
          <router-link to="/products" class="view-all-btn">
            Browse All Products
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Promo Banners -->
    <section class="promo-section">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-4">
            <div class="promo-card promo-card-1">
              <div class="promo-icon">🏷️</div>
              <h3>Upto 50% off</h3>
              <h2>Mystique Fragrance</h2>
              <p>A mysterious scent that leaves a lasting impression</p>
              <router-link to="/products" class="promo-cta">
                Explore <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="promo-card promo-card-2">
              <div class="promo-icon">⭐</div>
              <h3>Foundation</h3>
              <h2>20% OFF</h2>
              <p>Perfect your look with our premium foundation</p>
              <router-link to="/products" class="promo-cta">
                Explore <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="promo-card promo-card-3">
              <div class="promo-icon">💎</div>
              <h3>Glam Essentials</h3>
              <h2>Complete Set</h2>
              <p>Hair • Face • Body — Everything you need</p>
              <router-link to="/products" class="promo-cta">
                Explore <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Seller -->
    <section class="bestseller-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Bestsellers</span>
          <h2 class="section-title">Customer Favorites</h2>
          <p class="section-subtitle">The products everyone's raving about</p>
        </div>
        <div class="row g-4">
          <div v-for="product in bestSellers" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>
    </section>

    <!-- Top Rated -->
    <section class="toprated-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Top Rated</span>
          <h2 class="section-title">Highest Quality</h2>
          <p class="section-subtitle">Products that exceed expectations every time</p>
        </div>
        <div class="row g-4">
          <div v-for="product in topRated" :key="product.id" class="col-md-3 col-sm-6">
            <ProductCard :product="product" @add-to-cart="handleAddToCart" />
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-wrapper">
          <div class="newsletter-content">
            <span class="newsletter-tag">Stay Updated</span>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get exclusive offers, new product alerts, and beauty tips</p>
            <form class="newsletter-form" @submit.prevent="handleSubscribe">
              <input 
                type="email" 
                class="newsletter-input" 
                placeholder="Enter your email address"
                required
              >
              <button type="submit" class="newsletter-btn">
                Subscribe <i class="fas fa-paper-plane"></i>
              </button>
            </form>
            <p class="newsletter-note">
              <i class="fas fa-lock"></i> No spam, unsubscribe anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from '@/plugins/axios'
import ProductCard from '@/components/ProductCard.vue'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useToast } from 'vue-toastification'
import type { Product, Category } from '@/types'

const authStore = useAuthStore()
const cartStore = useCartStore()
const toast = useToast()

// ===== SLIDESHOW DATA =====
const slides = ref([
  {
    image: 'https://i.pinimg.com/736x/b1/9c/2e/b19c2e1141b37ce25c211e29dfe28cbb.jpg',
    title: 'Luxury Skincare Collection',
    description: 'Premium products for radiant skin',
    tag: 'New Arrival'
  },
  {
    image: 'https://i.pinimg.com/1200x/66/45/9c/66459c7a7c6e76516adbad31e471788e.jpg',
    title: 'Organic Beauty Essentials',
    description: 'Natural ingredients for glowing beauty',
    tag: 'Best Seller'
  },
  {
    image: 'https://i.pinimg.com/1200x/45/3f/82/453f82a20cba90a884bedd30d3a8f9ec.jpg',
    title: 'Makeup Artist Collection',
    description: 'Professional grade cosmetics',
    tag: 'Trending'
  },
  {
    image: 'https://i.pinimg.com/736x/30/dd/ea/30ddea860268f74df75d78921af1526d.jpg',
    title: 'Spa & Wellness Range',
    description: 'Relax and rejuvenate with our spa products',
    tag: 'Sale'
  }
])

const currentSlide = ref(0)
let slideInterval: ReturnType<typeof setInterval> | null = null

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

// ===== SLIDESHOW METHODS =====
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0 
    ? slides.value.length - 1 
    : currentSlide.value - 1
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startSlideshow = () => {
  if (slideInterval) clearInterval(slideInterval)
  slideInterval = setInterval(nextSlide, 5000)
}

// ===== OTHER METHODS =====
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/600x600/ff6b6b/ffffff?text=Beauty+Products'
}

const handleSlideImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/800x500/ff6b6b/ffffff?text=Beauty+Collection'
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

const handleSubscribe = () => {
  toast.success('Subscribed successfully! 🎉')
}

onMounted(() => {
  fetchProducts()
  startSlideshow()
})

onBeforeUnmount(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
})
</script>

<style scoped>
/* ============================================
   HOME PAGE - PROFESSIONAL BEAUTY STYLE
   ============================================ */
.home-page {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

/* Section Headers */
.section-header {
  margin-bottom: 3rem;
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
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #6c7a89;
  font-size: 1.1rem;
  max-width: 600px;
}

.text-center .section-subtitle {
  margin: 0 auto;
}

.section-header-with-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* ============================================
   HERO SECTION WITH SLIDESHOW
   ============================================ */
.hero-section {
  padding: 80px 0 60px;
  background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 600px;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(253, 121, 168, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.04) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #fd79a8 0%, #e17055 50%, #f093fb 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: #6c7a89;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 25px rgba(253, 121, 168, 0.35);
}

.btn-primary-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(253, 121, 168, 0.5);
  color: white;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary-hero:hover .btn-arrow {
  transform: translateX(5px);
}

.btn-secondary-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #1a1a2e;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(253, 121, 168, 0.2);
}

.btn-secondary-hero:hover {
  background: white;
  border-color: #fd79a8;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  color: #1a1a2e;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  border-top: 2px solid rgba(0, 0, 0, 0.04);
  border-bottom: 2px solid rgba(0, 0, 0, 0.04);
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
}

.stat-label {
  font-size: 0.8rem;
  color: #9aa5b5;
  font-weight: 500;
}

.stat-divider {
  width: 2px;
  height: 35px;
  background: #e8ecf1;
}

/* Hero Slideshow */
.hero-slideshow {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);
}

.slideshow-container {
  position: relative;
  width: 100%;
  height: 450px;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  pointer-events: auto;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 6s ease;
}

.slide.active .slide-image {
  transform: scale(1.05);
}

.slide-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: white;
}

.slide-tag {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.2rem 1rem;
  border-radius: 50px;
  margin-bottom: 0.5rem;
  backdrop-filter: blur(10px);
}

.slide-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.slide-desc {
  font-size: 0.95rem;
  opacity: 0.85;
}

.slide-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.slide-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-50%) scale(1.1);
}

.slide-btn-prev {
  left: 1rem;
}

.slide-btn-next {
  right: 1rem;
}

.slide-indicators {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: white;
  width: 30px;
  border-radius: 10px;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.6);
}

/* ============================================
   CATEGORIES SECTION
   ============================================ */
.categories-section {
  padding: 80px 0;
  background: white;
}

.category-link {
  text-decoration: none;
}

.category-card {
  background: white;
  padding: 2rem 1rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid #f0f2f5;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.category-card:hover {
  transform: translateY(-8px);
  border-color: #fd79a8;
  box-shadow: 0 12px 40px rgba(253, 121, 168, 0.12);
}

.category-hover {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(253, 121, 168, 0.05), rgba(225, 112, 85, 0.05));
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 18px;
}

.category-card:hover .category-hover {
  opacity: 1;
}

.category-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fff5f7, #ffe8ec);
  border-radius: 50%;
  transition: all 0.4s ease;
  font-size: 2rem;
  color: #fd79a8;
  position: relative;
  z-index: 1;
}

.category-card:hover .category-icon {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  transform: scale(1.1) rotate(-5deg);
}

.category-card:hover .category-icon i {
  color: white !important;
}

.category-name {
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
  position: relative;
  z-index: 1;
  font-size: 0.95rem;
}

.category-count {
  font-size: 0.75rem;
  color: #9aa5b5;
  position: relative;
  z-index: 1;
}

/* ============================================
   DISCOUNT SECTION
   ============================================ */
.discount-section {
  padding: 80px 0;
  background: #fafbff;
}

.discount-card {
  padding: 3.5rem 3rem;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: white;
  min-height: 240px;
  display: flex;
  align-items: center;
}

.discount-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.discount-card-1 {
  background: linear-gradient(135deg, #fd79a8, #e17055);
}

.discount-card-2 {
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
}

.discount-card::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -20%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 50%;
  pointer-events: none;
}

.discount-card::after {
  content: '';
  position: absolute;
  bottom: -30%;
  left: -10%;
  width: 300px;
  height: 300px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  pointer-events: none;
}

.discount-badge {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 2;
}

.discount-content {
  position: relative;
  z-index: 2;
}

.discount-tag {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.2rem 1rem;
  border-radius: 50px;
  margin-bottom: 0.75rem;
}

.discount-content h3 {
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.discount-content h2 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
  line-height: 1.1;
}

.discount-content p {
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
  max-width: 300px;
}

.discount-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.discount-cta:hover {
  background: rgba(255, 255, 255, 0.25);
  color: white;
  transform: translateX(5px);
}

.discount-cta i {
  transition: transform 0.3s ease;
}

.discount-cta:hover i {
  transform: translateX(5px);
}

/* ============================================
   PRODUCT CARD ENHANCEMENTS
   ============================================ */
:deep(.product-card) {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  position: relative;
}

:deep(.product-card:hover) {
  transform: translateY(-8px);
  border-color: #fd79a8;
  box-shadow: 0 12px 40px rgba(253, 121, 168, 0.12);
}

:deep(.product-card .product-image-wrapper) {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #fff5f7, #ffe8ec);
}

:deep(.product-card .product-image) {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.product-card:hover .product-image) {
  transform: scale(1.05);
}

:deep(.product-card .product-badges) {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

:deep(.product-card .badge-new) {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(253, 121, 168, 0.3);
}

:deep(.product-card .badge-organic) {
  background: #48bb78;
  color: white;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

:deep(.product-card .badge-vegan) {
  background: #68d391;
  color: white;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(104, 211, 145, 0.3);
}

:deep(.product-card .badge-discount) {
  background: #fc8181;
  color: white;
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(252, 129, 129, 0.3);
}

:deep(.product-card .product-info) {
  padding: 16px 18px 18px;
}

:deep(.product-card .product-name) {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4rem;
}

:deep(.product-card .product-brand) {
  font-size: 0.8rem;
  color: #9aa5b5;
  margin-bottom: 6px;
}

:deep(.product-card .product-rating) {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
}

:deep(.product-card .stars) {
  display: flex;
  gap: 2px;
}

:deep(.product-card .stars i) {
  font-size: 0.75rem;
  color: #e2e8f0;
}

:deep(.product-card .stars i.filled) {
  color: #f5b042;
}

:deep(.product-card .review-count) {
  font-size: 0.7rem;
  color: #9aa5b5;
}

:deep(.product-card .product-price) {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

:deep(.product-card .current-price) {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
}

:deep(.product-card .original-price) {
  font-size: 0.9rem;
  color: #9aa5b5;
  text-decoration: line-through;
}

:deep(.product-card .btn-add-cart) {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 12px;
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

:deep(.product-card .btn-add-cart:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(253, 121, 168, 0.3);
}

:deep(.product-card .btn-add-cart:disabled) {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
}

:deep(.product-card .btn-add-cart i) {
  font-size: 0.85rem;
}

/* Heart wishlist button */
:deep(.product-card .wishlist-btn) {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

:deep(.product-card .wishlist-btn:hover) {
  background: white;
  transform: scale(1.1);
}

:deep(.product-card .wishlist-btn i) {
  color: #9aa5b5;
  font-size: 1rem;
  transition: all 0.3s ease;
}

:deep(.product-card .wishlist-btn:hover i) {
  color: #fd79a8;
}

:deep(.product-card .wishlist-btn.liked i) {
  color: #fd79a8;
}

/* ============================================
   TRENDING SECTION
   ============================================ */
.trending-section {
  padding: 80px 0;
  background: white;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  background: #f5f6f8;
  padding: 0.5rem;
  border-radius: 60px;
}

.filter-tab {
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: transparent;
  color: #6c7a89;
  font-weight: 500;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.filter-tab:hover {
  color: #fd79a8;
}

.filter-tab.active {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  box-shadow: 0 2px 12px rgba(253, 121, 168, 0.3);
}

.view-all-wrapper {
  text-align: center;
  margin-top: 3rem;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 3rem;
  background: white;
  color: #fd79a8;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid #fd79a8;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.view-all-btn:hover {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(253, 121, 168, 0.3);
}

.view-all-btn i {
  transition: transform 0.3s ease;
}

.view-all-btn:hover i {
  transform: translateX(5px);
}

/* ============================================
   PROMO SECTION
   ============================================ */
.promo-section {
  padding: 80px 0;
  background: #fafbff;
}

.promo-card {
  padding: 2.5rem 2rem;
  border-radius: 24px;
  text-align: center;
  color: white;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.promo-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.promo-card-1 {
  background: linear-gradient(135deg, #fdcb6e, #e17055);
}

.promo-card-2 {
  background: linear-gradient(135deg, #74b9ff, #0984e3);
}

.promo-card-3 {
  background: linear-gradient(135deg, #55efc4, #00b894);
}

.promo-card::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
}

.promo-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
}

.promo-card h3 {
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.85;
  margin-bottom: 0.25rem;
  position: relative;
  z-index: 2;
}

.promo-card h2 {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.promo-card p {
  font-size: 0.95rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 2;
}

.promo-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

.promo-cta:hover {
  background: rgba(255, 255, 255, 0.25);
  color: white;
}

.promo-cta i {
  transition: transform 0.3s ease;
}

.promo-cta:hover i {
  transform: translateX(5px);
}

/* ============================================
   BESTSELLER & TOP RATED
   ============================================ */
.bestseller-section {
  padding: 80px 0;
  background: white;
}

.toprated-section {
  padding: 80px 0;
  background: #fafbff;
}

/* ============================================
   NEWSLETTER SECTION
   ============================================ */
.newsletter-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
  position: relative;
  overflow: hidden;
}

.newsletter-section::before {
  content: '';
  position: absolute;
  top: -30%;
  left: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(253, 121, 168, 0.06) 0%, transparent 70%);
  border-radius: 50%;
}

.newsletter-section::after {
  content: '';
  position: absolute;
  bottom: -30%;
  right: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.03) 0%, transparent 70%);
  border-radius: 50%;
}

.newsletter-wrapper {
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.newsletter-content {
  text-align: center;
  color: white;
}

.newsletter-tag {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #fd79a8;
  background: rgba(253, 121, 168, 0.15);
  padding: 0.3rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.newsletter-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.newsletter-content p {
  color: #b2bec3;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.newsletter-form {
  display: flex;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem;
  border-radius: 60px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.newsletter-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.9rem 1.5rem;
  color: white;
  font-size: 1rem;
  border-radius: 50px;
  outline: none;
}

.newsletter-input::placeholder {
  color: #9aa5b5;
}

.newsletter-input:focus {
  background: rgba(255, 255, 255, 0.03);
}

.newsletter-btn {
  padding: 0.9rem 2rem;
  border-radius: 50px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.newsletter-btn:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(253, 121, 168, 0.3);
}

.newsletter-note {
  font-size: 0.85rem;
  color: #6c7a89 !important;
  margin-top: 1.5rem !important;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1200px) {
  .hero-title {
    font-size: 3.2rem;
  }
}

@media (max-width: 992px) {
  .hero-section {
    padding: 60px 0 40px;
    text-align: center;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-description {
    margin: 0 auto 2rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .slideshow-container {
    height: 350px;
  }
  
  .section-header-with-filter {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-tabs {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-section {
    padding: 40px 0 30px;
    min-height: auto;
  }
  
  .slideshow-container {
    height: 280px;
  }
  
  .slide-overlay {
    padding: 1.5rem;
  }
  
  .slide-title {
    font-size: 1.4rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .discount-card {
    padding: 2.5rem 2rem;
    min-height: 200px;
  }
  
  .discount-content h2 {
    font-size: 2rem;
  }
  
  .promo-card {
    min-height: 180px;
    padding: 2rem 1.5rem;
  }
  
  .promo-card h2 {
    font-size: 1.6rem;
  }
  
  .newsletter-content h2 {
    font-size: 2rem;
  }
  
  .newsletter-form {
    flex-direction: column;
    background: transparent;
    padding: 0;
    border: none;
    border-radius: 0;
  }
  
  .newsletter-input {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50px;
    padding: 0.9rem 1.5rem;
  }
  
  .newsletter-btn {
    justify-content: center;
  }
  
  .filter-tab {
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
  }
  
  .slide-btn {
    width: 35px;
    height: 35px;
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-badge {
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
  }
  
  .hero-stats {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .stat-divider {
    display: none;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary-hero,
  .btn-secondary-hero {
    width: 100%;
    justify-content: center;
  }
  
  .slideshow-container {
    height: 220px;
    border-radius: 16px;
  }
  
  .slide-overlay {
    padding: 1rem;
  }
  
  .slide-title {
    font-size: 1.1rem;
  }
  
  .slide-desc {
    font-size: 0.8rem;
  }
  
  .slide-tag {
    font-size: 0.6rem;
  }
  
  .slide-btn {
    width: 28px;
    height: 28px;
    font-size: 0.7rem;
  }
  
  .slide-btn-prev {
    left: 0.5rem;
  }
  
  .slide-btn-next {
    right: 0.5rem;
  }
  
  .indicator-dot {
    width: 8px;
    height: 8px;
  }
  
  .indicator-dot.active {
    width: 20px;
  }
  
  .discount-badge {
    font-size: 1rem;
    padding: 0.3rem 1rem;
    top: 16px;
    right: 16px;
  }
  
  .discount-content h2 {
    font-size: 1.6rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
  
  .section-subtitle {
    font-size: 0.9rem;
  }
  
  .view-all-btn {
    padding: 0.8rem 2rem;
    font-size: 0.9rem;
  }
  
  .promo-card h2 {
    font-size: 1.4rem;
  }
  
  .promo-card p {
    font-size: 0.85rem;
  }
  
  .newsletter-content h2 {
    font-size: 1.6rem;
  }
  
  .filter-tabs {
    gap: 0.3rem;
    padding: 0.3rem;
  }
  
  :deep(.product-card .product-name) {
    font-size: 0.85rem;
  }
  
  :deep(.product-card .current-price) {
    font-size: 1rem;
  }
  
  :deep(.product-card .btn-add-cart) {
    font-size: 0.75rem;
    padding: 8px;
  }
}
</style>