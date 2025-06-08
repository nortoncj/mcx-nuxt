<template>
<div class="body-container">
    <nav class="sidebar">
        <div class="logo">MCX</div>
        <ul class="nav-menu">
            <li class="nav-item">
                <a href="#" class="nav-link active">
                    <span class="nav-icon"></span>
                    Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link ">
                    <span class="nav-icon"></span>
                    Profile
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span class="nav-icon"></span>
                    Cards
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span class="nav-icon"></span>
                    Products
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span class="nav-icon"></span>
                    Users
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span class="nav-icon"></span>
                    Analytics
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <span class="nav-icon"></span>
                    Settings
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link ">
                    <span class="nav-icon"></span>
                    Security
                </a>
            </li>
        </ul>
    </nav>
    
    <main class="main-content">
        <header class="header">
        <h1 class="page-title">OVERVIEW</h1>
        <button @click="toggleMobileMenu" class="menu-toggle" :class="{ active: isMobileMenuOpen }">
          {{ isMobileMenuOpen ? '✕' : '☰' }}
        </button>
      </header>
  
      <!-- Mobile Menu Overlay -->
      <Transition name="fade">
        <div 
          v-show="isMobileMenuOpen"
          class="mobile-menu-overlay"
          @click="closeMobileMenu"
        ></div>
      </Transition>
  
      <!-- Mobile Menu -->
      <Transition name="slide">
        <div v-show="isMobileMenuOpen" class="mobile-menu">
          <div class="mobile-menu-header">
            <h3>MCX Admin Menu</h3>
            <button @click="closeMobileMenu" class="close-btn">✕</button>
          </div>
          <nav class="mobile-menu-nav">
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              🧑‍🧒  Profile
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              📊 Dashboard
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              👥 Users
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              💳 Cards
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              📦 Products
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              📈 Analytics
            </a>
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              ⚙️ Settings
            </a>
            
            <a href="#" @click="closeMobileMenu" class="mobile-menu-item">
              🔒 Security
            </a>
          </nav>
          <div class="mobile-menu-footer">
            <div class="user-info">
              <div class="user-avatar">👤</div>
              <div class="user-details">
                <div class="user-name">Admin User</div>
                <div class="user-role">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
        <slot />
    </main>
        
    </div>
    </template>
    <script setup>
import { onMounted } from "vue";
import {useDashboard} from "~/assets/js/admin.js";

// Menu toggle state
const isMobileMenuOpen = ref(false)
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    console.log('Mobile menu toggled:', isMobileMenuOpen.value)
  }
  
  const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
  }

// onMounted(() => {
//     const dashboard = new useDashboard();
//     console.log("Dashboard init", dashboard);
// });

    </script>
    <style scoped>
    @import "~/assets/css/admin/admin.css";

    /* Mobile Menu Styles */
  
  
  .menu-toggle:hover {
    background: rgba(196, 161, 0, 0.1);
    transform: scale(1.05);
  }
  
  .menu-toggle.active {
    background: #c4a100;
    color: #000;
    transform: rotate(90deg);
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100vh;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border-left: 3px solid #c4a100;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
  }
  
  .mobile-menu-header {
    padding: 2rem;
    border-bottom: 1px solid rgba(196, 161, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .mobile-menu-header h3 {
    color: #c4a100;
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0;
    font-family:"Cinzel";
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #c4a100;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .close-btn:hover {
    background: rgba(196, 161, 0, 0.1);
    transform: rotate(90deg);
  }
  
  .mobile-menu-nav {
    flex: 1;
    padding: 1rem 0;
    overflow-y: auto;
  }
  
  .mobile-menu-item {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.3s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 1.1rem;
  }
  
  .mobile-menu-item:hover {
    background: rgba(196, 161, 0, 0.1);
    color: #c4a100;
    padding-left: 2.5rem;
  }
  
  .mobile-menu-footer {
    padding: 2rem;
    border-top: 1px solid rgba(196, 161, 0, 0.2);
  }

  /* Mobile responsive */
  @media (min-width: 769px) {
    .menu-toggle {
      display: none;
    }
    
    .mobile-menu,
    .mobile-menu-overlay {
      display: none !important;
    }
  }
  
  @media (max-width: 768px) {
    .mobile-menu {
      width: 100vw;
    }
    
    .header {
      padding: 1rem;
    }
    
    .page-title {
      font-size: 1.5rem;
    }
  }
</style>