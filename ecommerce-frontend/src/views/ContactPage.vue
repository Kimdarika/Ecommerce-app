<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center mb-4">Contact Us</h1>
        
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body">
                <i class="fas fa-envelope fa-3x text-primary"></i>
                <h5 class="mt-3">Email</h5>
                <p class="text-muted">support@shop.com</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body">
                <i class="fas fa-phone fa-3x text-primary"></i>
                <h5 class="mt-3">Phone</h5>
                <p class="text-muted">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card h-100 text-center border-0 shadow-sm">
              <div class="card-body">
                <i class="fas fa-map-marker-alt fa-3x text-primary"></i>
                <h5 class="mt-3">Address</h5>
                <p class="text-muted">123 Shop Street, City</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm mt-4">
          <div class="card-body">
            <h5>Send Us a Message</h5>
            <form @submit.prevent="sendMessage">
              <div class="mb-3">
                <label class="form-label">Your Name</label>
                <input type="text" class="form-control" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" v-model="form.email" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea class="form-control" v-model="form.message" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  message: '',
})

const sendMessage = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success('Message sent! We\'ll get back to you soon.')
    form.value = { name: '', email: '', message: '' }
  }, 1500)
}
</script>