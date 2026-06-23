<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <!-- About Section -->
        <div class="footer-section">
          <h3>TrafficBot.uk</h3>
          <p class="footer-address">
            6A Hampstead High Street<br>
            NW3 1PR, London, UK
          </p>
          <p class="footer-contact">
            <i class="fas fa-phone"></i> +44 7858 10 20 81<br>
            <i class="fas fa-envelope"></i> support@trafficbot.uk
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3>Links</h3>
          <ul class="footer-links">
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Support Forum</a></li>
            <li><a href="#">Free Trial</a></li>
          </ul>
        </div>

        <!-- Company Links -->
        <div class="footer-section">
          <h3>Links</h3>
          <ul class="footer-links">
            <li><a href="#">Careers</a></li>
            <li><a href="#">Our Blog</a></li>
            <li><a href="#">Affiliates</a></li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div class="footer-section">
          <h3>Links</h3>
          <ul class="footer-links">
            <li><a href="#">EULA</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p>TrafficBot® End User License Agreement Privacy Policy Terms & Conditions</p>
        <p class="footer-copyright">© 2026 TrafficBot.uk. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No additional logic needed for static footer
</script>

<style scoped>
.footer {
  background: #1a1a2e;
  color: #ffffff;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.footer-address {
  color: #a0a0a0;
  line-height: 1.8;
  margin-bottom: 15px;
}

.footer-contact {
  color: #a0a0a0;
  line-height: 2;
}

.footer-contact i {
  width: 24px;
  color: #ff6b6b;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #a0a0a0;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: #ff6b6b;
  padding-left: 5px;
}

.footer-bottom {
  padding-top: 20px;
  text-align: center;
}

.footer-bottom p {
  color: #a0a0a0;
  font-size: 0.85rem;
  margin-bottom: 5px;
}

.footer-copyright {
  margin-top: 10px;
  color: #6c6c7a;
  font-size: 0.8rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 576px) {
  .footer {
    padding: 40px 0 20px;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 25px;
    text-align: center;
  }
  
  .footer-section h3 {
    margin-bottom: 15px;
  }
  
  .footer-links a:hover {
    padding-left: 0;
  }
}
</style>