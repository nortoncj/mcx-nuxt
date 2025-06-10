<template>
  <!-- Layout Selection -->
  <div class="design-section">
    <h3>Distinguished Layouts</h3>
    
    <div class="layout-grid">
      <div 
        v-for="layout in layouts" 
        :key="layout.id"
        :class="['layout-card', { selected: selectedLayout === layout.id }]"
        @click="selectLayout(layout.id)"
      >
        <Icon :name="layout.icon" size="24" />
        <h4>{{ layout.name }}</h4>
        <p>{{ layout.preview }}</p>
      </div>
    </div>
  </div>

  <!-- Theme Selection -->
  <div class="design-section">
    <h3>Imperial Themes</h3>
    <div class="theme-grid">
      <div 
        v-for="theme in themes" 
        :key="theme.id"
        :class="['theme-card', { selected: profile.theme === theme.id }]"
        @click="selectTheme(theme.id)"
      >
        <div class="theme-preview">
          <div 
            class="theme-bg" 
            :style="{ backgroundColor: theme.bg }"
          ></div>
          <div 
            class="theme-accent" 
            :style="{ backgroundColor: theme.primary }"
          ></div>
        </div>
        <span>{{ theme.name }}</span>
      </div>
    </div>
  </div>

  <!-- Live Preview -->
  <div class="design-preview">
    <h3>Preview</h3>
    <div class="preview-container mobile">
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
            <Icon name="ri:phone-line" size="16" />
            Call
          </button>
          <button class="action-btn secondary">
            <Icon name="ri:mail-line" size="16" />
            Email
          </button>
          <button class="action-btn secondary">
            <Icon name="ri:download-line" size="16" />
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  themes: {
    type: Array,
    required: true
  },
  layouts: {
    type: Array,
    required: true
  }
})

// Emits - These define what events this component can send to its parent
const emit = defineEmits(['select-layout', 'select-theme'])

// Reactive data
const selectedLayout = ref('classic') // Default layout

// Methods
const selectLayout = (layoutId) => {
  selectedLayout.value = layoutId
  // 🔥 EMIT: Send 'select-layout' event to parent with layoutId as payload
  emit('select-layout', layoutId)
}

const selectTheme = (themeId) => {
  // 🔥 EMIT: Send 'select-theme' event to parent with themeId as payload
  emit('select-theme', themeId)
}

// Computed properties
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