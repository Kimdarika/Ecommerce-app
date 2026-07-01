<template>
  <div class="contact-page">
    <!-- Hero Section with Image -->
    <section class="contact-hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              📬 Get in Touch
            </div>
            <h1 class="hero-title">
              Let's Start a <br>
              <span class="gradient-text">Conversation</span>
            </h1>
            <p class="hero-description">
              Have questions? We'd love to hear from you. Our team is here to help with any inquiries.
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">24/7</span>
                <span class="stat-label">Support</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">Satisfaction</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">5★</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
            <div class="hero-actions">
              <a href="#contact-form" class="btn-primary-hero">
                <i class="fas fa-paper-plane"></i>
                Send Message
                <span class="btn-arrow">→</span>
              </a>
              <a href="tel:+15551234567" class="btn-secondary-hero">
                <i class="fas fa-phone"></i>
                Call Now
              </a>
            </div>
          </div>
          
          <div class="hero-visual">
            <div class="hero-image-wrapper">
              <div class="hero-image-container">
                <img 
                  src="https://i.pinimg.com/736x/30/dd/ea/30ddea860268f74df75d78921af1526d.jpg"
                  alt="Customer Support Team"
                  class="hero-image"
                  @error="handleImageError"
                >
                <div class="hero-image-overlay">
                  <div class="overlay-content">
                    <i class="fas fa-headset"></i>
                    <span>We're here to help</span>
                  </div>
                </div>
              </div>
              
              <div class="floating-badge floating-badge-1">
                <i class="fas fa-clock"></i>
                <div>
                  <strong>Quick Response</strong>
                  <span>Within 24 hours</span>
                </div>
              </div>
              <div class="floating-badge floating-badge-2">
                <i class="fas fa-check-circle"></i>
                <div>
                  <strong>24/7 Support</strong>
                  <span>Always available</span>
                </div>
              </div>
              <div class="floating-badge floating-badge-3">
                <i class="fas fa-star"></i>
                <div>
                  <strong>4.9 Rating</strong>
                  <span>Customer feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Cards -->
    <section class="contact-cards">
      <div class="container">
        <div class="cards-grid">
          <div class="contact-card">
            <div class="card-icon email">
              <i class="fas fa-envelope"></i>
            </div>
            <h4>Email Us</h4>
            <p>support@chhoukshop.com</p>
            <span class="card-hint">We reply within 24 hours</span>
            <div class="card-hover-effect"></div>
            <div class="card-shimmer"></div>
          </div>

          <div class="contact-card featured">
            <div class="card-badge">Popular</div>
            <div class="card-icon phone">
              <i class="fas fa-phone"></i>
            </div>
            <h4>Call Us</h4>
            <p>+1 (555) 123-4567</p>
            <span class="card-hint">Mon-Fri, 9am - 6pm</span>
            <div class="card-hover-effect"></div>
            <div class="card-shimmer"></div>
          </div>

          <div class="contact-card">
            <div class="card-icon location">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <h4>Visit Us</h4>
            <p>123 Shop Street, City</p>
            <span class="card-hint">Find us on Google Maps</span>
            <div class="card-hover-effect"></div>
            <div class="card-shimmer"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="contact-form-section" id="contact-form">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">✉️ Send Message</span>
          <h2 class="section-title">We're Here to Help</h2>
          <p class="section-subtitle">Fill in the form below and we'll get back to you as soon as possible</p>
        </div>

        <div class="form-grid">
          <div class="form-wrapper">
            <!-- Form Progress -->
            <div class="form-progress">
              <div class="progress-step active">
                <span class="step-number">1</span>
                <span class="step-label">Details</span>
              </div>
              <div class="progress-line" :class="{ filled: form.name && form.email }"></div>
              <div class="progress-step" :class="{ active: form.subject && form.message }">
                <span class="step-number">2</span>
                <span class="step-label">Message</span>
              </div>
            </div>

            <form @submit.prevent="sendMessage" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">
                    <i class="fas fa-user"></i> Your Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    placeholder="John Doe"
                    required
                    class="form-input"
                    :class="{ 'is-filled': form.name }"
                  >
                  <span class="input-focus-border"></span>
                </div>

                <div class="form-group">
                  <label for="email">
                    <i class="fas fa-envelope"></i> Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    placeholder="john@example.com"
                    required
                    class="form-input"
                    :class="{ 'is-filled': form.email }"
                  >
                  <span class="input-focus-border"></span>
                </div>
              </div>

              <div class="form-group">
                <label for="subject">
                  <i class="fas fa-tag"></i> Subject
                </label>
                <select id="subject" v-model="form.subject" class="form-input form-select">
                  <option value="">Select a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Returns & Refunds">Returns & Refunds</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                <span class="input-focus-border"></span>
              </div>

              <div class="form-group">
                <label for="message">
                  <i class="fas fa-comment"></i> Message
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  rows="5" 
                  placeholder="Tell us how we can help..."
                  required
                  class="form-input form-textarea"
                  :class="{ 'is-filled': form.message }"
                ></textarea>
                <span class="input-focus-border"></span>
                <div class="char-counter" v-if="form.message">
                  {{ form.message.length }}/500
                </div>
              </div>

              <div class="form-options">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="form.agree">
                  <span class="checkmark"></span>
                  I agree to the terms and conditions
                </label>
              </div>

              <button type="submit" class="submit-btn" :disabled="loading || !form.agree">
                <span v-if="loading" class="spinner"></span>
                <template v-else>
                  <i class="fas fa-paper-plane"></i> 
                  Send Message
                  <span class="btn-arrow">→</span>
                </template>
              </button>
            </form>
          </div>

          <div class="info-wrapper">
            <div class="info-card">
              <div class="info-header">
                <div class="info-header-icon">
                  <i class="fas fa-store"></i>
                </div>
                <div>
                  <h3>Store Information</h3>
                  <p>Get in touch with us</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="info-text">
                  <strong>Working Hours</strong>
                  <p><i class="fas fa-circle text-success"></i> Mon-Fri: 9am - 6pm</p>
                  <p><i class="fas fa-circle text-warning"></i> Sat: 10am - 4pm</p>
                  <p><i class="fas fa-circle text-danger"></i> Sun: Closed</p>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-map-pin"></i>
                </div>
                <div class="info-text">
                  <strong>Store Location</strong>
                  <p>123 Shop Street, City</p>
                  <a href="#" class="map-link">
                    <i class="fas fa-arrow-right"></i> Get Directions
                  </a>
                </div>
              </div>
              
              <div class="info-item">
                <div class="info-icon">
                  <i class="fas fa-globe"></i>
                </div>
                <div class="info-text">
                  <strong>Connect With Us</strong>
                  <div class="social-links">
                    <a href="#" class="social-link fb">
                      <i class="fab fa-facebook-f"></i>
                      <span>Facebook</span>
                    </a>
                    <a href="#" class="social-link ig">
                      <i class="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a href="#" class="social-link tw">
                      <i class="fab fa-twitter"></i>
                      <span>Twitter</span>
                    </a>
                    <a href="#" class="social-link yt">
                      <i class="fab fa-youtube"></i>
                      <span>YouTube</span>
                    </a>
                  </div>
                </div>
              </div>

              <div class="info-cta">
                <div class="cta-icons">
                  <i class="fas fa-headset"></i>
                  <i class="fas fa-phone-alt"></i>
                  <i class="fas fa-comment-dots"></i>
                </div>
                <p>Prefer to chat?</p>
                <a href="tel:+15551234567" class="call-btn">
                  <i class="fas fa-phone-alt"></i> Call Now
                </a>
              </div>
            </div>

            <!-- Live Chat Preview -->
            <div class="live-chat-card">
              <div class="live-chat-header">
                <div class="live-chat-status">
                  <span class="status-dot"></span>
                  <span>Online</span>
                </div>
                <i class="fas fa-comment-dots"></i>
              </div>
              <p>Our team is online and ready to help</p>
              <button class="live-chat-btn">
                <i class="fas fa-comment"></i> Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">❓ FAQ</span>
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle">Find quick answers to common questions</p>
        </div>

        <div class="faq-grid">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <span>
                <span class="faq-icon">{{ faq.icon }}</span>
                {{ faq.question }}
              </span>
              <i class="fas fa-chevron-down" :class="{ rotated: activeFaq === index }"></i>
            </div>
            <div class="faq-answer" v-if="activeFaq === index">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <div class="faq-cta">
          <p>Still have questions?</p>
          <router-link to="/contact" class="faq-contact-btn">
            <i class="fas fa-envelope"></i> Contact Support
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const loading = ref(false)
const activeFaq = ref<number | null>(null)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  agree: false,
})

const faqs = [
  {
    icon: '🚚',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. International shipping may take 7-14 business days depending on the destination.'
  },
  {
    icon: '🔄',
    question: 'What is your return policy?',
    answer: 'We offer 30-day hassle-free returns for all products. Simply contact our support team to initiate a return. Items must be unused and in original packaging.'
  },
  {
    icon: '🌍',
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide. International shipping fees apply based on location and order weight. Customs duties may apply depending on your country.'
  },
  {
    icon: '💳',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
  },
  {
    icon: '🔒',
    question: 'Is my personal information secure?',
    answer: 'Absolutely! We use industry-standard SSL encryption to protect your data. We never share your personal information with third parties.'
  }
]

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/800x800/667eea/ffffff?text=Contact+Us'
}

const sendMessage = () => {
  if (!form.agree) {
    toast.warning('Please agree to the terms and conditions')
    return
  }
  
  loading.value = true
  setTimeout(() => {
    loading.value = false
    toast.success('Message sent! We\'ll get back to you soon. 🎉')
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
    form.agree = false
  }, 1500)
}
</script>

<style scoped>
/* ============================================
   GLOBAL
   ============================================ */
.contact-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-header {
  margin-bottom: 3.5rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
  padding: 0.3rem 1rem;
  border-radius: 50px;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #6c7a89;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* ============================================
   HERO SECTION WITH IMAGE
   ============================================ */
.contact-hero {
  padding: 80px 0 60px;
  background: linear-gradient(160deg, #fef6f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 500px;
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.contact-hero::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 107, 107, 0.04) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

.hero-content {
  position: relative;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.badge-dot {
  width: 8px;
  height: 8px;
  background: #4ade80;
  border-radius: 50%;
  display: inline-block;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 40%, #f093fb 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.15rem;
  color: #6c7a89;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
  border-top: 2px solid rgba(0, 0, 0, 0.04);
  border-bottom: 2px solid rgba(0, 0, 0, 0.04);
  margin-bottom: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
}

.stat-label {
  font-size: 0.8rem;
  color: #9aa5b5;
  font-weight: 500;
}

.stat-divider {
  width: 2px;
  height: 35px;
  background: #e8ecf1;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 25px rgba(102, 126, 234, 0.35);
}

.btn-primary-hero:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(102, 126, 234, 0.5);
  color: white;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.btn-primary-hero:hover .btn-arrow {
  transform: translateX(5px);
}

.btn-secondary-hero {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  color: #1a1a2e;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.btn-secondary-hero:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  color: #1a1a2e;
}

/* Hero Image */
.hero-visual {
  position: relative;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
}

.hero-image-container {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
}

.hero-image {
  width: 100%;
  height: 450px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.hero-image-container:hover .hero-image {
  transform: scale(1.03);
}

.hero-image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.overlay-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
}

.overlay-content i {
  font-size: 1.5rem;
}

.floating-badge {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 0.8rem 1.2rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  animation: float 3s ease-in-out infinite;
}

.floating-badge i {
  font-size: 1.2rem;
  color: #667eea;
}

.floating-badge strong {
  display: block;
  font-size: 0.85rem;
  color: #1a1a2e;
}

.floating-badge span {
  font-size: 0.7rem;
  color: #9aa5b5;
}

.floating-badge-1 {
  top: 5%;
  right: -10%;
  animation-delay: 0s;
}

.floating-badge-2 {
  bottom: 10%;
  left: -10%;
  animation-delay: 1.5s;
}

.floating-badge-3 {
  top: 40%;
  right: -15%;
  animation-delay: 3s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* ============================================
   CONTACT CARDS
   ============================================ */
.contact-cards {
  padding: 60px 0;
  background: white;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.contact-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #f0f2f5;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.contact-card.featured {
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.08);
}

.contact-card.featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
}

.card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.2rem 0.8rem;
  border-radius: 50px;
  z-index: 2;
}

.contact-card:hover {
  transform: translateY(-8px);
  border-color: #667eea;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.03), rgba(118, 75, 162, 0.03));
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 20px;
}

.contact-card:hover .card-hover-effect {
  opacity: 1;
}

.card-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.8s ease;
}

.contact-card:hover .card-shimmer {
  left: 100%;
}

.card-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 1.6rem;
  position: relative;
  z-index: 1;
}

.card-icon.email {
  background: rgba(102, 126, 234, 0.1);
  color: #667eea;
}

.card-icon.phone {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.card-icon.location {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.contact-card h4 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.contact-card p {
  font-size: 1rem;
  color: #2d3436;
  margin: 0;
  position: relative;
  z-index: 1;
}

.card-hint {
  display: block;
  font-size: 0.8rem;
  color: #9aa5b5;
  margin-top: 0.5rem;
  position: relative;
  z-index: 1;
}

/* ============================================
   FORM SECTION
   ============================================ */
.contact-form-section {
  padding: 60px 0 80px;
  background: #fafbff;
}

.form-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: start;
}

.form-wrapper {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid #f0f2f5;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.04);
}

/* Form Progress */
.form-progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0 0.5rem;
}

.progress-step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
  transition: all 0.3s ease;
}

.progress-step.active {
  opacity: 1;
}

.progress-step .step-number {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e8ecf1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.8rem;
  color: #6c7a89;
  transition: all 0.3s ease;
}

.progress-step.active .step-number {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.progress-step .step-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6c7a89;
}

.progress-line {
  flex: 1;
  height: 2px;
  background: #e8ecf1;
  transition: all 0.3s ease;
}

.progress-line.filled {
  background: linear-gradient(90deg, #667eea, #764ba2);
}

/* Form Inputs */
.contact-form .form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.contact-form .form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.contact-form label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
}

.contact-form label i {
  color: #667eea;
  margin-right: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid #e8ecf1;
  border-radius: 12px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #fafbfc;
  color: #1a1a2e;
  position: relative;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.08);
}

.form-input.is-filled {
  border-color: #10b981;
}

.form-input::placeholder {
  color: #b2bec3;
}

.form-select {
  appearance: none;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236c7a89' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  font-family: inherit;
}

.input-focus-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: all 0.3s ease;
}

.form-input:focus ~ .input-focus-border {
  width: 100%;
  left: 0;
}

.char-counter {
  text-align: right;
  font-size: 0.75rem;
  color: #9aa5b5;
  margin-top: 0.25rem;
}

/* Form Options */
.form-options {
  margin: 1rem 0 1.5rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #6c7a89;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  border: 2px solid #e8ecf1;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.checkbox-label input:checked + .checkmark {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-size: 0.8rem;
}

/* Submit Button */
.submit-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.35);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.submit-btn:hover:not(:disabled) .btn-arrow {
  transform: translateX(5px);
}

.spinner {
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ============================================
   INFO CARD
   ============================================ */
.info-wrapper {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  border: 1px solid #f0f2f5;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.04);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-header-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.2rem;
}

.info-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
}

.info-header p {
  font-size: 0.85rem;
  color: #6c7a89;
  margin: 0;
}

.info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f2f5;
}

.info-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.info-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.info-text strong {
  display: block;
  font-size: 0.9rem;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.info-text p {
  font-size: 0.9rem;
  color: #6c7a89;
  margin: 0;
  line-height: 1.6;
}

.info-text .text-success { color: #10b981; }
.info-text .text-warning { color: #f59e0b; }
.info-text .text-danger { color: #ef4444; }

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  transition: all 0.3s ease;
}

.map-link:hover {
  gap: 0.75rem;
  color: #764ba2;
}

/* Social Links */
.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background: #f0f2f5;
  color: #6c7a89;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.8rem;
}

.social-link i {
  font-size: 1rem;
}

.social-link:hover {
  transform: translateY(-2px);
  color: white;
}

.social-link.fb:hover { background: #1877f2; }
.social-link.ig:hover { background: #e4405f; }
.social-link.tw:hover { background: #1da1f2; }
.social-link.yt:hover { background: #ff0000; }

.info-cta {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f2f5;
  text-align: center;
}

.cta-icons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.cta-icons i {
  font-size: 1.2rem;
  color: #667eea;
}

.info-cta p {
  font-size: 0.9rem;
  color: #6c7a89;
  margin-bottom: 0.75rem;
}

.call-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.call-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.35);
  color: white;
}

/* Live Chat Card */
.live-chat-card {
  background: linear-gradient(135deg, #fd79a8, #e17055);
  padding: 1.5rem;
  border-radius: 16px;
  color: white;
  text-align: center;
}

.live-chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.live-chat-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ade80;
  animation: blink 1s infinite;
}

.live-chat-card p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.live-chat-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.live-chat-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

/* ============================================
   FAQ SECTION
   ============================================ */
.faq-section {
  padding: 60px 0 80px;
  background: white;
}

.faq-grid {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: #fafbfc;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid #f0f2f5;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #667eea;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  cursor: pointer;
  font-weight: 600;
  color: #1a1a2e;
  transition: all 0.3s ease;
  user-select: none;
}

.faq-question:hover {
  color: #667eea;
}

.faq-icon {
  margin-right: 0.5rem;
}

.faq-question i {
  transition: transform 0.3s ease;
  color: #667eea;
}

.faq-question i.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: #6c7a89;
  line-height: 1.7;
}

.faq-answer p {
  margin: 0;
}

.faq-cta {
  text-align: center;
  margin-top: 2.5rem;
  padding-top: 2.5rem;
  border-top: 1px solid #f0f2f5;
}

.faq-cta p {
  color: #6c7a89;
  margin-bottom: 1rem;
}

.faq-contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 2rem;
  background: linear-gradient(135deg, #fd79a8, #e17055);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.faq-contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.35);
  color: white;
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 992px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .hero-description {
    margin: 0 auto 2rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .hero-image-wrapper {
    max-width: 350px;
  }
  
  .hero-image {
    height: 350px;
  }
  
  .floating-badge-3 {
    display: none;
  }
  
  .form-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .info-wrapper {
    position: static;
  }
  
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 40px 0 30px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-image {
    height: 280px;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .contact-form .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
  
  .form-wrapper {
    padding: 1.5rem;
  }
  
  .info-card {
    padding: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .stat-divider {
    display: none;
  }
  
  .floating-badge {
    padding: 0.5rem 0.8rem;
  }
  
  .floating-badge strong {
    font-size: 0.7rem;
  }
  
  .floating-badge span {
    display: none;
  }
  
  .faq-question {
    padding: 1rem 1.2rem;
    font-size: 0.95rem;
  }
  
  .progress-step .step-label {
    display: none;
  }
  
  .social-link span {
    display: none;
  }
  
  .social-link {
    padding: 0.5rem;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-badge {
    font-size: 0.8rem;
    padding: 0.3rem 1rem;
  }
  
  .hero-image {
    height: 220px;
  }
  
  .contact-card {
    padding: 1.5rem 1rem;
  }
  
  .card-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .submit-btn {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
  
  .form-input {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
  }
  
  .info-item {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-icon {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary-hero,
  .btn-secondary-hero {
    width: 100%;
    justify-content: center;
  }
  
  .live-chat-card {
    padding: 1rem;
  }
  
  .hero-image-wrapper {
    max-width: 280px;
  }
}
</style>