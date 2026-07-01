<template>
  <div class="about-page">
    <!-- Hero Section - Premium -->
    <section class="about-hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <div class="hero-badge">
              <span class="badge-dot"></span>
              ✨ About Us
            </div>
            <h1 class="hero-title">
              Your Trusted
              <span class="gradient-text">Beauty Destination</span>
            </h1>
            <p class="hero-description">
              Discover the story behind our passion for quality beauty products
            </p>
            <div class="hero-stats">
              <div class="stat-item">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Happy Customers</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">4.9★</span>
                <span class="stat-label">Average Rating</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">500+</span>
                <span class="stat-label">Products</span>
              </div>
            </div>
            <div class="hero-actions">
              <router-link to="/products" class="btn-primary-hero">
                <i class="fas fa-shopping-bag"></i>
                Shop Now
                <span class="btn-arrow">→</span>
              </router-link>
              <router-link to="/contact" class="btn-secondary-hero">
                <i class="fas fa-envelope"></i>
                Contact Us
              </router-link>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-image-wrapper">
              <div class="hero-image-container">
                <img 
                  src="https://i.pinimg.com/736x/b1/9c/2e/b19c2e1141b37ce25c211e29dfe28cbb.jpg"
                  alt="Customer Support Team"
                  class="hero-image"
                  @error="handleImageError"
                >
                
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

    <!-- Mission & Vision -->
    <section class="mission-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Our Foundation</span>
          <h2 class="section-title">Mission, Vision & Promise</h2>
          <p class="section-subtitle">The core principles that drive everything we do</p>
        </div>
        <div class="mission-grid">
          <div class="mission-card">
            <div class="mission-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h4>Our Mission</h4>
            <p>To provide high-quality beauty products that enhance natural beauty and boost confidence.</p>
            <div class="mission-hover"></div>
          </div>
          <div class="mission-card">
            <div class="mission-icon">
              <i class="fas fa-eye"></i>
            </div>
            <h4>Our Vision</h4>
            <p>To become the most trusted beauty destination worldwide, known for quality and innovation.</p>
            <div class="mission-hover"></div>
          </div>
          <div class="mission-card">
            <div class="mission-icon">
              <i class="fas fa-heart"></i>
            </div>
            <h4>Our Promise</h4>
            <p>100% authentic products, exceptional customer service, and a seamless shopping experience.</p>
            <div class="mission-hover"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="story-section">
      <div class="container">
        <div class="story-grid">
          <div class="story-image-wrapper">
            <div class="story-image-container">
              <img 
                src="https://i.pinimg.com/736x/a2/2c/81/a22c815e6151ae856f81fd14433bf98c.jpg" 
                class="story-image"
                alt="Our Story"
                @error="handleImageError"
              >
              <div class="story-experience-badge">
                <span class="experience-number">2024</span>
                <span class="experience-label">Founded</span>
              </div>
            </div>
          </div>
          <div class="story-content">
            <span class="section-tag">Our Story</span>
            <h2 class="section-title">The Journey of<br>Our Beauty Shop</h2>
            <p class="story-text">Founded in 2024, our shop was created with a simple mission: to provide quality products at affordable prices with exceptional customer service.</p>
            <p class="story-text">What started as a small passion project has grown into a trusted beauty destination. We believe that everyone deserves access to high-quality beauty products that make them feel confident and beautiful.</p>
            <div class="story-stats">
              <div class="story-stat">
                <span class="stat-number">2024</span>
                <span class="stat-label">Founded</span>
              </div>
              <div class="story-stat">
                <span class="stat-number">50+</span>
                <span class="stat-label">Brands</span>
              </div>
              <div class="story-stat">
                <span class="stat-number">1000+</span>
                <span class="stat-label">Products</span>
              </div>
              <div class="story-stat">
                <span class="stat-number">10K+</span>
                <span class="stat-label">Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="values-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Core Values</span>
          <h2 class="section-title">What We Stand For</h2>
          <p class="section-subtitle">The principles that guide everything we do</p>
        </div>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <h5>Quality Products</h5>
            <p>We carefully select every product to ensure premium quality</p>
            <div class="value-hover"></div>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-smile"></i>
            </div>
            <h5>Customer Satisfaction</h5>
            <p>Your happiness is our top priority</p>
            <div class="value-hover"></div>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-truck"></i>
            </div>
            <h5>Fast Delivery</h5>
            <p>Quick shipping to your doorstep</p>
            <div class="value-hover"></div>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <i class="fas fa-lock"></i>
            </div>
            <h5>Secure Shopping</h5>
            <p>100% secure payment and data protection</p>
            <div class="value-hover"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="why-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Why Choose Us</span>
          <h2 class="section-title">What Makes Us Different</h2>
          <p class="section-subtitle">Experience the difference with our premium service</p>
        </div>
        <div class="why-grid">
          <div class="why-card">
            <div class="why-number">01</div>
            <div class="why-content">
              <h5>Curated Selection</h5>
              <p>We handpick every product to ensure only the best quality reaches you.</p>
            </div>
          </div>
          <div class="why-card">
            <div class="why-number">02</div>
            <div class="why-content">
              <h5>Expert Advice</h5>
              <p>Our beauty experts are here to help you find the perfect products.</p>
            </div>
          </div>
          <div class="why-card">
            <div class="why-number">03</div>
            <div class="why-content">
              <h5>Competitive Prices</h5>
              <p>Premium quality at affordable prices, with regular discounts and deals.</p>
            </div>
          </div>
          <div class="why-card">
            <div class="why-number">04</div>
            <div class="why-content">
              <h5>Secure Payments</h5>
              <p>Multiple payment options with 100% security guarantee.</p>
            </div>
          </div>
          <div class="why-card">
            <div class="why-number">05</div>
            <div class="why-content">
              <h5>Fast Shipping</h5>
              <p>Quick delivery with real-time tracking so you know when to expect your order.</p>
            </div>
          </div>
          <div class="why-card">
            <div class="why-number">06</div>
            <div class="why-content">
              <h5>Easy Returns</h5>
              <p>Hassle-free returns within 30 days if you're not completely satisfied.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Our Team</span>
          <h2 class="section-title">Meet Our Beauty Experts</h2>
          <p class="section-subtitle">The passionate people behind your beauty experience</p>
        </div>
        <div class="team-grid">
          <div class="team-card">
            <div class="team-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/a2/2c/81/a22c815e6151ae856f81fd14433bf98c.jpg" 
                class="team-image"
                alt="Team Member"
                @error="handleTeamImageError"
              >
              <div class="team-social">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <h5>Sarah Johnson</h5>
            <p>Founder & CEO</p>
          </div>
          <div class="team-card">
            <div class="team-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/a2/2c/81/a22c815e6151ae856f81fd14433bf98c.jpg" 
                class="team-image"
                alt="Team Member"
                @error="handleTeamImageError"
              >
              <div class="team-social">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <h5>Michael Chen</h5>
            <p>Head of Operations</p>
          </div>
          <div class="team-card">
            <div class="team-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/a2/2c/81/a22c815e6151ae856f81fd14433bf98c.jpg" 
                class="team-image"
                alt="Team Member"
                @error="handleTeamImageError"
              >
              <div class="team-social">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <h5>Emily Davis</h5>
            <p>Customer Service Lead</p>
          </div>
          <div class="team-card">
            <div class="team-image-wrapper">
              <img 
                src="https://i.pinimg.com/736x/a2/2c/81/a22c815e6151ae856f81fd14433bf98c.jpg" 
                class="team-image"
                alt="Team Member"
                @error="handleTeamImageError"
              >
              <div class="team-social">
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
              </div>
            </div>
            <h5>Lisa Park</h5>
            <p>Marketing Director</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-tag">Testimonials</span>
          <h2 class="section-title">What Our Customers Say</h2>
          <p class="section-subtitle">Real stories from real customers who love our products</p>
        </div>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>"Amazing quality products! The shipping was fast and the customer service was exceptional. Highly recommend!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>JM</span>
              </div>
              <div class="author-info">
                <strong>Jessica M.</strong>
                <span>⭐ Verified Buyer</span>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>"I love shopping here! The products are authentic and the prices are unbeatable. My go-to beauty shop."</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>DR</span>
              </div>
              <div class="author-info">
                <strong>David R.</strong>
                <span>⭐ Verified Buyer</span>
              </div>
            </div>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            <p>"The best beauty store online! Great selection, fast delivery, and amazing customer support. 10/10 experience!"</p>
            <div class="testimonial-author">
              <div class="author-avatar">
                <span>SL</span>
              </div>
              <div class="author-info">
                <strong>Sophia L.</strong>
                <span>⭐ Verified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-box">
          <div class="cta-content">
            <span class="cta-tag">Ready to Shop?</span>
            <h2 style="background: linear-gradient(135deg, #fd79a8, #e17055); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 2.5rem; font-weight: bold;">Start Your Beauty Journey Today</h2>

            <p>Join thousands of satisfied customers and discover the difference</p>
            <div class="cta-actions">
              <router-link to="/products" class="btn-primary-cta">
                <i class="fas fa-shopping-bag"></i>
                Shop Now
                <span class="btn-arrow">→</span>
              </router-link>
              <router-link to="/contact" style="color:black" class="btn-secondary-cta">
                <i class="fas fa-envelope"></i>
                Contact Us
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/600x400/ff6b6b/ffffff?text=About+Us'
}

const handleTeamImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = 'https://via.placeholder.com/300x300/ff6b6b/ffffff?text=Team'
}
</script>

<style scoped>
/* ============================================
   GLOBAL
   ============================================ */
.about-page {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
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

.text-center .section-subtitle {
  margin: 0 auto;
}

/* ============================================
   HERO SECTION WITH FLOATING CARDS
   ============================================ */
.about-hero {
  padding: 80px 0 100px;
  background: linear-gradient(160deg, #fef6f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
  position: relative;
  overflow: hidden;
  min-height: 600px;
}

.about-hero::before {
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

.about-hero::after {
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
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  color: #1a1a2e;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #d466ea 0%, #764ba2 40%, #f093fb 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.2rem;
  color: #6c7a89;
  max-width: 480px;
  line-height: 1.7;
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 1rem 0;
  border-top: 2px solid rgba(0, 0, 0, 0.04);
  border-bottom: 2px solid rgba(0, 0, 0, 0.04);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(102, 126, 234, 0.2);
}

.btn-secondary-hero:hover {
  background: white;
  border-color: #667eea;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  color: #1a1a2e;
}

/* Hero Image Container with Floating Cards */
.hero-visual {
  position: relative;
}

.hero-image-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
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
  display: block;
  transition: transform 0.5s ease;
}

.hero-image-container:hover .hero-image {
  transform: scale(1.03);
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
  0%, 100% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-12px) translateX(3px); }
}

/* ============================================
   MISSION SECTION
   ============================================ */
.mission-section {
  padding: 80px 0;
  background: white;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.mission-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f2f5;
}

.mission-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.mission-hover {
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

.mission-card:hover .mission-hover {
  opacity: 1;
}

.mission-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 50%;
  font-size: 2rem;
  color: #667eea;
  position: relative;
  z-index: 1;
}

.mission-card h4 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.75rem;
  position: relative;
  z-index: 1;
}

.mission-card p {
  color: #6c7a89;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* ============================================
   STORY SECTION
   ============================================ */
.story-section {
  padding: 80px 0;
  background: #fafbff;
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.story-image-wrapper {
  position: relative;
}

.story-image-container {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
}

.story-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.story-image-container:hover .story-image {
  transform: scale(1.02);
}

.story-experience-badge {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.experience-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: #667eea;
}

.experience-label {
  font-size: 0.8rem;
  color: #6c7a89;
  font-weight: 500;
}

.story-content .section-tag {
  margin-bottom: 0.75rem;
}

.story-content .section-title {
  margin-bottom: 1.5rem;
}

.story-text {
  color: #6c7a89;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.story-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.story-stat {
  text-align: center;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.story-stat .stat-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #1a1a2e;
  display: block;
}

.story-stat .stat-label {
  font-size: 0.75rem;
  color: #9aa5b5;
  font-weight: 500;
}

/* ============================================
   VALUES SECTION
   ============================================ */
.values-section {
  padding: 80px 0;
  background: white;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.value-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  border: 1px solid #f0f2f5;
}

.value-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.value-hover {
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

.value-card:hover .value-hover {
  opacity: 1;
}

.value-icon {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.value-card h5 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 1;
}

.value-card p {
  font-size: 0.9rem;
  color: #6c7a89;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

/* ============================================
   WHY SECTION
   ============================================ */
.why-section {
  padding: 80px 0;
  background: #fafbff;
}

.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.why-card {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

.why-card:hover {
  transform: translateX(8px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}

.why-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
  opacity: 0.3;
  min-width: 50px;
  line-height: 1;
}

.why-content h5 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.why-content p {
  font-size: 0.9rem;
  color: #6c7a89;
  line-height: 1.6;
}

/* ============================================
   TEAM SECTION
   ============================================ */
.team-section {
  padding: 80px 0;
  background: white;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.team-card {
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.team-card:hover {
  transform: translateY(-8px);
}

.team-image-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
}

.team-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.team-card:hover .team-image {
  transform: scale(1.05);
}

.team-social {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  padding: 1.5rem 0 0.5rem;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.team-card:hover .team-social {
  opacity: 1;
  transform: translateY(0);
}

.team-social a {
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.team-social a:hover {
  background: white;
  color: #667eea;
  transform: scale(1.1);
}

.team-card h5 {
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 0.25rem;
}

.team-card p {
  color: #6c7a89;
  font-size: 0.9rem;
}

/* ============================================
   TESTIMONIALS SECTION
   ============================================ */
.testimonials-section {
  padding: 80px 0;
  background: #fafbff;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.testimonial-card {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.testimonial-stars {
  margin-bottom: 1rem;
}

.testimonial-stars i {
  color: #fdcb6e;
  font-size: 0.9rem;
  margin-right: 2px;
}

.testimonial-card p {
  color: #2d3436;
  line-height: 1.8;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f2f5;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info strong {
  font-size: 0.95rem;
  color: #1a1a2e;
}

.author-info span {
  font-size: 0.8rem;
  color: #9aa5b5;
}

/* ============================================
   CTA SECTION
   ============================================ */
.cta-section {
  padding: 80px 0;
    background: linear-gradient(160deg, #fff5f7 0%, #fce4ec 20%, #f3e8ff 50%, #eef2ff 80%, #f0f0ff 100%);
}

.cta-box {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-tag {
  display: inline-block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #667eea;
  background: rgba(102, 126, 234, 0.15);
  padding: 0.3rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.75rem;
}

.cta-content p {
  color: #b2bec3;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 25px rgba(102, 126, 234, 0.35);
}

.btn-primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 40px rgba(102, 126, 234, 0.5);
  color: white;
}

.btn-secondary-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  color: white;
  border-radius: 60px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary-cta:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* ============================================
   RESPONSIVE
   ============================================ */
@media (max-width: 1200px) {
  .values-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

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
  
  .hero-actions {
    justify-content: center;
  }
  
  .hero-image-container {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .floating-card-3 {
    display: none;
  }
  
  .story-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .story-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .mission-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .why-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }
  
  .hero-image {
    height: 300px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .floating-card {
    padding: 0.5rem 0.8rem;
  }
  
  .floating-card i {
    font-size: 1rem;
  }
  
  .floating-card strong {
    font-size: 0.8rem;
  }
  
  .floating-card span {
    display: none;
  }
  
  .floating-card-1 {
    top: 5%;
    right: -2%;
  }
  
  .floating-card-2 {
    bottom: 10%;
    left: -2%;
  }
  
  .values-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .why-grid {
    grid-template-columns: 1fr;
  }
  
  .team-grid {
    grid-template-columns: 1fr;
    max-width: 300px;
    margin: 0 auto;
  }
  
  .story-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary-cta,
  .btn-secondary-cta {
    width: 100%;
    justify-content: center;
  }
  
  .hero-stats {
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  .stat-divider {
    display: none;
  }
}

@media (max-width: 576px) {
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-image {
    height: 220px;
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
  
  .story-experience-badge {
    padding: 1rem 1.5rem;
  }
  
  .experience-number {
    font-size: 1.5rem;
  }
  
  .floating-card-1,
  .floating-card-2 {
    display: none;
  }
}
</style>