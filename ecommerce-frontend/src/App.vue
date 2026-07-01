<template>
  <div id="app">
    <!-- Enhanced Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <div class="brand-icon">
            <i class="fas fa-spa"></i>
          </div>
          <span class="brand-text">Chhouk<span class="brand-highlight">Shop</span></span>
        </router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navMenu">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="active">
                <i class="fas fa-home"></i> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link" active-class="active">
                <i class="fas fa-box"></i> Products
              </router-link>
            </li>
            <li class="nav-item" v-if="authStore.isAuthenticated">
              <router-link to="/orders" class="nav-link" active-class="active">
                <i class="fas fa-shopping-bag"></i> My Orders
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="active">
                <i class="fas fa-info-circle"></i> About
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link" active-class="active">
                <i class="fas fa-envelope"></i> Contact
              </router-link>
            </li>
            <li class="nav-item" v-if="authStore.isAdmin">
              <router-link to="/admin" class="nav-link" active-class="active">
                <i class="fas fa-cog"></i> Admin
              </router-link>
            </li>
          </ul>
          
          <div class="d-flex align-items-center gap-2">
            <!-- Wishlist -->
            <router-link 
              v-if="authStore.isAuthenticated" 
              to="/wishlist" 
              class="icon-btn"
              title="Wishlist"
            >
              <i class="fas fa-heart"></i>
              <span v-if="wishlistCount > 0" class="icon-badge">
                {{ wishlistCount }}
              </span>
            </router-link>
            
            <!-- Cart -->
            <router-link 
              to="/cart" 
              class="icon-btn"
              title="Shopping Cart"
            >
              <i class="fas fa-shopping-bag"></i>
              <span v-if="cartStore.totalItems > 0" class="icon-badge">
                {{ cartStore.totalItems }}
              </span>
            </router-link>
            
            <!-- Auth Buttons -->
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="btn btn-outline-primary btn-sm">
                <i class="fas fa-sign-in-alt"></i> Login
              </router-link>
              <router-link to="/register" class="btn btn-primary btn-sm">
                <i class="fas fa-user-plus"></i> Register
              </router-link>
            </template>
            
            <!-- User Dropdown -->
            <div v-if="authStore.isAuthenticated" class="dropdown" ref="dropdownContainer">
              <button class="user-btn" type="button" @click="toggleDropdown">
                <div class="user-avatar">
                  <span>{{ userInitials }}</span>
                </div>
                <span class="user-name">{{ user?.name || authStore.userName || 'User' }}</span>
                <i class="fas fa-chevron-down dropdown-arrow" :class="{ 'rotated': isDropdownOpen }"></i>
              </button>
              
              <ul class="dropdown-menu" :class="{ 'show': isDropdownOpen }" ref="dropdownMenu">
                <li class="dropdown-header">
                  <div class="user-info">
                    <div class="user-avatar-large">
                      <span>{{ userInitials }}</span>


                      
                    </div>
                    <div class="user-details">
                      <div class="user-name-large">{{ user?.name || authStore.userName || 'Guest User' }}</div>
                      <div class="user-email">{{ user?.email || 'No email' }}</div>
                    </div>
                  </div>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><router-link to="/profile" class="dropdown-item" @click="closeDropdown"><i class="fas fa-id-card"></i> View Profile</router-link></li>
                <li><router-link to="/orders" class="dropdown-item" @click="closeDropdown"><i class="fas fa-shopping-bag"></i> My Orders</router-link></li>
                <li><router-link to="/wishlist" class="dropdown-item" @click="closeDropdown"><i class="fas fa-heart"></i> Wishlist</router-link></li>
                <li><router-link to="/checkout" class="dropdown-item" @click="closeDropdown"><i class="fas fa-credit-card"></i> Checkout</router-link></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item logout-item" @click="handleLogout"><i class="fas fa-sign-out-alt"></i> Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="py-4">
      <router-view />
    </main>

    <!-- Professional Footer -->
    <footer class="footer">
      <div class="bg-elements">
        <span class="bg-element">🌸</span>
        <span class="bg-element">💄</span>
        <span class="bg-element">✨</span>
        <span class="bg-element">🌺</span>
        <span class="bg-element">💫</span>
        <span class="bg-element">🦋</span>
        <span class="bg-element">🌹</span>
        <span class="bg-element">💖</span>
        <span class="bg-element">🌟</span>
        <span class="bg-element">🌷</span>
        <span class="bg-element">🌻</span>
        <span class="bg-element">💎</span>
        <span class="bg-element">🌈</span>
        <span class="bg-element">🪷</span>
        <span class="bg-element">🌿</span>
        <span class="bg-element">🌸</span>
        <span class="bg-element">💄</span>
        <span class="bg-element">✨</span>
        <span class="bg-element">🌺</span>
        <span class="bg-element">💫</span>
      </div>
      
      <div class="container">
        <div class="footer-content">
          <!-- Brand Section -->
          <div class="footer-section brand-section">
            <h3 class="footer-brand">
              <i class="fas fa-spa"></i> Chhouk<span class="brand-highlight">Shop</span>
            </h3>
            <p class="footer-description">
              Your trusted beauty destination for quality products. We bring you the best shopping experience with premium service and exceptional value.
            </p>
            <div class="footer-contact">
              <p><i class="fas fa-map-marker-alt"></i> 123 Shop Street, City, Country</p>
              <p><i class="fas fa-phone"></i> +1 (555) 123-4567</p>
              <p><i class="fas fa-envelope"></i> support@chhoukshop.com</p>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div class="footer-section">
            <h4>Quick Links</h4>
            <ul class="footer-links">
              <li><router-link to="/"><i class="fas fa-chevron-right"></i> Home</router-link></li>
              <li><router-link to="/products"><i class="fas fa-chevron-right"></i> Products</router-link></li>
              <li><router-link to="/about"><i class="fas fa-chevron-right"></i> About Us</router-link></li>
              <li><router-link to="/contact"><i class="fas fa-chevron-right"></i> Contact</router-link></li>
            </ul>
          </div>
          
          <!-- Account -->
          <div class="footer-section">
            <h4>My Account</h4>
            <ul class="footer-links">
              <li v-if="!authStore.isAuthenticated"><router-link to="/login"><i class="fas fa-chevron-right"></i> Login</router-link></li>
              <li v-if="!authStore.isAuthenticated"><router-link to="/register"><i class="fas fa-chevron-right"></i> Register</router-link></li>
              <li v-if="authStore.isAuthenticated"><router-link to="/profile"><i class="fas fa-chevron-right"></i> My Profile</router-link></li>
              <li v-if="authStore.isAuthenticated"><router-link to="/orders"><i class="fas fa-chevron-right"></i> My Orders</router-link></li>
              <li v-if="authStore.isAuthenticated"><router-link to="/wishlist"><i class="fas fa-chevron-right"></i> Wishlist</router-link></li>
            </ul>
          </div>
          
          <!-- Beauty Tips -->
          <div class="footer-section">
            <h4>Beauty Tips</h4>
            <ul class="footer-links">
              <li><a href="#"><i class="fas fa-chevron-right"></i> Skincare Guide</a></li>
              <li><a href="#"><i class="fas fa-chevron-right"></i> Makeup Tutorials</a></li>
              <li><a href="#"><i class="fas fa-chevron-right"></i> Hair Care Tips</a></li>
              <li><a href="#"><i class="fas fa-chevron-right"></i> Beauty Blog</a></li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom -->
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="#" class="social-link facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-link instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" class="social-link pinterest"><i class="fab fa-pinterest"></i></a>
            <a href="#" class="social-link youtube"><i class="fab fa-youtube"></i></a>
            <a href="#" class="social-link tiktok"><i class="fab fa-tiktok"></i></a>
          </div>
          <p class="footer-copyright">
            <i class="far fa-copyright"></i> 2026 ChhoukShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

const dropdownContainer = ref<HTMLElement | null>(null)
const isDropdownOpen = ref(false)

const user = computed(() => authStore.userData)
const wishlistCount = computed(() => wishlistStore.items?.length || 0)

const userInitials = computed(() => {
  const name = user.value?.name || authStore.userName || 'User'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const toggleDropdown = (event: MouseEvent) => {
  event.stopPropagation()
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

const handleLogout = async () => {
  closeDropdown()
  await authStore.logout()
  toast.success('Logged out successfully')
  router.push('/login')
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

watch(
  () => authStore.isAuthenticated,
  async (isAuthenticated) => {
    if (isAuthenticated) {
      await authStore.fetchCurrentUser()
      await Promise.all([
        cartStore.fetchCart(),
        wishlistStore.fetchWishlist()
      ])
    }
  },
  { immediate: true }
)
</script>

<style scoped>
/* ============================================
   FLOATING DECORATIVE ELEMENTS
   ============================================ */
/* ============================================
   FLOATING BACKGROUND DECORATIVE ELEMENTS (20 Elements)
   ============================================ */
.bg-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.bg-element {
  position: absolute;
  font-size: 3rem;
  animation: floatBg 15s ease-in-out infinite;
  opacity: 0.06;
}

/* 20 Unique Positioned Elements */
.bg-element:nth-child(1) { 
  top: 3%; 
  left: 5%; 
  animation-delay: 0s; 
}

.bg-element:nth-child(2) { 
  top: 8%; 
  right: 8%; 
  animation-delay: 1.5s; 
  font-size: 3.5rem; 
}

.bg-element:nth-child(3) { 
  top: 15%; 
  left: 15%; 
  animation-delay: 3s; 
  font-size: 2.5rem; 
}

.bg-element:nth-child(4) { 
  top: 20%; 
  right: 20%; 
  animation-delay: 4.5s; 
  font-size: 4rem; 
}

.bg-element:nth-child(5) { 
  top: 30%; 
  left: 3%; 
  animation-delay: 6s; 
  font-size: 2.8rem; 
}

.bg-element:nth-child(6) { 
  top: 35%; 
  right: 3%; 
  animation-delay: 7.5s; 
  font-size: 3.2rem; 
}

.bg-element:nth-child(7) { 
  top: 45%; 
  left: 12%; 
  animation-delay: 9s; 
  font-size: 2.2rem; 
}

.bg-element:nth-child(8) { 
  top: 50%; 
  right: 12%; 
  animation-delay: 10.5s; 
  font-size: 3.8rem; 
}

.bg-element:nth-child(9) { 
  top: 58%; 
  left: 4%; 
  animation-delay: 12s; 
  font-size: 2.6rem; 
}

.bg-element:nth-child(10) { 
  top: 62%; 
  right: 4%; 
  animation-delay: 13.5s; 
  font-size: 3rem; 
}

.bg-element:nth-child(11) { 
  top: 70%; 
  left: 18%; 
  animation-delay: 1s; 
  font-size: 2.4rem; 
}

.bg-element:nth-child(12) { 
  top: 75%; 
  right: 18%; 
  animation-delay: 2.5s; 
  font-size: 3.6rem; 
}

.bg-element:nth-child(13) { 
  top: 82%; 
  left: 6%; 
  animation-delay: 4s; 
  font-size: 2.9rem; 
}

.bg-element:nth-child(14) { 
  top: 88%; 
  right: 6%; 
  animation-delay: 5.5s; 
  font-size: 3.3rem; 
}

.bg-element:nth-child(15) { 
  top: 93%; 
  left: 14%; 
  animation-delay: 7s; 
  font-size: 2.7rem; 
}

.bg-element:nth-child(16) { 
  top: 5%; 
  left: 50%; 
  animation-delay: 8.5s; 
  font-size: 2.1rem; 
}

.bg-element:nth-child(17) { 
  top: 25%; 
  right: 50%; 
  animation-delay: 10s; 
  font-size: 3.4rem; 
}

.bg-element:nth-child(18) { 
  top: 48%; 
  left: 50%; 
  animation-delay: 11.5s; 
  font-size: 2.3rem; 
}

.bg-element:nth-child(19) { 
  top: 68%; 
  right: 50%; 
  animation-delay: 13s; 
  font-size: 3.1rem; 
}

.bg-element:nth-child(20) { 
  top: 90%; 
  left: 50%; 
  animation-delay: 14.5s; 
  font-size: 2.5rem; 
}

/* Animation */
@keyframes floatBg {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1); 
  }
  25% { 
    transform: translateY(-40px) rotate(5deg) scale(1.1); 
  }
  75% { 
    transform: translateY(40px) rotate(-5deg) scale(0.9); 
  }
}
/* Different animation speeds for each element */
.bg-element:nth-child(1) { animation-duration: 18s; }
.bg-element:nth-child(2) { animation-duration: 14s; }
.bg-element:nth-child(3) { animation-duration: 20s; }
.bg-element:nth-child(4) { animation-duration: 16s; }
.bg-element:nth-child(5) { animation-duration: 22s; }
.bg-element:nth-child(6) { animation-duration: 13s; }
.bg-element:nth-child(7) { animation-duration: 19s; }
.bg-element:nth-child(8) { animation-duration: 17s; }
.bg-element:nth-child(9) { animation-duration: 21s; }
.bg-element:nth-child(10) { animation-duration: 15s; }
.bg-element:nth-child(11) { animation-duration: 23s; }
.bg-element:nth-child(12) { animation-duration: 12s; }
.bg-element:nth-child(13) { animation-duration: 20s; }
.bg-element:nth-child(14) { animation-duration: 18s; }
.bg-element:nth-child(15) { animation-duration: 16s; }
.bg-element:nth-child(16) { animation-duration: 14s; }
.bg-element:nth-child(17) { animation-duration: 22s; }
.bg-element:nth-child(18) { animation-duration: 19s; }
.bg-element:nth-child(19) { animation-duration: 15s; }
.bg-element:nth-child(20) { animation-duration: 17s; }



/* ============================================
   NAVBAR - PROFESSIONAL STYLE
   ============================================ */
.navbar {
  padding: 0.6rem 0;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.04) !important;
  transition: all 0.3s ease;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  padding: 0;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.3);
}

.navbar-brand:hover .brand-icon {
  transform: rotate(-10deg) scale(1.1);
  box-shadow: 0 6px 25px rgba(253, 121, 168, 0.4);
}

.brand-text {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.5px;
}

.brand-highlight {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link {
  font-weight: 500;
  padding: 0.6rem 1.2rem !important;
  color: #4a4a5a !important;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.nav-link i {
  margin-right: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: #fd79a8 !important;
  background: rgba(253, 121, 168, 0.06);
  transform: translateY(-1px);
}

.nav-link:hover i {
  transform: scale(1.1);
}

.nav-link.active {
  color: #fd79a8 !important;
  background: rgba(253, 121, 168, 0.08);
  font-weight: 600;
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #4a4a5a;
  text-decoration: none;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.icon-btn:hover {
  background: rgba(253, 121, 168, 0.08);
  color: #fd79a8;
  transform: translateY(-2px);
}

.icon-btn i {
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.icon-btn:hover i {
  transform: scale(1.1);
}

.icon-btn .fas.fa-heart {
  color: #fd79a8;
}

.icon-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 50px;
  font-size: 0.6rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  box-shadow: 0 2px 8px rgba(253, 121, 168, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.btn-sm {
  padding: 0.4rem 1.2rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-sm:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.btn-outline-primary {
  border: 2px solid #fd79a8;
  color: #fd79a8;
}

.btn-outline-primary:hover {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 20px rgba(253, 121, 168, 0.3);
}

.btn-primary {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border: none;
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(253, 121, 168, 0.4);
}

/* User Dropdown */
.user-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0.4rem 1rem 0.4rem 0.4rem;
  border: 2px solid #f0e6f6;
  border-radius: 50px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.user-btn:hover {
  border-color: #fd79a8;
  box-shadow: 0 4px 15px rgba(253, 121, 168, 0.1);
  transform: translateY(-1px);
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.8rem;
}

.user-name {
  font-weight: 500;
  color: #1a1a2e;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: 0.7rem;
  color: #9aa5b5;
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  display: block !important;
  min-width: 260px;
  padding: 0.5rem;
  border: none;
  border-radius: 16px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12) !important;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  top: 100%;
  right: 0;
  left: auto;
  margin-top: 8px;
  background: white;
  z-index: 1000;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(253, 121, 168, 0.05), rgba(225, 112, 85, 0.05));
  margin-bottom: 0.3rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar-large {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  flex-shrink: 0;
}

.user-name-large {
  font-weight: 600;
  color: #1a1a2e;
  font-size: 0.95rem;
}

.user-email {
  font-size: 0.8rem;
  color: #9aa5b5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-item {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  color: #4a4a5a;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dropdown-item i {
  width: 20px;
  font-size: 0.9rem;
  color: #9aa5b5;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background: rgba(253, 121, 168, 0.06);
  color: #fd79a8;
  transform: translateX(4px);
}

.dropdown-item:hover i {
  color: #fd79a8;
  transform: scale(1.1);
}

.logout-item {
  color: #e53e3e;
}

.logout-item:hover {
  background: rgba(229, 62, 62, 0.06);
  color: #e53e3e;
}

.logout-item:hover i {
  color: #e53e3e;
}

/* ============================================
   FOOTER - PROFESSIONAL BEAUTY STYLE
   ============================================ */
.footer {
  position: relative;
  background: linear-gradient(160deg, #0f0c1a 0%, #1a0f24 30%, #2d1b3d 60%, #1a0f24 100%);
  color: #e2e8f0;
  padding: 60px 0 0;
  margin-top: 60px;
  overflow: hidden;
  border-top: 3px solid transparent;
  border-image: linear-gradient(90deg, #fd79a8, #e17055, #fd79a8) 1;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.footer-brand i {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-right: 8px;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 20px;
  max-width: 350px;
}

.footer-contact p {
  color: #94a3b8;
  margin-bottom: 8px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: color 0.3s ease;
}

.footer-contact p:hover {
  color: #fd79a8;
}

.footer-contact i {
  width: 20px;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 0.95rem;
}

.footer-section h4 {
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  margin-bottom: 18px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
  padding-bottom: 10px;
}

.footer-section h4::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #fd79a8, #e17055);
  border-radius: 2px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-links a i {
  font-size: 0.6rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  opacity: 0;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #fd79a8;
  padding-left: 6px;
}

.footer-links a:hover i {
  opacity: 1;
  transform: translateX(4px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 24px 0;
}

.footer-social {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
}

.social-link:hover {
  transform: translateY(-4px);
  color: white;
}

.social-link.facebook:hover {
  background: #1877f2;
  border-color: #1877f2;
  box-shadow: 0 4px 20px rgba(24, 119, 242, 0.3);
}

.social-link.instagram:hover {
  background: #e4405f;
  border-color: #e4405f;
  box-shadow: 0 4px 20px rgba(228, 64, 95, 0.3);
}

.social-link.pinterest:hover {
  background: #bd081c;
  border-color: #bd081c;
  box-shadow: 0 4px 20px rgba(189, 8, 28, 0.3);
}

.social-link.youtube:hover {
  background: #ff0000;
  border-color: #ff0000;
  box-shadow: 0 4px 20px rgba(255, 0, 0, 0.3);
}

.social-link.tiktok:hover {
  background: #000000;
  border-color: #000000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.footer-copyright {
  color: #64748b;
  font-size: 0.85rem;
  margin: 0;
  letter-spacing: 0.3px;
}

.footer-copyright i {
  margin-right: 4px;
  color: #fd79a8;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
  
  .footer-description {
    max-width: 100%;
  }
  
  .nav-link {
    padding: 0.4rem 1rem !important;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.4rem 0;
  }
  
  .brand-text {
    font-size: 1.2rem;
  }
  
  .brand-icon {
    width: 34px;
    height: 34px;
    font-size: 1rem;
  }
  
  .user-name {
    display: none;
  }
  
  .user-btn {
    padding: 0.3rem;
  }
  
  .dropdown-menu {
    min-width: 220px;
    right: -10px;
  }
  
  .footer {
    padding: 40px 0 0;
    margin-top: 40px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 28px;
    text-align: center;
  }
  
  .footer-contact p {
    justify-content: center;
  }
  
  .footer-links a {
    justify-content: center;
  }
  
  .footer-section h4::after {
    left: 50%;
    transform: translateX(-50%);
  }
  
  .footer-description {
    max-width: 100%;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 14px;
  }
  
  .footer-social {
    justify-content: center;
  }
  
  .icon-btn {
    width: 36px;
    height: 36px;
  }
  
  .btn-sm {
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 30px 0 0;
    margin-top: 30px;
  }
  
  .footer-content {
    gap: 24px;
    padding-bottom: 30px;
  }
  
  .footer-brand {
    font-size: 1.3rem;
  }
  
  .footer-description {
    font-size: 0.9rem;
  }
  
  .footer-contact p {
    font-size: 0.85rem;
  }
  
  .footer-section h4 {
    font-size: 0.8rem;
  }
  
  .footer-links a {
    font-size: 0.85rem;
  }
  
  .social-link {
    width: 34px;
    height: 34px;
    font-size: 0.85rem;
  }
  
  .footer-copyright {
    font-size: 0.75rem;
  }
}

/* ============================================
   SCROLLBAR
   ============================================ */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #e17055, #d63031);
}
</style>

<style>
/* ============================================
   GLOBAL STYLES
   ============================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fdf8fa;
  color: #1a1a2e;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.container {
  max-width: 1200px;
  padding: 0 1.5rem;
}

::selection {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
}

a {
  text-decoration: none;
  color: inherit;
}

/* Toast Customization */
.Vue-Toastification__toast {
  border-radius: 12px !important;
  font-weight: 500 !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12) !important;
}

.Vue-Toastification__toast--success {
  background: linear-gradient(135deg, #48bb78, #38a169) !important;
}

.Vue-Toastification__toast--error {
  background: linear-gradient(135deg, #fc8181, #e53e3e) !important;
}

.Vue-Toastification__toast--info {
  background: linear-gradient(135deg, #63b3ed, #3182ce) !important;
}

/* Card Styles */
.card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  background: white;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

/* Button Styles */
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

/* Form Controls */
.form-control {
  border-radius: 8px;
  border: 2px solid #f0e6f6;
  padding: 0.6rem 1rem;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #fd79a8;
  box-shadow: 0 0 0 4px rgba(253, 121, 168, 0.1);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>