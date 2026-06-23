<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm mt-5">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">
              <i class="fas fa-sign-in-alt text-primary"></i> Login
            </h3>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                  <input type="email" class="form-control" v-model="form.email" 
                         placeholder="Enter your email" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock"></i></span>
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" 
                         v-model="form.password" placeholder="Enter your password" required>
                  <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="mb-3 d-flex justify-content-between">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="remember" v-model="form.remember">
                  <label class="form-check-label" for="remember">Remember me</label>
                </div>
                <a href="#" class="text-primary text-decoration-none">Forgot Password?</a>
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-sign-in-alt me-2"></i>
                Login
              </button>
            </form>

            <div class="mt-3 text-center">
              <p class="text-muted">
                Don't have an account? 
                <router-link to="/register" class="text-primary fw-bold">Register</router-link>
              </p>
            </div>

            <hr>

            <div class="text-center">
              <p class="text-muted small">Or login with</p>
              <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-outline-danger">
                  <i class="fab fa-google"></i> Google
                </button>
                <button class="btn btn-outline-primary">
                  <i class="fab fa-facebook-f"></i> Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  loading.value = true
  const result = await authStore.login(form.email, form.password)
  loading.value = false

  if (result.success) {
    toast.success('Welcome back! 🎉')
    router.push('/')
  } else {
    toast.error(result.message || 'Invalid credentials')
  }
}
</script>