<script setup lang="ts">
import { computed, onMounted } from 'vue'
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

// Computed
const wishlistCount = computed(() => wishlistStore.items?.length || 0)

// Add debug logging
const isLoggedIn = computed(() => {
  const token = localStorage.getItem('token')
  const isAuth = !!token || authStore.isAuthenticated
  console.log('Navbar - isLoggedIn:', isAuth, 'token:', token)
  return isAuth
})

// Methods
const handleLogout = async () => {
  await authStore.logout()
  toast.success('Logged out successfully')
  router.push('/login')
}

// Lifecycle
onMounted(async () => {
  console.log('Navbar mounted - token:', localStorage.getItem('token'))
  console.log('Navbar mounted - user:', localStorage.getItem('user'))
  
  if (authStore.isAuthenticated) {
    await Promise.all([
      cartStore.fetchCart(),
      wishlistStore.fetchWishlist()
    ])
  }
})
</script>