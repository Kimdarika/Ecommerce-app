import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

// Import Bootstrap JS only (CSS and Font Awesome are handled by index.html)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Toast Notification Plugin
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// 1. Initialize the Vue instance
const app = createApp(App)

// 2. Register plugins
app.use(createPinia())
app.use(router)
app.use(Toast, {
    position: 'top-right',
    timeout: 3000,
})

// 3. Mount the application to the DOM
app.mount('#app')

// 4. Wait exactly 10 seconds (10000 milliseconds) before hiding the loader
setTimeout(() => {
  const loader = document.getElementById('app-loading')
  if (loader) {
    loader.style.display = 'none'
  }
}, 5000)
