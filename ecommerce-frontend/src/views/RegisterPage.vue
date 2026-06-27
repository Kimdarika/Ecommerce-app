<template>
  <div class="register-page">
    <!-- Background Overlay -->
    <div class="bg-overlay"></div>
    
    <!-- Animated Background Elements -->
    <div class="bg-elements">
      <span class="bg-element">🌸</span>
      <span class="bg-element">💄</span>
      <span class="bg-element">✨</span>
      <span class="bg-element">🌺</span>
      <span class="bg-element">💫</span>
      <span class="bg-element">🦋</span>
      <span class="bg-element">🌹</span>
      <span class="bg-element">💖</span>
    </div>

    <div class="register-container">
      <!-- Left Side - Brand Section -->
      <div class="register-brand">
        <div class="brand-content">
          <!-- Floating Elements -->
          <div class="floating-elements">
            <span class="float-element">🌸</span>
            <span class="float-element">💄</span>
            <span class="float-element">✨</span>
            <span class="float-element">🌺</span>
            <span class="float-element">💫</span>
            <span class="float-element">🦋</span>
          </div>

          <!-- Logo -->
          <div class="brand-logo">
            <div class="logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="url(#logoGrad)"/>
                <path d="M12 20L18 14L24 20L18 26L12 20Z" fill="white"/>
                <path d="M18 14L24 20L30 14L24 8L18 14Z" fill="rgba(255,255,255,0.7)"/>
                <path d="M12 20L18 26L24 20L18 14L12 20Z" fill="rgba(255,255,255,0.4)"/>
                <defs>
                  <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stop-color="#f093fb"/>
                    <stop offset="50%" stop-color="#f5576c"/>
                    <stop offset="100%" stop-color="#ffecd2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span class="brand-name">Glow<span class="brand-highlight">Beauty</span></span>
          </div>

          <!-- Tagline -->
          <div class="brand-tagline">
            <span class="signup-badge">
              <i class="fas fa-sparkles"></i> Join Our Community
            </span>
            <h2>Create Account</h2>
            <p>Start your beauty journey</p>
          </div>

          <!-- Brand Stats -->
          <div class="brand-stats">
            <div class="stat-item">
              <span class="stat-number">50K+</span>
              <span class="stat-label">Happy Girls</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">4.9★</span>
              <span class="stat-label">Love Rating</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">Products</span>
            </div>
          </div>

          <!-- Testimonial -->
          <div class="brand-testimonial">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>"Absolutely love this shop! ✨"</p>
            <span>- Sarah, Verified Buyer</span>
          </div>
        </div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="register-form-wrapper">
        <div class="register-form">
          <!-- Decorative Top -->
          <div class="form-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">💖</span>
            <span class="deco-line"></span>
          </div>

          <!-- Language Selector -->
          <div class="language-selector">
            <button class="lang-btn">
              <i class="fas fa-globe"></i>
              EN
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>

          <!-- Form Header -->
          <div class="form-header">
            <div class="header-icon">
              <i class="fas fa-user-plus"></i>
            </div>
            <h2>Create Account</h2>
            <p>Join our beauty community</p>
          </div>

          <!-- Register Form -->
          <form @submit.prevent="handleRegister" class="register-form-fields">
            <!-- Full Name -->
            <div class="form-group" :class="{ 'has-error': errors.name }">
              <label>
                <i class="fas fa-user"></i>
                Full Name
              </label>
              <div class="input-wrapper">
                <input 
                  type="text" 
                  class="form-input" 
                  v-model="form.name" 
                  placeholder="Enter your name"
                  @focus="clearError('name')"
                  required
                >
                <div class="input-focus"></div>
              </div>
              <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <!-- Email -->
            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label>
                <i class="fas fa-envelope"></i>
                Email Address
              </label>
              <div class="input-wrapper">
                <input 
                  type="email" 
                  class="form-input" 
                  v-model="form.email" 
                  placeholder="your@email.com"
                  @focus="clearError('email')"
                  required
                >
                <div class="input-focus"></div>
              </div>
              <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
            </div>

            <!-- Phone -->
            <div class="form-group">
              <label>
                <i class="fas fa-phone"></i>
                Phone Number
              </label>
              <div class="input-wrapper">
                <input 
                  type="tel" 
                  class="form-input" 
                  v-model="form.phone" 
                  placeholder="Enter your phone number"
                >
                <div class="input-focus"></div>
              </div>
            </div>

            <!-- Password -->
            <div class="form-group" :class="{ 'has-error': errors.password }">
              <label>
                <i class="fas fa-lock"></i>
                Password
              </label>
              <div class="input-wrapper">
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  class="form-input" 
                  v-model="form.password" 
                  placeholder="Min 8 characters"
                  @focus="clearError('password')"
                  required
                >
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                <div class="input-focus"></div>
              </div>
              <small class="form-hint">Password must be at least 8 characters</small>
              <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
            </div>

            <!-- Confirm Password -->
            <div class="form-group" :class="{ 'has-error': errors.password_confirmation }">
              <label>
                <i class="fas fa-check"></i>
                Confirm Password
              </label>
              <div class="input-wrapper">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  class="form-input" 
                  v-model="form.password_confirmation" 
                  placeholder="Confirm your password"
                  @focus="clearError('password_confirmation')"
                  required
                >
                <button 
                  type="button" 
                  class="password-toggle"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                <div class="input-focus"></div>
              </div>
              <span class="error-message" v-if="errors.password_confirmation">{{ errors.password_confirmation }}</span>
            </div>

            <!-- Terms -->
            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" v-model="form.terms" required>
                <span class="checkmark"></span>
                I agree to the <a href="#" class="terms-link">Terms & Conditions</a>
              </label>
            </div>

            <!-- Register Button -->
            <button type="submit" class="register-btn" :disabled="loading || !form.terms">
              <span v-if="loading" class="spinner"></span>
              <template v-else>
                <i class="fas fa-user-plus"></i>
                <span>Create Account ✨</span>
              </template>
            </button>

            <!-- Divider -->
            <div class="divider">
              <span>Already have an account?</span>
            </div>

            <!-- Login Link -->
            <router-link to="/login" class="login-link">
              <i class="fas fa-sign-in-alt"></i>
              Login Here
            </router-link>
          </form>

          <!-- Brand Credit -->
          <div class="brand-credit">
            <span>Made with 💖 for beautiful souls</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
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
  terms: false 
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Real-time validation
watch(() => form.name, (val) => {
  if (val && val.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  } else {
    errors.name = ''
  }
})

watch(() => form.email, (val) => {
  if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
    errors.email = 'Please enter a valid email address'
  } else {
    errors.email = ''
  }
})

watch(() => form.password, (val) => {
  if (val && val.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  } else {
    errors.password = ''
  }
})

watch(() => form.password_confirmation, (val) => {
  if (val && val !== form.password) {
    errors.password_confirmation = 'Passwords do not match'
  } else {
    errors.password_confirmation = ''
  }
})

const clearError = (field: string) => {
  errors[field as keyof typeof errors] = ''
}

const validateForm = () => {
  let isValid = true
  
  if (!form.name || form.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
    isValid = false
  }
  
  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }
  
  if (!form.password || form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
    isValid = false
  }
  
  if (form.password !== form.password_confirmation) {
    errors.password_confirmation = 'Passwords do not match'
    isValid = false
  }
  
  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) {
    toast.error('Please fix the errors below 💕')
    return
  }
  
  loading.value = true
  try {
    const result = await authStore.register(form)
    if (result.success) {
      toast.success('Welcome to Glow Beauty! ✨')
      setTimeout(() => {
        router.push('/')
      }, 500)
    } else {
      toast.error(result.message || 'Registration failed')
    }
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Registration failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* ============================================
   FULL SCREEN REGISTER PAGE
   ============================================ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: 
    linear-gradient(135deg, rgba(255, 182, 193, 0.08) 0%, rgba(255, 105, 180, 0.05) 50%, rgba(255, 182, 193, 0.08) 100%),
    url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=80');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  z-index: 9999;
}

/* Background Overlay */
.bg-overlay {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(255, 182, 193, 0.06) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 50%, rgba(255, 105, 180, 0.04) 0%, transparent 60%);
  pointer-events: none;
}

/* Animated Background Elements */
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
  opacity: 0.08;
}

.bg-element:nth-child(1) { top: 5%; left: 5%; animation-delay: 0s; }
.bg-element:nth-child(2) { top: 15%; right: 10%; animation-delay: 2s; font-size: 3.5rem; }
.bg-element:nth-child(3) { bottom: 20%; left: 8%; animation-delay: 4s; }
.bg-element:nth-child(4) { bottom: 10%; right: 5%; animation-delay: 6s; font-size: 4rem; }
.bg-element:nth-child(5) { top: 45%; left: 2%; animation-delay: 1s; font-size: 2.5rem; }
.bg-element:nth-child(6) { top: 40%; right: 2%; animation-delay: 3s; font-size: 3.2rem; }
.bg-element:nth-child(7) { top: 70%; left: 3%; animation-delay: 5s; font-size: 2.8rem; }
.bg-element:nth-child(8) { top: 25%; right: 3%; animation-delay: 7s; }

@keyframes floatBg {
  0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-40px) rotate(5deg) scale(1.1); }
  75% { transform: translateY(40px) rotate(-5deg) scale(0.9); }
}

/* ============================================
   REGISTER CONTAINER - Full Screen
   ============================================ */
.register-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  position: relative;
  z-index: 1;
  border: none;
  border-radius: 0;
  box-shadow: none;
  animation: containerFadeIn 0.6s ease;
}

@keyframes containerFadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ============================================
   LEFT BRAND SECTION
   ============================================ */
.register-brand {
  background: linear-gradient(160deg, #0f172a 0%, #1a1a2e 40%, #2d1b3d 70%, #1a1a2e 100%);
  padding: 4rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 100vh;
}

.register-brand::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 182, 193, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 8s ease-in-out infinite;
}

.register-brand::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(240, 147, 251, 0.04) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulseGlow 10s ease-in-out infinite reverse;
}

@keyframes pulseGlow {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.float-element {
  position: absolute;
  font-size: 2rem;
  animation: floatBeauty 8s ease-in-out infinite;
  opacity: 0.2;
}

.float-element:nth-child(1) { top: 10%; left: 8%; animation-delay: 0s; font-size: 2.5rem; }
.float-element:nth-child(2) { top: 70%; left: 85%; animation-delay: 1.5s; font-size: 2rem; }
.float-element:nth-child(3) { top: 85%; left: 10%; animation-delay: 3s; font-size: 2.8rem; }
.float-element:nth-child(4) { top: 20%; left: 80%; animation-delay: 4.5s; font-size: 2.2rem; }
.float-element:nth-child(5) { top: 50%; left: 5%; animation-delay: 6s; font-size: 1.8rem; }
.float-element:nth-child(6) { top: 40%; left: 92%; animation-delay: 2s; font-size: 2rem; }

@keyframes floatBeauty {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-25px) rotate(5deg); }
  75% { transform: translateY(25px) rotate(-5deg); }
}

.brand-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

/* Logo */
.brand-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease;
}

.logo-icon {
  width: 56px;
  height: 56px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-icon:hover {
  transform: rotate(-5deg) scale(1.05);
}

.logo-icon svg {
  width: 100%;
  height: 100%;
}

.brand-name {
  font-size: 2.4rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.5px;
}

.brand-highlight {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Tagline */
.brand-tagline {
  text-align: center;
  animation: fadeInUp 0.6s ease 0.15s both;
}

.signup-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 182, 193, 0.12);
  color: #f093fb;
  padding: 0.35rem 1.4rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  margin-bottom: 1.2rem;
  border: 1px solid rgba(255, 182, 193, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.signup-badge:hover {
  background: rgba(255, 182, 193, 0.2);
  transform: translateY(-2px);
}

.brand-tagline h2 {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.1;
  background: linear-gradient(135deg, #fff, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline p {
  font-size: 1.2rem;
  color: #94a3b8;
  font-weight: 400;
  letter-spacing: 0.5px;
}

/* Brand Stats */
.brand-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  margin-top: 3rem;
  padding-top: 2.5rem;
  border-top: 1px solid rgba(255, 182, 193, 0.06);
  animation: fadeInUp 0.6s ease 0.3s both;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
}

.stat-label {
  font-size: 0.8rem;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 35px;
  background: rgba(255, 182, 193, 0.06);
}

/* Testimonial */
.brand-testimonial {
  margin-top: 2.5rem;
  padding: 1.2rem 1.8rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  border: 1px solid rgba(255, 182, 193, 0.04);
  animation: fadeInUp 0.6s ease 0.45s both;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.brand-testimonial:hover {
  background: rgba(255, 255, 255, 0.05);
  transform: translateY(-2px);
}

.testimonial-stars {
  color: #f5b042;
  font-size: 0.9rem;
  letter-spacing: 3px;
  margin-bottom: 0.3rem;
}

.brand-testimonial p {
  color: #e2e8f0;
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.1rem;
}

.brand-testimonial span {
  color: #94a3b8;
  font-size: 0.8rem;
}

/* ============================================
   RIGHT REGISTER FORM - Full Height
   ============================================ */
.register-form-wrapper {
  padding: 2.5rem 2.5rem;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow-y: auto;
}

.register-form {
  width: 100%;
  max-width: 420px;
  animation: slideInRight 0.6s ease;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Form Decoration */
.form-decoration {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.deco-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #f093fb, transparent);
  max-width: 80px;
}

.deco-icon {
  font-size: 1.6rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Language Selector */
.language-selector {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}

.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.35rem 1.2rem;
  border: 1px solid rgba(226, 232, 240, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.lang-btn:hover {
  border-color: #f093fb;
  color: #f093fb;
  transform: translateY(-1px);
}

/* Form Header */
.form-header {
  margin-bottom: 1.5rem;
  text-align: center;
}

.header-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.8rem;
  font-size: 1.8rem;
  color: white;
  box-shadow: 0 8px 30px rgba(245, 87, 108, 0.2);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-icon:hover {
  transform: scale(1.05) rotate(-5deg);
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a2e;
  letter-spacing: -0.5px;
}

.form-header p {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-top: 0.1rem;
}

/* Form Fields */
.register-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  transition: all 0.3s ease;
}

.form-group.has-error .form-input {
  border-color: #f5576c;
  box-shadow: 0 0 0 3px rgba(245, 87, 108, 0.1);
}

.form-group label {
  font-weight: 500;
  color: #1a1a2e;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.form-group label i {
  color: #f5576c;
  font-size: 0.8rem;
}

.input-wrapper {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid rgba(226, 232, 240, 0.6);
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.5);
  color: #1a1a2e;
  position: relative;
  z-index: 1;
}

.form-input:focus {
  outline: none;
  border-color: #f093fb;
  background: white;
  box-shadow: 0 0 0 4px rgba(240, 147, 251, 0.06);
  transform: translateY(-1px);
}

.form-input:focus + .input-focus {
  transform: scaleX(1);
}

.form-input::placeholder {
  color: #94a3b8;
  font-size: 0.9rem;
}

.input-focus {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #f093fb, #f5576c);
  transform: scaleX(0);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 0 12px 12px;
  z-index: 2;
}

.password-toggle {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px 8px;
  transition: color 0.3s ease;
  z-index: 3;
  font-size: 0.9rem;
}

.password-toggle:hover {
  color: #f5576c;
}

.form-hint {
  font-size: 0.7rem;
  color: #94a3b8;
  margin-top: 0.1rem;
}

.error-message {
  font-size: 0.7rem;
  color: #f5576c;
  margin-top: 0.1rem;
  animation: shake 0.4s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

/* Form Options */
.form-options {
  display: flex;
  align-items: center;
  margin-top: -0.1rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #64748b;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 6px;
  display: inline-block;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.remember-me input:checked + .checkmark {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-color: #f093fb;
  box-shadow: 0 2px 8px rgba(240, 147, 251, 0.15);
}

.remember-me input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 11px;
}

.terms-link {
  color: #f5576c;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.terms-link:hover {
  color: #f093fb;
  text-decoration: underline;
}

/* Register Button */
.register-btn {
  width: 100%;
  padding: 0.85rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  letter-spacing: 0.3px;
  position: relative;
  overflow: hidden;
}

.register-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
  transition: left 0.5s ease;
}

.register-btn:hover:not(:disabled)::before {
  left: 100%;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(245, 87, 108, 0.35);
}

.register-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.1rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(226, 232, 240, 0.5);
}

.divider span {
  color: #94a3b8;
  font-size: 0.8rem;
  white-space: nowrap;
}

/* Login Link */
.login-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.7rem;
  border: 2px solid rgba(226, 232, 240, 0.5);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  color: #f5576c;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.login-link:hover {
  border-color: #f093fb;
  background: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  color: #f093fb;
}

.login-link:active {
  transform: scale(0.98);
}

.login-link i {
  font-size: 0.9rem;
}

/* Spinner */
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Brand Credit */
.brand-credit {
  margin-top: 1.2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(241, 245, 249, 0.3);
  text-align: center;
}

.brand-credit span {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* ============================================
   ANIMATIONS
   ============================================ */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1024px) {
  .register-container {
    grid-template-columns: 1fr 1.1fr;
  }

  .brand-tagline h2 {
    font-size: 3rem;
  }

  .register-form-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
    height: 100vh;
    overflow-y: auto;
  }

  .register-brand {
    height: auto;
    padding: 2.5rem 2rem;
    min-height: 40vh;
  }

  .register-form-wrapper {
    height: auto;
    padding: 1.5rem 1.5rem;
    min-height: 60vh;
    overflow-y: auto;
  }

  .brand-tagline h2 {
    font-size: 2.5rem;
  }

  .brand-stats {
    gap: 1.5rem;
    margin-top: 2rem;
    padding-top: 1.5rem;
  }

  .stat-divider {
    display: none;
  }

  .brand-testimonial {
    display: none;
  }

  .form-header h2 {
    font-size: 1.5rem;
  }

  .header-icon {
    width: 52px;
    height: 52px;
    font-size: 1.5rem;
  }

  .bg-elements {
    display: none;
  }

  .floating-elements {
    display: none;
  }

  .register-form {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .register-brand {
    padding: 1.5rem 1rem;
    min-height: 30vh;
  }

  .register-form-wrapper {
    padding: 1rem 1rem;
    min-height: 70vh;
  }

  .brand-logo {
    margin-bottom: 1.5rem;
  }

  .brand-name {
    font-size: 1.6rem;
  }

  .logo-icon {
    width: 44px;
    height: 44px;
  }

  .brand-tagline h2 {
    font-size: 2rem;
  }

  .brand-tagline p {
    font-size: 1rem;
  }

  .brand-stats {
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
  }

  .stat-number {
    font-size: 1.2rem;
  }

  .stat-label {
    font-size: 0.65rem;
  }

  .form-header h2 {
    font-size: 1.3rem;
  }

  .form-header p {
    font-size: 0.8rem;
  }

  .header-icon {
    width: 44px;
    height: 44px;
    font-size: 1.2rem;
  }

  .form-input {
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
  }

  .register-btn {
    padding: 0.7rem;
    font-size: 0.85rem;
  }

  .login-link {
    padding: 0.6rem;
    font-size: 0.85rem;
  }

  .form-decoration {
    margin-bottom: 0.75rem;
  }

  .deco-icon {
    font-size: 1.2rem;
  }

  .register-form-fields {
    gap: 0.75rem;
  }
}
</style>