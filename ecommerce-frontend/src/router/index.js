import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import WishlistPage from '../views/WishlistPage.vue'
import CartPage from '../views/CartPage.vue'
import CheckoutPage from '../views/CheckoutPage.vue'
import OrdersPage from '../views/OrdersPage.vue'
import ProfilePage from '../views/ProfilePage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'

const routes = [
  // Public Routes
  { 
    path: '/', 
    name: 'home',
    component: HomePage 
  },
  { 
    path: '/products', 
    name: 'products',
    component: ProductsPage 
  },
  { 
    path: '/product/:slug', 
    name: 'product-detail',
    component: ProductDetail 
  },
  { 
    path: '/about', 
    name: 'about',
    component: AboutPage 
  },
  { 
    path: '/contact', 
    name: 'contact',
    component: ContactPage 
  },
  
  // Guest Routes (Only when NOT logged in)
  { 
    path: '/login', 
    name: 'login',
    component: LoginPage,
    meta: { guest: true } 
  },
  { 
    path: '/register', 
    name: 'register',
    component: RegisterPage,
    meta: { guest: true } 
  },
  
  // Protected Routes (Requires Login)
  { 
    path: '/wishlist', 
    name: 'wishlist',
    component: WishlistPage,
    meta: { requiresAuth: true } 
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/card',
    redirect: '/cart',
  },
  { 
    path: '/checkout', 
    name: 'checkout',
    component: CheckoutPage,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/orders', 
    name: 'orders',
    component: OrdersPage,
    meta: { requiresAuth: true } 
  },
  { 
    path: '/profile', 
    name: 'profile',
    component: ProfilePage,
    meta: { requiresAuth: true } 
  },
  
  // Fallback
  { 
    path: '/:pathMatch(.*)*', 
    redirect: '/' 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard - FIXED
router.beforeEach((to, from, next) => {
  // Check if user is logged in by checking localStorage
  const token = localStorage.getItem('token')
  const isAuthenticated = !!token
  
  console.log('Router Guard:', { 
    to: to.path, 
    isAuthenticated, 
    requiresAuth: to.meta.requiresAuth,
    guest: to.meta.guest
  })

  // If route requires authentication and user is not logged in
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login (auth required)')
    next('/login')
  } 
  // If route is for guests only and user is logged in
  else if (to.meta.guest && isAuthenticated) {
    console.log('Redirecting to home (guest route)')
    next('/')
  } 
  // Otherwise, allow access
  else {
    next()
  }
})

export default router
