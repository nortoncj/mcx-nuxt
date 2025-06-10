<template>
     <div class="edit-sections">
            <!-- Basic Info -->
            <div class="edit-section">
              <h3>Fundamental Information</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name</label>
                  <input 
                    v-model="profile.name"
                    type="text" 
                    placeholder="Marcus Aurelius"
                  />
                </div>
                <div class="form-group">
                  <label>Professional Title</label>
                  <input 
                    v-model="profile.title"
                    type="text" 
                    placeholder="Senior Consul"
                  />
                </div>
                <div class="form-group">
                  <label>Organization</label>
                  <input 
                    v-model="profile.company"
                    type="text" 
                    placeholder="Augustus & Associates"
                  />
                </div>
                <div class="form-group">
                  <label>Location</label>
                  <input 
                    v-model="profile.location"
                    type="text" 
                    placeholder="Rome, Italia"
                  />
                </div>
                <div class="form-group">
                <label>Email</label>
                <input 
                  v-model="profile.email"
                  type="email" 
                  placeholder="example@mcx.com" 
                  />
                </div>
                <div class="form-group">
                <label>Phone</label>
                <input 
                  v-model="profile.phone"
                  type="tel" 
                  placeholder="+1234567890" 
                  />
                </div>
              </div>
              
              
              
              <div class="form-group">
                <label>Distinguished Motto</label>
                <input 
                  v-model="profile.tagline"
                  type="text" 
                  placeholder="Virtus et Honor - Virtue and Honor"
                />
              </div>
              
              <div class="form-group">
                <label>Professional Narrative</label>
                <textarea 
                  v-model="profile.bio"
                  placeholder="Share your distinguished journey and expertise..."
                  rows="4"
                />
              </div>
            </div>
  
            <!-- Images -->
            <div class="edit-section">
                <h3>Portrait & Imagery</h3>
                <div class="image-uploads">
                <div class="upload-group">
                    <label>Profile Portrait</label>
                    <div class="image-upload-area" @click="openModal('avatar')">
                    <img v-if="profile.avatar" :src="profile.avatar" alt="Avatar" class="uploaded-image" />
                    <div v-else class="upload-placeholder">
                      <Icon name="ri:camera-line" size="24" />
                      <span>Upload Portrait</span>
                    </div>
                    
                    <!-- Remove @click from input -->
                    <input 
                      hidden
                      ref="avatarInput"
                      type="file"
                      @change="handleFileChange('avatar')"
                      accept="image/*"
                    />
                    
                    <button 
                      class="upload-btn"
                      @click.stop="openModal('avatar')"
                    >
                      <Icon name="ri:camera-line" size="16" />
                      {{ profile.avatar ? 'Change' : 'Upload' }}
                    </button>
                  </div>
                </div>
                
                <div class="upload-group">
                    <label>Cover Imagery</label>
                    <div class="image-upload-area cover" @click="openModal('cover')">
                    <img v-if="profile.coverImage" :src="profile.coverImage" alt="Cover" class="uploaded-image" />
                    <div v-else class="upload-placeholder">
                        <Icon name="ri:camera-line" size="24" />
                        <span>Upload Cover</span>
                    </div>
                    <input 
                          ref="coverInput"
                          type="file" 
                          @change="handleFileChange('cover')"
                          accept="image/*"
                          hidden
                      />
                      <button 
                          class="upload-btn"
                          @click.stop="openModal('cover')"
                      >
                          <Icon name="ri:camera-line" size="16" />
                          {{ profile.coverImage ? 'Change' : 'Upload' }}
                      </button>
                    </div>
                </div>
                </div>
            </div>
  
            <!-- Custom Links -->
            <div class="edit-section">
              <div class="section-header">
                <h3>Distinguished Links</h3>
                <button 
                  class="btn-primary small"
                  @click="$emit('show-link-modal')"
                >
                  <Icon name="ri:add-line" size="16" />
                  Add Link
                </button>
              </div>
              
              <div class="links-list">
                <div v-for="link in profile.customLinks" :key="link.id" class="link-item">
                  <div class="link-info">
                    <h4>{{ link.title }}</h4>
                    <p class="link-url">{{ link.url }}</p>
                    <p v-if="link.description" class="link-description">{{ link.description }}</p>
                  </div>
                  <div class="link-actions">
                    <button 
                      class="action-btn"
                      @click="$emit('edit-link', link)"
                    >
                      <Icon name="ri:edit-line" size="14" />
                    </button>
                    <button 
                      class="action-btn delete"
                      @click="$emit('delete-link', link.id)"
                    >
                      <Icon name="ri:delete-bin-line" size="14" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Live Preview Sidebar -->
          <div class="preview-sidebar">
            <div class="preview-header">
              <h4>Live Preview</h4>
              <div class="device-toggle">
                <button 
                  :class="{ active: previewDevice === 'mobile' }"
                  @click="previewDevice = 'mobile'"
                >
                  <Icon name="ri:smartphone-line" size="16" />
                </button>
                <button 
                  :class="{ active: previewDevice === 'desktop' }"
                  @click="previewDevice = 'desktop'"
                >
                  <Icon name="ri:computer-line" size="16" />
                </button>
              </div>
            </div>
            <div :class="['preview-container', previewDevice]">
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
                      <span class="stat-number">{{ profile.stats.totalViews.toLocaleString() }}</span>
                      <span class="stat-label">Views</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">{{ profile.stats.connections }}</span>
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
                    
                  </button>
                  <button class="action-btn secondary">
                    <Icon name="ri:download-line" size="16" />
                    
                  </button>
                </div>
  
                <!-- Social Links -->
                <div v-if="profile.socialLinks.length > 0" class="social-section">
                  <h3>Connect With Me</h3>
                  <div class="social-grid">
                    <a v-for="link in profile.socialLinks" :key="link.id" :href="link.url" class="social-link " >
                      <Icon :name="link.icon" size="20" />
                      <span>{{ link.label }}</span>
                    </a>
                  </div>
                </div>
  
                <!-- Custom Links -->
                <div v-if="profile.customLinks.length > 0" class="links-section">
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
import { ref, reactive, computed } from 'vue'

// Props
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  themes: {
    type: Array,
    required: true
    }
})

// Emits
const emit = defineEmits(['update', 'edit-link', 'delete-link','show-link-modal' ,'show-image-modal'])

// Modal state
// const showModal = ref(false)
// const modalType = ref('')

// Methods
const openModal = (type) => {
  emit('show-image-modal', type)
}



// Computed
const currentTheme = computed(() => {
  return props.themes.find(t => t.id === props.profile.theme)
})

const handleFileChange = (type) => {
  // This handles the file input change if you need it for other purposes
  // But the main upload should happen through your Modal component
  console.log(`File selected for ${type}`)
}
</script>
<style scoped>
@import "~/assets/css/account/profile.css";
</style>