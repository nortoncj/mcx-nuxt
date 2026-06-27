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