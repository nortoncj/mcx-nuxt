<template>
    <div class="mcx-profile-builder">
      <!-- Header -->
      <div class="builder-header">
        <div class="header-content">
          <div class="header-info">
            <h1>MCX Profile Builder</h1>
            <p>Craft your distinguished digital presence</p>
          </div>
          <div class="header-actions">
            <button class="btn-secondary">
              <Icon name="ri:qr-code-line" size="16" />
              QR Code
            </button>
            <button class="btn-secondary">
              <Icon name="ri:share-line" size="16" />
              Share
            </button>
            <button class="btn-primary">
              <Icon name="ri:eye-line" size="16" />
              Publish
            </button>
          </div>
        </div>
        
        <!-- Navigation Tabs -->
        <div class="tab-navigation">
          <button 
            :class="['tab', { active: activeTab === 'edit' }]"
            @click="activeTab = 'edit'"
          >
            <Icon name="ri:edit-line" size="16" />
            Edit Profile
          </button>
          <button 
            :class="['tab', { active: activeTab === 'design' }]"
            @click="activeTab = 'design'"
          >
            <Icon name="ri:palette-line" size="16" />
            Design
          </button>
          <button 
            :class="['tab', { active: activeTab === 'preview' }]"
            @click="activeTab = 'preview'"
          >
            <Icon name="ri:eye-line" size="16" />
            Preview
          </button>
          <button 
            :class="['tab', { active: activeTab === 'analytics' }]"
            @click="activeTab = 'analytics'"
          >
            <Icon name="ri:star-line" size="16" />
            Analytics
          </button>
        </div>
      </div>
  
      <div class="builder-content">
        <!-- Edit Tab -->
        <div v-if="activeTab === 'edit'" class="edit-panel">
         <ProfileEdit @update="handleProfileUpdate" 
         @edit-link="editCustomLink"
         @delete-link="deleteCustomLink"
         @show-link-modal="handleShowLinkModal"
         v-bind:themes="themes" v-bind:profile="profile" />
        </div>
  
        <!-- Design Tab -->
        <div v-if="activeTab === 'design'" class="design-panel">
          <ProfileDesign
          :profile="profile"
    :layouts="layouts"
    :themes="themes"
    @select-layout="selectLayout"
    @select-theme="profile.theme = $event"
          />
        </div>
  
        <!-- Preview Tab -->
        <div v-if="activeTab === 'preview'" class="full-preview">
          <ProfilePreview 
          :themes="themes"
          :profile="profile"
    :layouts="layouts"
          @copy="handleCopy"
          />
        </div>
  
        <!-- Analytics Tab -->
        <div v-if="activeTab === 'analytics'" class="analytics-panel">
          <ProfileAnalytics 
          :profile="profile"
          />
          
        </div>
      </div>
      <Modal 
        v-if="showModal" 
        :type="modalType" 
        :profile="profile" 
        @close="closeModal" 
        @update="updateProfile"
      />
      <!-- Link Modal -->
      <div v-if="showLinkModal" class="modal-overlay" @click.self="closeLinkModal">
        <div class="modal">
          <div class="modal-header">
            <h3>{{ editingLink ? 'Edit Link' : 'Add Distinguished Link' }}</h3>
            <button 
              class="modal-close"
              @click="closeLinkModal"
            >
              ×
            </button>
          </div>
          
          <div class="modal-content">
            <div class="form-group">
              <label>Title</label>
              <input 
                v-model="newLink.title"
                type="text"
                placeholder="e.g., Schedule Consultation"
              />
            </div>
            
            <div class="form-group">
              <label>URL</label>
              <input 
                v-model="newLink.url"
                type="url"
                placeholder="https://example.com"
              />
            </div>
            
            <div class="form-group">
              <label>Description (Optional)</label>
              <input 
                v-model="newLink.description"
                type="text"
                placeholder="Brief description of this distinguished resource"
              />
            </div>
          </div>
          
          <div class="modal-footer">
            <button 
              class="btn-secondary"
              @click="closeLinkModal"
            >
              Cancel
            </button>
            <button 
              class="btn-primary"
              @click="editingLink ? updateCustomLink() : addCustomLink()"
            >
              {{ editingLink ? 'Update Link' : 'Add Link' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "admin",
  });
  
  import { ref, reactive, computed } from 'vue'
  
  // Reactive state
  const activeTab = ref('edit')
  const selectedLayout = ref('1')
  const previewDevice = ref('mobile')
  const copied = ref('')
  const showLinkModal = ref(false)
  const editingLink = ref(null)
  
  const profile = reactive({
    name: 'Marcus Aurelius',
    title: 'Senior Consul',
    company: 'Augustus & Associates',
    tagline: 'Virtus et Honor - Virtue and Honor',
    bio: 'Distinguished leader in corporate governance with over a decade of experience in strategic counsel and imperial decision-making.',
    location: 'Rome, Italia',
    avatar: null,
    coverImage: null,
    theme: '1',
    layout: '1',
    socialLinks: [
      { id: 1, platform: 'linkedin', url: 'https://linkedin.com/in/marcusaurelius', icon: 'ri:linkedin-fill', label: 'LinkedIn' },
      { id: 2, platform: 'email', url: 'mailto:marcus@augustus.com', icon: 'ri:mail-line', label: 'Email' },
      { id: 3, platform: 'phone', url: 'tel:+1234567890', icon: 'ri:phone-line', label: 'Phone' },
      { id: 4, platform: 'website', url: 'https://augustus.com', icon: 'ri:global-line', label: 'Website' },
      { id: 5, platform: 'youtube', url: 'https://youtube.com/@chrisnortonjr', icon: 'ri:youtube-fill', label: 'YouTube' },
      { id: 5, platform: 'youtube', url: 'https://facebook.com/thewebtechninjas', icon: 'ri:facebook-fill', label: 'FB' },
      { id: 6, platform: 'twitter', url: 'https://twitter.com/marcusaurelius', icon: 'ri:twitter-x-fill', label: 'X' },
      { id: 7, platform: 'instagram', url: 'https://instagram.com/marcusaurelius', icon: 'ri:instagram-fill', label: 'Follow' }
    ],
    customLinks: [
      { id: 1, title: 'Schedule Consultation', url: 'https://calendly.com/marcus', description: 'Book a distinguished consultation' },
      { id: 2, title: 'Imperial Resources', url: 'https://augustus.com/resources', description: 'Access our exclusive governance guides' }
    ],
    gallery: [],
    stats: {
      totalViews: 4287,
      weeklyViews: 234,
      connections: 567,
      saves: 143
    }
  })

  const layouts = [
    { id: 'imperial', name: 'Imperial Majesty', icon: 'ri:vip-crown-line', preview: 'Commanding presence, authoritative design' },
    { id: 'senate', name: 'Senate Elite', icon: 'ri:building-line', preview: 'Classical columns, traditional elegance' },
    { id: 'augustus', name: 'Augustus Modern', icon: 'ri:layout-line', preview: 'Contemporary sophistication' },
    { id: 'caesar', name: 'Caesar Bold', icon: 'ri:flashlight-line', preview: 'Dynamic leadership presence' }
  ]
  
  const themes = [
    { id:'1',class: 'imperial-gold', name: 'Imperial Gold', primary: '#FFD700', bg: '#1a1a1a', text: '#ffffff', accent: '#8B4513' },
    // { id:'2', class:'roman-purple', name: 'Roman Purple', primary: '#9370DB', bg: '#2F1B69', text: '#ffffff', accent: '#FFD700' },
    {id:'2', class:'royal-purple', name:'Royal Purple', primary:'#d4af37', bg:'#2d2a4a', text:'#faf3dd', accent:'#a47e3b'},
    {id:'3', class:'elysium', name:'Elysium', primary:'#d4c5a6', bg:'#f5f5f5', text:'#2e2e2e', accent:'#b6a78f'},
    // { id:'3', class:'marble-classic', name: 'Marble Classic', primary: '#CD853F', bg: '#F5F5DC', text: '#2F4F4F', accent: '#8B4513' },
    // { id: '4', class: 'caesar-crimson', name: 'Caesar Crimson', primary: '#DC143C', bg: '#8B0000', text: '#ffffff', accent: '#FFD700' },
    { id: '4', class: 'inferno', name: 'Inferno', primary: '#DC143C', bg: '#600101', text: '#f5e9e9', accent: '#a11d23' },
    // {id:'5', class:'olympus-white', name:'Olympus White', primary:'#d4af37', bg:'#2d2a4a', text:'#faf3dd', accent:'#a47e3b'},
    {id:'5', class:'golden-hour', name:'Golden Hour', primary:'#FF8C00', bg:'#5A3E1B', text:'#FFF6D5', accent:'#F4A261'},
    {id:'6', class:'obsidian', name:'Obsidian', primary:'#f5f5f5', bg:'#131313', text:'#ffffff', accent:'#f4f4f4'},
    {id:'7', class:'purple-reign', name:'Purple Reign', primary:'#FFD700', bg:'#2e1a47', text:'#f5e6fa', accent:'#a029a0'},
    {id:'8', class:'atlantis', name:'Atlantis', primary:'#00b4d8', bg:'#2c2c54', text:'#f8f8ff', accent:'#ff6f61'},
    // {id:'10', class:'dawn', name:'Dawn', primary:'#ff4500', bg:'#fceeb5', text:'#3b3a36', accent:'#ffa07a'},
    // {id:'10', class:'pheonix', name:'Pheonix', primary:'#B02512', bg:'#351806', text:'#FFD9B0', accent:'#E76F51'},
    // {id:'9', class:'navy', name:'Navy', primary:'#0052a5', bg:'#002147', text:'#ffffff', accent:'#d1242a'},
    {id:'9', class:'republic', name:'Republic', primary:'#D1232A', bg:'#F5F5F5', text:'#1A1A1A', accent:'#3366CC'},
    // {id:'11', class:'twilight', name:'Twilight', primary:'#3e497a', bg:'#1c1c3c', text:'#e0d7c6', accent:'#9e5e69'},
    {id:'10', class:'twilight', name:'Twilight', primary:'#FF9561', bg:'#1C1C3C', text:'#E3D9F3', accent:'#6A4C93'},
    {id:'11', class:'eden', name:'Eden', primary:'#a6e22e', bg:'#272822', text:'#f8f8f2', accent:'#fd971f'},
    // {id:'13', class:'navy', name:'Navy', primary:'#0052a5', bg:'#002147', text:'#ffffff', accent:'#d1242a'},
    {id:'12', class:'pheonix-fire', name:'Pheonix Fire', primary:'#B8390E', bg:'#3E1E0F', text:'#F8E4C9', accent:'#D45C2C'},


  ]
  
  const newLink = reactive({ title: '', url: '', description: '' })
  
  const handleProfileUpdate = (updatedData) => {
  // Handle the profile update
  Object.assign(profile, updatedData)
}
  
  // Methods
  const handleShowLinkModal = (type) => {
    showLinkModal.value = true
    console.log('Opening link modal')
  }
  const handleFileUpload = (type) => {
    const input = type === 'cover' ? document.querySelector('input[ref="coverInput"]') : document.querySelector('input[ref="avatarInput"]')
    const file = input.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (type === 'cover') {
          profile.coverImage = e.target.result
        } else {
          profile.avatar = e.target.result
        }
      }
      reader.readAsDataURL(file)
    }
  }
  
  const selectLayout = (layoutId) => {
    selectedLayout.value = layoutId
    profile.layout = layoutId
  }
  
  const addCustomLink = () => {
    if (newLink.title && newLink.url) {
      const link = {
        id: Date.now(),
        ...newLink
      }
      profile.customLinks.push(link)
      resetLinkForm()
      showLinkModal.value = false
    }
  }
  
  const editCustomLink = (link) => {
    editingLink.value = link
    Object.assign(newLink, link)
    showLinkModal.value = true
  }
  
  const updateCustomLink = () => {
    const index = profile.customLinks.findIndex(link => link.id === editingLink.value.id)
    if (index !== -1) {
      Object.assign(profile.customLinks[index], newLink)
    }
    resetLinkForm()
    showLinkModal.value = false
  }
  
  const deleteCustomLink = (id) => {
    const index = profile.customLinks.findIndex(link => link.id === id)
    if (index !== -1) {
      profile.customLinks.splice(index, 1)
    }
  }
  
  const closeLinkModal = () => {
    showLinkModal.value = false
    editingLink.value = null
    resetLinkForm()
  }
  
  const resetLinkForm = () => {
    newLink.title = ''
    newLink.url = ''
    newLink.description = ''
  }
  
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    copied.value = type
    setTimeout(() => {
      copied.value = ''
    }, 2000)
  }
  
  const currentTheme = computed(() => {
    return themes.find(t => t.class === profile.theme)
  })
  </script>
  
  <style scoped>
  @import "~/assets/css/account/profile.css";
  </style>
  
 