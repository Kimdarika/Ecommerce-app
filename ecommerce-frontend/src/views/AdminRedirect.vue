<template>
  <div class="admin-redirect">
    <div class="card">
      <h1>Admin Portal</h1>
      <p>Redirecting to the admin dashboard...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

onMounted(() => {
  if (!authStore.isAuthenticated) {
    window.location.replace('http://localhost:8000/admin/login')
    return
  }

  if (!authStore.isAdmin) {
    router.replace('/')
    return
  }

  window.location.replace('http://localhost:8000/admin')
})
</script>

<style scoped>
.admin-redirect {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  padding: 2rem 2.5rem;
  border-radius: 18px;
  background: white;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.card h1 {
  margin-bottom: 0.5rem;
  color: #1a1a2e;
}

.card p {
  margin: 0;
  color: #64748b;
}
</style>
