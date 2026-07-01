<template>
  <div class="profile-page">
    <div class="container">
      <!-- Header -->
      <div class="profile-header">
        <div class="header-content">
          <div class="header-left">
            <div class="icon-wrapper">
              <i class="fas fa-user-circle"></i>
            </div>
            <div>
              <h1>My Profile</h1>
              <p class="text-muted">Manage your account settings and preferences</p>
            </div>
          </div>
          <div class="header-right">
            <span class="status-badge" :class="{'verified': user?.email_verified_at}">
              <i class="fas fa-circle"></i>
              {{ user?.email_verified_at ? 'Verified' : 'Unverified' }}
            </span>
          </div>
        </div>
      </div>

      <div class="row g-4">
        <!-- Profile Card -->
        <div class="col-lg-4">
          <div class="profile-card">
            <div class="profile-avatar">
              <div class="avatar-wrapper">
                <div class="avatar-image">
                  <span class="avatar-text">{{ userInitials }}</span>
                </div>
                <button class="avatar-upload-btn" @click="triggerFileInput">
                  <i class="fas fa-camera"></i>
                </button>
                <input 
                  type="file" 
                  ref="fileInput" 
                  class="d-none" 
                  accept="image/*"
                  @change="uploadAvatar"
                >
              </div>
            </div>
            <div class="profile-info">
              <h3 class="profile-name">{{ user?.name || 'Guest User' }}</h3>
              <p class="profile-email">{{ user?.email || 'No email' }}</p>
              <div class="profile-meta">
                <div class="meta-item" v-if="user?.phone">
                  <i class="fas fa-phone"></i>
                  <span>{{ user.phone }}</span>
                </div>
                <div class="meta-item" v-if="user?.address">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ user.address }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-calendar-alt"></i>
                  <span>Joined {{ formatDate(user?.created_at) }}</span>
                </div>
              </div>
            </div>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-number">{{ ordersCount }}</span>
                <span class="stat-label">Orders</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">{{ wishlistCount }}</span>
                <span class="stat-label">Wishlist</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">{{ reviewsCount }}</span>
                <span class="stat-label">Reviews</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="quick-actions">
            <router-link to="/orders" class="action-link">
              <i class="fas fa-shopping-bag"></i>
              <span>My Orders</span>
              <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link to="/wishlist" class="action-link">
              <i class="fas fa-heart"></i>
              <span>Wishlist</span>
              <i class="fas fa-chevron-right"></i>
            </router-link>
            <router-link to="/cart" class="action-link">
              <i class="fas fa-shopping-cart"></i>
              <span>Shopping Cart</span>
              <i class="fas fa-chevron-right"></i>
            </router-link>
          </div>
        </div>

        <!-- Settings -->
        <div class="col-lg-8">
          <div class="settings-card">
            <!-- Profile Settings -->
            <div class="settings-section">
              <div class="section-header">
                <div class="section-icon">
                  <i class="fas fa-user-edit"></i>
                </div>
                <div>
                  <h5>Profile Information</h5>
                  <p class="text-muted">Update your personal information</p>
                </div>
              </div>

              <form @submit.prevent="updateProfile" class="settings-form">
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="name" class="form-label">
                        <i class="fas fa-user"></i> Full Name
                      </label>
                      <input 
                        type="text" 
                        id="name"
                        class="form-control" 
                        v-model="profile.name" 
                        required
                        placeholder="John Doe"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="email" class="form-label">
                        <i class="fas fa-envelope"></i> Email Address
                      </label>
                      <input 
                        type="email" 
                        id="email"
                        class="form-control" 
                        v-model="profile.email" 
                        required
                        placeholder="john@example.com"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="phone" class="form-label">
                        <i class="fas fa-phone"></i> Phone Number
                      </label>
                      <input 
                        type="tel" 
                        id="phone"
                        class="form-control" 
                        v-model="profile.phone" 
                        placeholder="+1 (555) 123-4567"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="address" class="form-label">
                        <i class="fas fa-map-marker-alt"></i> Address
                      </label>
                      <input 
                        type="text" 
                        id="address"
                        class="form-control" 
                        v-model="profile.address" 
                        placeholder="123 Main St, City, Country"
                      >
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="telegram-chat-id" class="form-label">
                        <i class="fab fa-telegram"></i> Telegram Chat ID
                      </label>
                      <input 
                        type="text" 
                        id="telegram-chat-id"
                        class="form-control" 
                        v-model="profile.telegram_chat_id" 
                        placeholder="Paste the chat ID from your Telegram bot"
                      >
                      <small class="text-muted d-block mt-1">
                        Send <strong>/start</strong> to your bot, copy the chat ID, then paste it here.
                      </small>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn-save" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <template v-else>
                      <i class="fas fa-save"></i> Save Changes
                    </template>
                  </button>
                </div>
              </form>
            </div>

            <!-- Divider -->
            <div class="settings-divider">
              <span>or</span>
            </div>

            <!-- Password Settings -->
            <div class="settings-section">
              <div class="section-header">
                <div class="section-icon">
                  <i class="fas fa-lock"></i>
                </div>
                <div>
                  <h5>Change Password</h5>
                  <p class="text-muted">Update your password to keep your account secure</p>
                </div>
              </div>

              <form @submit.prevent="changePassword" class="settings-form">
                <div class="row g-3">
                  <div class="col-12">
                    <div class="form-group">
                      <label for="current-password" class="form-label">
                        <i class="fas fa-key"></i> Current Password
                      </label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showCurrentPassword ? 'text' : 'password'"
                          id="current-password"
                          class="form-control" 
                          v-model="password.current_password" 
                          required
                          placeholder="Enter current password"
                        >
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showCurrentPassword = !showCurrentPassword"
                        >
                          <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="new-password" class="form-label">
                        <i class="fas fa-key"></i> New Password
                      </label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showNewPassword ? 'text' : 'password'"
                          id="new-password"
                          class="form-control" 
                          v-model="password.new_password" 
                          required
                          placeholder="Enter new password"
                          minlength="8"
                        >
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showNewPassword = !showNewPassword"
                        >
                          <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <div class="password-strength" v-if="password.new_password">
                        <div class="strength-bar">
                          <div class="strength-fill" :class="passwordStrength.class" :style="{ width: passwordStrength.percentage + '%' }"></div>
                        </div>
                        <span class="strength-text" :class="passwordStrength.class">{{ passwordStrength.label }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="confirm-password" class="form-label">
                        <i class="fas fa-check-circle"></i> Confirm Password
                      </label>
                      <div class="password-input-wrapper">
                        <input 
                          :type="showConfirmPassword ? 'text' : 'password'"
                          id="confirm-password"
                          class="form-control" 
                          v-model="password.new_password_confirmation" 
                          required
                          placeholder="Confirm new password"
                        >
                        <button 
                          type="button" 
                          class="password-toggle"
                          @click="showConfirmPassword = !showConfirmPassword"
                        >
                          <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                      </div>
                      <div class="password-match" v-if="password.new_password && password.new_password_confirmation">
                        <span v-if="password.new_password === password.new_password_confirmation" class="text-success">
                          <i class="fas fa-check-circle"></i> Passwords match
                        </span>
                        <span v-else class="text-danger">
                          <i class="fas fa-times-circle"></i> Passwords do not match
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-actions">
                  <button type="submit" class="btn-change-password" :disabled="loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    <template v-else>
                      <i class="fas fa-key"></i> Update Password
                    </template>
                  </button>
                </div>
              </form>
            </div>

            <!-- Danger Zone -->
            <div class="danger-zone">
              <div class="danger-zone-header">
                <i class="fas fa-exclamation-triangle"></i>
                <span>Danger Zone</span>
              </div>
              <p>Permanently delete your account and all associated data.</p>
              <button class="btn-delete-account" @click="confirmDeleteAccount">
                <i class="fas fa-trash-alt"></i> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const toast = useToast()

const user = ref(authStore.userData)
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const ordersCount = ref(12)
const reviewsCount = ref(8)
const wishlistCount = computed(() => wishlistStore.items?.length || 0)

const userInitials = computed(() => {
  const name = user.value?.name || 'User'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
})

const formatDate = (date: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

const passwordStrength = computed(() => {
  const password = password.new_password
  if (!password) return { label: 'Weak', class: 'weak', percentage: 20 }
  
  let score = 0
  if (password.length >= 8) score += 20
  if (password.length >= 12) score += 10
  if (/[a-z]/.test(password)) score += 20
  if (/[A-Z]/.test(password)) score += 20
  if (/[0-9]/.test(password)) score += 15
  if (/[^a-zA-Z0-9]/.test(password)) score += 15
  
  if (score >= 80) return { label: 'Strong', class: 'strong', percentage: score }
  if (score >= 60) return { label: 'Good', class: 'good', percentage: score }
  if (score >= 40) return { label: 'Fair', class: 'fair', percentage: score }
  return { label: 'Weak', class: 'weak', percentage: score }
})

const profile = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
  telegram_chat_id: user.value?.telegram_chat_id || '',
})

const password = reactive({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const uploadAvatar = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  const formData = new FormData()
  formData.append('avatar', file)

  loading.value = true
  try {
    const response = await axios.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    user.value = response.data.user
    toast.success('Avatar updated!')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to upload avatar')
  } finally {
    loading.value = false
    input.value = ''
  }
}

const updateProfile = async () => {
  loading.value = true
  try {
    const response = await axios.put('/profile', profile)
    authStore.user = response.data.user
    localStorage.setItem('user', JSON.stringify(response.data.user))
    user.value = response.data.user
    toast.success('Profile updated! 🎉')
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to update profile')
  } finally {
    loading.value = false
  }
}

const changePassword = async () => {
  if (password.new_password !== password.new_password_confirmation) {
    toast.error('Passwords do not match')
    return
  }
  if (password.new_password.length < 8) {
    toast.error('Password must be at least 8 characters')
    return
  }

  loading.value = true
  try {
    await axios.put('/profile/password', {
      current_password: password.current_password,
      new_password: password.new_password,
      new_password_confirmation: password.new_password_confirmation,
    })
    toast.success('Password changed successfully! 🔒')
    password.current_password = ''
    password.new_password = ''
    password.new_password_confirmation = ''
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to change password')
  } finally {
    loading.value = false
  }
}

const confirmDeleteAccount = () => {
  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    toast.warning('Account deletion is not implemented in demo')
  }
}

onMounted(async () => {
  if (authStore.isAuthenticated) {
    try {
      const response = await authStore.fetchCurrentUser()
      if (response.success) {
        user.value = response.user
      }
    } catch (error) {
      console.error('Failed to load current user', error)
    }
  }

  if (user.value) {
    profile.name = user.value.name || ''
    profile.email = user.value.email || ''
    profile.phone = user.value.phone || ''
    profile.address = user.value.address || ''
  }
})
</script>

<style scoped>
/* ============================================
   PROFILE PAGE
   ============================================ */
.profile-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  padding: 50px 0 60px;
  background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 600px;
 
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ============================================
   HEADER
   ============================================ */
.profile-header {
  margin-bottom: 2.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.icon-wrapper {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.6rem;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.header-left h1 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a2e;
}

.header-left p {
  margin: 0;
  font-size: 0.9rem;
  color: #6c7a89;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  background: #f0f2f5;
  color: #6c7a89;
}

.status-badge i {
  font-size: 0.5rem;
}

.status-badge.verified {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.verified i {
  color: #10b981;
}

/* ============================================
   PROFILE CARD
   ============================================ */
.profile-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e6f6;
  text-align: center;
}

.profile-avatar {
  margin-bottom: 1.5rem;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.avatar-image:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
}

.avatar-text {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
}

.avatar-upload-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border: 3px solid white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.avatar-upload-btn:hover {
  transform: scale(1.1);
}

.profile-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.profile-email {
  color: #6c7a89;
  margin-bottom: 1rem;
}

.profile-meta {
  text-align: left;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0e6f6;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  color: #6c7a89;
  font-size: 0.9rem;
}

.meta-item i {
  width: 20px;
  color: #667eea;
}

.profile-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0e6f6;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1a2e;
}

.stat-label {
  font-size: 0.75rem;
  color: #6c7a89;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-divider {
  width: 2px;
  height: 30px;
  background: #f0e6f6;
}

/* ============================================
   QUICK ACTIONS
   ============================================ */
.quick-actions {
  margin-top: 1.5rem;
  background: white;
  border-radius: 20px;
  border: 1px solid #f0e6f6;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
}

.action-link {
  display: flex;
  align-items: center;
  padding: 0.9rem 1.5rem;
  color: #1a1a2e;
  text-decoration: none;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0e6f6;
}

.action-link:last-child {
  border-bottom: none;
}

.action-link:hover {
  background: #faf8fc;
  padding-left: 2rem;
}

.action-link i:first-child {
  width: 24px;
  color: #667eea;
}

.action-link span {
  flex: 1;
  font-weight: 500;
}

.action-link i:last-child {
  color: #9aa5b5;
  transition: all 0.3s ease;
}

.action-link:hover i:last-child {
  transform: translateX(4px);
  color: #667eea;
}

/* ============================================
   SETTINGS CARD
   ============================================ */
.settings-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0e6f6;
}

.settings-section {
  margin-bottom: 1.5rem;
}

.settings-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.section-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(102, 126, 234, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.2rem;
}

.section-header h5 {
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
}

.section-header p {
  margin: 0;
  font-size: 0.85rem;
}

.settings-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 2rem 0;
}

.settings-divider::before,
.settings-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #f0e6f6;
}

.settings-divider span {
  padding: 0 1rem;
  color: #9aa5b5;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* ============================================
   FORM STYLES
   ============================================ */
.settings-form .form-group {
  margin-bottom: 0.25rem;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.35rem;
}

.form-label i {
  color: #667eea;
  margin-right: 0.25rem;
}

.form-control {
  border-radius: 10px;
  border: 2px solid #e8ecf1;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: white;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.08);
}

.password-input-wrapper {
  position: relative;
}

.password-input-wrapper .form-control {
  padding-right: 3rem;
}

.password-toggle {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #9aa5b5;
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.3s ease;
}

.password-toggle:hover {
  color: #667eea;
}

.password-strength {
  margin-top: 0.5rem;
}

.strength-bar {
  height: 4px;
  background: #e8ecf1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.strength-fill {
  height: 100%;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.strength-fill.weak { background: #ef4444; }
.strength-fill.fair { background: #f59e0b; }
.strength-fill.good { background: #3b82f6; }
.strength-fill.strong { background: #10b981; }

.strength-text {
  font-size: 0.75rem;
  font-weight: 500;
}

.strength-text.weak { color: #ef4444; }
.strength-text.fair { color: #f59e0b; }
.strength-text.good { color: #3b82f6; }
.strength-text.strong { color: #10b981; }

.password-match {
  font-size: 0.8rem;
  margin-top: 0.35rem;
}

.password-match .text-success i,
.password-match .text-danger i {
  margin-right: 0.25rem;
}

/* ============================================
   FORM ACTIONS
   ============================================ */
.form-actions {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.btn-save {
  padding: 0.7rem 2rem;
 background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-save:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.btn-save:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-change-password {
  padding: 0.7rem 2rem;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(245, 158, 11, 0.3);
}

.btn-change-password:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(245, 158, 11, 0.4);
}

.btn-change-password:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ============================================
   DANGER ZONE
   ============================================ */
.danger-zone {
  margin-top: 2rem;
  padding: 1.5rem;
  border: 2px solid #fee2e2;
  border-radius: 16px;
  background: #fef2f2;
}

.danger-zone-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 0.5rem;
}

.danger-zone-header i {
  font-size: 1.1rem;
}

.danger-zone p {
  color: #6c7a89;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.btn-delete-account {
  padding: 0.6rem 1.5rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-delete-account:hover {
  background: #b91c1c;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 992px) {
  .profile-card {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 768px) {
  .profile-page {
    padding: 1rem 0 2rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .header-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
  
  .icon-wrapper {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
  }
  
  .header-left h1 {
    font-size: 1.4rem;
  }
  
  .settings-card {
    padding: 1.25rem;
  }
  
  .profile-stats {
    gap: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-save,
  .btn-change-password {
    width: 100%;
    justify-content: center;
  }
  
  .danger-zone {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 1rem;
  }
  
  .avatar-image {
    width: 100px;
    height: 100px;
  }
  
  .avatar-text {
    font-size: 2rem;
  }
  
  .profile-name {
    font-size: 1.1rem;
  }
  
  .profile-stats {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-item {
    flex: 1;
    min-width: 60px;
  }
  
  .action-link {
    padding: 0.7rem 1rem;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
  }
  
  .section-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
