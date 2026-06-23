<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div class="container">
        <router-link to="/" class="navbar-brand fw-bold">
          <i class="fas fa-store text-primary"></i> Shop
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
          </ul>
          
          <div class="d-flex align-items-center gap-3">
            <!-- Wishlist -->
            <router-link 
              v-if="authStore.isAuthenticated" 
              to="/wishlist" 
              class="btn btn-outline-danger btn-sm position-relative"
              title="Wishlist"
            >
              <i class="fas fa-heart"></i>
              <span 
                v-if="wishlistCount > 0" 
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{ wishlistCount }}
              </span>
            </router-link>
            
            <!-- Cart -->
            <router-link 
              to="/cart" 
              class="btn btn-outline-primary btn-sm position-relative"
              title="Shopping Cart"
            >
              <i class="fas fa-shopping-cart"></i>
              <span 
                v-if="cartStore.totalItems > 0" 
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
              >
                {{ cartStore.totalItems }}
              </span>
            </router-link>
            
            <!-- Guest Links -->
            <template v-if="!authStore.isAuthenticated">
              <router-link to="/login" class="btn btn-outline-primary btn-sm">
                <i class="fas fa-sign-in-alt"></i> Login
              </router-link>
              <router-link to="/register" class="btn btn-primary btn-sm">
                <i class="fas fa-user-plus"></i> Register
              </router-link>
            </template>
            
            <!-- User Dropdown -->
            <div v-else class="dropdown">
              <button 
                class="btn btn-light btn-sm dropdown-toggle d-flex align-items-center gap-2" 
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-user-circle fa-lg text-primary"></i>
                <span>{{ authStore.userName }}</span>
              </button>
              
              <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                <li>
                  <router-link to="/profile" class="dropdown-item">
                    <i class="fas fa-user me-2"></i> My Profile
                  </router-link>
                </li>
                <li>
                  <router-link to="/orders" class="dropdown-item">
                    <i class="fas fa-shopping-bag me-2"></i> My Orders
                  </router-link>
                </li>
                <li>
                  <router-link to="/wishlist" class="dropdown-item">
                    <i class="fas fa-heart me-2 text-danger"></i> Wishlist
                  </router-link>
                </li>
                <li>
                  <router-link to="/cart" class="dropdown-item">
                    <i class="fas fa-shopping-cart me-2 text-primary"></i> Cart
                  </router-link>
                </li>
                <li>
                  <router-link to="/checkout" class="dropdown-item">
                    <i class="fas fa-credit-card me-2 text-success"></i> Checkout
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item text-danger" @click="handleLogout">
                    <i class="fas fa-sign-out-alt me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="py-4">
      <router-view />
    </main>

    <!-- New Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <!-- Shop Info Section -->
          <div class="footer-section">
            <h3><i class="fas fa-store text-primary"></i> Shop</h3>
            <p class="footer-address">
              123 Shop Street<br>
              City, Country
            </p>
            <p class="footer-contact">
              <i class="fas fa-phone"></i> +1 (555) 123-4567<br>
              <i class="fas fa-envelope"></i> support@shop.com
            </p>
          </div>

          <!-- Quick Links -->
          <div class="footer-section">
            <h3>Quick Links</h3>
            <ul class="footer-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/products">Products</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>

          <!-- Account Links -->
          <div class="footer-section">
            <h3>Account</h3>
            <ul class="footer-links">
              <li v-if="!authStore.isAuthenticated">
                <router-link to="/login">Login</router-link>
              </li>
              <li v-if="!authStore.isAuthenticated">
                <router-link to="/register">Register</router-link>
              </li>
              <li v-if="authStore.isAuthenticated">
                <router-link to="/profile">My Profile</router-link>
              </li>
              <li v-if="authStore.isAuthenticated">
                <router-link to="/orders">My Orders</router-link>
              </li>
              <li v-if="authStore.isAuthenticated">
                <router-link to="/wishlist">Wishlist</router-link>
              </li>
              <li v-if="authStore.isAuthenticated">
                <router-link to="/cart">Cart</router-link>
              </li>
            </ul>
          </div>

          <!-- Legal Links -->
          <div class="footer-section">
            <h3>Legal</h3>
            <ul class="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">EULA</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="footer-social">
            <a href="#" class="text-muted"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-muted"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-muted"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-muted"><i class="fab fa-youtube"></i></a>
            <a href="#" class="text-muted"><i class="fab fa-pinterest"></i></a>
          </div>
          <p class="footer-copyright">© 2026 Shop. All rights reserved.</p>
          <p class="footer-legal">
            <a href="#">Privacy Policy</a> | 
            <a href="#">Terms & Conditions</a> | 
            <a href="#">EULA</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
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

const wishlistCount = computed(() => wishlistStore.items?.length || 0)

const handleLogout = async () => {
  await authStore.logout()
  toast.success('Logged out successfully')
  router.push('/login')
}

watch(
  () => authStore.isAuthenticated,
  async (isAuthenticated) => {
    if (!isAuthenticated) {
      return
    }

    await authStore.fetchCurrentUser()
    await Promise.all([
      cartStore.fetchCart(),
      wishlistStore.fetchWishlist()
    ])
  },
  { immediate: true }
)
</script>

<style scoped>
/* ===== NAVBAR STYLES ===== */
.navbar {
  padding: 0.8rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08) !important;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-link {
  font-weight: 500;
  padding: 0.5rem 1rem !important;
  color: #4a4a4a !important;
  transition: all 0.3s;
  border-radius: 8px;
}

.nav-link:hover {
  color: #0d6efd !important;
  background: rgba(13, 110, 253, 0.05);
}

.nav-link.active {
  color: #0d6efd !important;
  font-weight: 600;
  background: rgba(13, 110, 253, 0.08);
}

.nav-link i {
  margin-right: 6px;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.875rem;
  border-radius: 8px;
}

.badge {
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  border-radius: 50px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-menu {
  border: none;
  border-radius: 12px;
  min-width: 200px;
  padding: 0.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12) !important;
}

.dropdown-item {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

/* ===== FOOTER STYLES ===== */
.footer {
  background: #1a1a2e;
  color: #ffffff;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-address {
  color: #a0a0a0;
  line-height: 1.8;
  margin-bottom: 15px;
}

.footer-contact {
  color: #a0a0a0;
  line-height: 2;
}

.footer-contact i {
  width: 24px;
  color: #ff6b6b;
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
  color: #a0a0a0;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: #ff6b6b;
  padding-left: 5px;
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 30px;
  text-align: center;
}

.footer-social {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 15px;
}

.footer-social a {
  color: #a0a0a0;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  text-decoration: none;
}

.footer-social a:hover {
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.15);
  transform: translateY(-3px);
}

.footer-copyright {
  color: #6c6c7a;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.footer-legal {
  color: #6c6c7a;
  font-size: 0.8rem;
}

.footer-legal a {
  color: #6c6c7a;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-legal a:hover {
  color: #ff6b6b;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 40px 0 20px;
    margin-top: 40px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
    text-align: center;
  }
  
  .footer-section h3 {
    margin-bottom: 15px;
  }
  
  .footer-links a:hover {
    padding-left: 0;
  }
  
  .footer-social {
    gap: 15px;
  }
  
  .footer-social a {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>

<style>
/* ===== GLOBAL STYLES ===== */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
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
}

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Selection color */
::selection {
  background: #ff6b6b;
  color: white;
}
</style>
