<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Le projet', path: '#solution' },
  { label: 'Fonctionnalités', path: '#fonctionnalité' },
  { label: 'Design', path: '#démarche' },
  { label: 'Prototype', path: '#video-section' },
  { label: 'Contact', path: '/contact' }
];

const handleNavClick = (path) => {
  if (path.startsWith('#')) {
    const element = document.querySelector(path);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    router.push(path);
  }
};
</script>

<template>
  <header class="header">
    <div class="header-container">
      <!-- Logo -->
      <div class="logo">
        <img src="/logo.svg" alt="Reflet Logo" class="logo-icon">
      </div>

      <!-- Navigation Menu -->
      <nav class="nav-menu">
        <a 
          v-for="item in navItems" 
          :key="item.label"
          :href="item.path"
          class="nav-item"
          @click.prevent="handleNavClick(item.path)"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- Action Buttons -->
      <div class="header-actions">
        <button class="btn-primary">Achetez Reflet</button>

      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  background-color:#E7F1E2;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-icon {
  height: 40px;
  width: auto;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: center;
  margin: 0 2rem;
  color: var(--first-color);
}

.nav-item {
  color: var(--grey-dark);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.3s ease;
  cursor: pointer;
}

.nav-item:hover {
  color: var(--primary-color);
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btn-primary {
  background-color: var(--third-color);
  color: var(--white);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-icon {
  background-color: transparent;
  border: 2px solid var(--primary-color);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-icon:hover {
  background-color: var(--primary-color);
  color: var(--white);
}

@media (max-width: 1024px) {
  .nav-menu {
    gap: 1.5rem;
    margin: 0 1rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .btn-primary {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    gap: 1rem;
    margin: 0;
    justify-content: flex-start;
  }

  .nav-item {
    font-size: 0.85rem;
  }

  .header-actions {
    gap: 0.5rem;
  }

  .btn-primary {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 0.75rem 0.5rem;
    gap: 0.5rem;
  }

  .logo-icon {
    height: 32px;
  }

  .nav-menu {
    gap: 0.5rem;
    justify-content: flex-start;
    overflow-x: auto;
    flex-wrap: nowrap;
    order: 3;
    width: 100%;
    padding: 0.5rem 0;
  }

  .nav-item {
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .header-actions {
    gap: 0.25rem;
  }

  .btn-primary {
    padding: 0.4rem 0.8rem;
    font-size: 0.75rem;
  }
}
</style>