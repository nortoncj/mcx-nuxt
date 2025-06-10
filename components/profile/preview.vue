<template>
    <div class="preview-controls">
      <div class="device-toggle">
        <button 
          :class="{ active: previewDevice === 'mobile' }"
          @click="previewDevice = 'mobile'"
        >
          <Icon name="ri:smartphone-line" size="16" />
          Mobile
        </button>
        <button 
          :class="{ active: previewDevice === 'desktop' }"
          @click="previewDevice = 'desktop'"
        >
          <Icon name="ri:computer-line" size="16" />
          Desktop
        </button>
      </div>
      
      <div class="preview-actions">
        <button 
          class="btn-secondary"
          @click="copyToClipboard('https://mcx.cards/your-profile', 'url')"
        >
          <Icon :name="copied === 'url' ? 'ri:check-line' : 'ri:file-copy-line'" size="16" />
          {{ copied === 'url' ? 'Copied!' : 'Copy Link' }}
        </button>
        <button class="btn-primary">
          <Icon name="ri:share-line" size="16" />
          Share Profile
        </button>
      </div>
    </div>
    
    <div :class="['full-preview-container', previewDevice]">
      <!-- Profile Preview Inline -->
      <div 
        class="profile-preview"
        :style="{ 
          backgroundColor: currentTheme.bg,
          color: currentTheme.text,
          '--primary-color': currentTheme.primary,
          '--accent-color': currentTheme.accent
        }"
      >
        <!-- Cover Image -->
        <div v-if="profile.coverImage" class="cover-section">
          <img :src="profile.coverImage" alt="Cover" class="cover-image" />
          <div class="cover-overlay"></div>
        </div>
        
        <!-- Profile Header -->
        <div class="profile-header">
          <div class="avatar-section">
            <img v-if="profile.avatar" :src="profile.avatar" :alt="profile.name" class="avatar-large" />
            <div v-else class="avatar-placeholder">
              <Icon name="ri:user-line" size="32" />
            </div>
            <div class="verification-badge">
              <Icon name="ri:shield-check-line" size="16" />
            </div>
          </div>
          
          <div class="profile-info">
            <h1 class="profile-name">{{ profile.name }}</h1>
            <p class="profile-title">{{ profile.title }}</p>
            <p class="profile-company">{{ profile.company }}</p>
            <p v-if="profile.tagline" class="profile-tagline">"{{ profile.tagline }}"</p>
            <div v-if="profile.location" class="profile-location">
              <Icon name="ri:map-pin-line" size="14" />
              <span>{{ profile.location }}</span>
            </div>
          </div>
          
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-number">{{ profile.stats?.totalViews?.toLocaleString() || '0' }}</span>
              <span class="stat-label">Views</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ profile.stats?.connections || '0' }}</span>
              <span class="stat-label">Connections</span>
            </div>
          </div>
        </div>
  
        <!-- Bio Section -->
        <div v-if="profile.bio" class="bio-section">
          <p>{{ profile.bio }}</p>
        </div>
  
        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="action-btn primary">
            <Icon name="ri:phone-line" size="20" />
            Call
          </button>
          <button class="action-btn secondary">
            <Icon name="ri:mail-line" size="20" />
            Email
          </button>
          <button class="action-btn secondary">
            <Icon name="ri:download-line" size="20" />
            Download
          </button>
        </div>
  
        <!-- Social Links -->
        <div v-if="profile.socialLinks?.length > 0" class="social-section">
          <h3>Connect With Me</h3>
          <div class="social-grid">
            <a v-for="link in profile.socialLinks" :key="link.id" :href="link.url" class="social-link">
              <Icon :name="link.icon" size="20" />
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>
  
        <!-- Custom Links -->
        <div v-if="profile.customLinks?.length > 0" class="links-section">
          <h3>Distinguished Resources</h3>
          <div class="custom-links">
            <a v-for="link in profile.customLinks" :key="link.id" :href="link.url" class="custom-link">
              <div class="link-content">
                <h4>{{ link.title }}</h4>
                <p v-if="link.description">{{ link.description }}</p>
              </div>
              <Icon name="ri:external-link-line" size="16" />
            </a>
          </div>
        </div>
  
        <!-- MCX Branding -->
        <div class="mcx-branding">
          <div class="mcx-logo">MCX</div>
          <p>Powered by MCX Digital Cards</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Props
  const props = defineProps({
    profile: {
      type: Object,
      required: true
    },
    themes: {
      type: Array,
      default: () => []
    },
    layouts: {
      type: Array,
      default: () => []
    }
  })
  
  // Emits
  const emit = defineEmits(['copy',])
  
  // Reactive data
  const previewDevice = ref('desktop')
  const copied = ref('')
  
  // Methods
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = type
      
      // Reset after 2 seconds
      setTimeout(() => {
        copied.value = ''
      }, 2000)
      
      // Emit to parent if needed
      emit('copy', { text, type })
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const currentTheme = computed(() => {
  return props.themes.find(theme => theme.id === props.profile.theme) || 
         props.themes[0] || 
         {
           bg: '#ffffff',
           text: '#000000',
           primary: '#007bff',
           accent: '#6c757d'
         }
})
  </script>
  
  <style scoped>
  @import "~/assets/css/account/profile.css";
  </style>