<script>
</script>
<template>
        <footer id="footer">
        <div class="footer-content">
            <div class="footer-section footer-logo">
                <div class="logo-container">
                    <img src="/logo.svg" alt="Logo Reflet" class="footer-logo-img">
                </div>
                <p>Projet de fin d'année DNMADE<br>Salima, Clément, Tristan, Nathan, Angélique</p>
            </div>

            <div class="footer-section">
                <h4>Navigation</h4>
                <ul>
                    <li><a href="#presentation">À propos</a></li>
                    <li><a href="#fonctionnalité">Le projet</a></li>
                    <li><a href="#fonctionnement">Fonctionnalités</a></li>
                    <li><a href="#solution">Design</a></li>
                    <li><a href="#démarche">Prototype</a></li>
                    <li><a href="#video-section">Contact</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Ressources</h4>
                <ul>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Démarche</a></li>
                    <li><a href="#">Accessibilités</a></li>
                    <li><a href="#">Mentions légales</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h4>Nous contacter</h4>
                <p><a href="mailto:hello@reflet-project.com">hello@reflet-project.com</a></p>
                <div class="social-icons">
                    <a href="#" class="social-icon">
                      <img src="/RS/ig.svg" alt="Twitter" style="width: 16px; height: 16px;">
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/RS/Youtube.svg" alt="Facebook" style="width: 16px; height: 16px;">
                    </a>
                    <a href="#" class="social-icon">
                      <img src="/RS/Twitter.svg" alt="Instagram" style="width: 16px; height: 16px;">
                    </a>
                </div>
            </div>
        </div>
    </footer>

</template>
<style scoped>
#footer {
  background-image: url('/bg_footer.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 60px 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1.5fr 1.5fr 1.5fr;
  gap: 50px;
  align-items: start;
}

.footer-section h4 {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  color: #333;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section ul li {
  margin-bottom: 12px;
}

.footer-section a {
  color: #666;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #5B7BA8;
}

.footer-logo {
  padding-top: 0;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.footer-logo-img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.logo-container h3 {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  color: #333;
  letter-spacing: 2px;
}

.footer-section > p {
  font-size: 12px;
  color: #888;
  line-height: 1.6;
  margin: 0;
}

.footer-section > p a {
  color: #5B7BA8;
  text-decoration: none;
}

.footer-section > p a:hover {
  text-decoration: underline;
}

.social-icons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.social-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #5B7BA8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  cursor: pointer;
}

.social-icon:hover {
  background: #4a6a94;
}

@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 640px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  #footer {
    padding: 40px 20px;
  }
}
</style>