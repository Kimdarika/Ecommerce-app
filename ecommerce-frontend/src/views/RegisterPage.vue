<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm mt-5">
          <div class="card-body p-4">
            <h3 class="text-center mb-4">
              <i class="fas fa-user-plus text-primary"></i> Register
            </h3>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-user"></i></span>
                  <input type="text" class="form-control" v-model="form.name" 
                         placeholder="Enter your name" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                  <input type="email" class="form-control" v-model="form.email" 
                         placeholder="Enter your email" required>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Phone Number (Optional)</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-phone"></i></span>
                  <input type="tel" class="form-control" v-model="form.phone" 
                         placeholder="Enter your phone">
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-lock"></i></span>
                  <input :type="showPassword ? 'text' : 'password'" class="form-control" 
                         v-model="form.password" placeholder="Enter password (min 8 chars)" required>
                  <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <small class="text-muted">Password must be at least 8 characters</small>
              </div>

              <div class="mb-3">
                <label class="form-label">Confirm Password</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="fas fa-check"></i></span>
                  <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control" 
                         v-model="form.password_confirmation" placeholder="Confirm your password" required>
                  <button class="btn btn-outline-secondary" type="button" @click="showConfirmPassword = !showConfirmPassword">
                    <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="terms" v-model="form.terms" required>
                <label class="form-check-label" for="terms">
                  I agree to the <a href="#" class="text-primary">Terms & Conditions</a>
                </label>
              </div>

              <button type="submit" class="btn btn-primary w-100" :disabled="loading || !form.terms">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="fas fa-user-plus me-2"></i>
                Create Account
              </button>
            </form>

            <div class="mt-3 text-center">
              <p class="text-muted">
                Already have an account? 
                <router-link to="/login" class="text-primary fw-bold">Login</router-link>
              </p>
            </div>

            <hr>

            <div class="text-center">
              <p class="text-muted small">Or register with</p>
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
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  terms: false,
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = async () => {
  if (form.password !== form.password_confirmation) {
    toast.error('Passwords do not match')
    return
  }
  if (form.password.length < 8) {
    toast.error('Password must be at least 8 characters')
    return
  }

  loading.value = true
  const result = await authStore.register({
    name: form.name,
    email: form.email,
    phone: form.phone,
    password: form.password,
    password_confirmation: form.password_confirmation,
  })
  loading.value = false

  if (result.success) {
    toast.success('Registration successful! Welcome! 🎉')
    router.push('/')
  } else {
    toast.error(result.message || 'Registration failed')
  }
}
</script>