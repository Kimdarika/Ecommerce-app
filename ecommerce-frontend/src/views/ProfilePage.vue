<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body text-center">
            <i class="fas fa-user-circle fa-5x text-primary mb-3"></i>
            <h4>{{ user?.name }}</h4>
            <p class="text-muted">{{ user?.email }}</p>
            <p class="text-muted" v-if="user?.phone"><i class="fas fa-phone"></i> {{ user.phone }}</p>
            <p class="text-muted" v-if="user?.address"><i class="fas fa-map-marker-alt"></i> {{ user.address }}</p>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5>Update Profile</h5>
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="profile.name" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="profile.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Phone</label>
                <input type="tel" class="form-control" v-model="profile.phone">
              </div>
              <div class="mb-3">
                <label class="form-label">Address</label>
                <textarea class="form-control" v-model="profile.address" rows="2"></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Update Profile
              </button>
            </form>

            <hr>

            <h5>Change Password</h5>
            <form @submit.prevent="changePassword">
              <div class="mb-3">
                <label class="form-label">Current Password</label>
                <input type="password" class="form-control" v-model="password.current_password" required>
              </div>
              <div class="mb-3">
                <label class="form-label">New Password</label>
                <input type="password" class="form-control" v-model="password.new_password" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Confirm New Password</label>
                <input type="password" class="form-control" v-model="password.new_password_confirmation" required>
              </div>
              <button type="submit" class="btn btn-warning" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import axios from '@/plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'

const authStore = useAuthStore()
const toast = useToast()

const user = ref(authStore.userData)
const loading = ref(false)

const profile = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
})

const password = reactive({
  current_password: '',
  new_password: '',
  new_password_confirmation: '',
})

const updateProfile = async () => {
  loading.value = true
  try {
    const response = await axios.put('/profile', profile)
    authStore.user = response.data.user
    localStorage.setItem('user', JSON.stringify(response.data.user))
    user.value = response.data.user
    toast.success('Profile updated!')
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
    toast.success('Password changed!')
    password.current_password = ''
    password.new_password = ''
    password.new_password_confirmation = ''
  } catch (error: any) {
    toast.error(error.response?.data?.message || 'Failed to change password')
  } finally {
    loading.value = false
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
