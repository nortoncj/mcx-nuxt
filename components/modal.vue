<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <div class="modal-header">
            <h3>Avatar</h3>
            <button 
              class="modal-close"
              @click="closeModal"
            >
              ×
            </button>
          </div>
          
          <div class="modal-content">
            <button class="btn-primary">Upload</button>
            
          </div>
          
          <div class="modal-footer">
            <button 
              class="btn-secondary"
              @click="closeModal"
            >
              Cancel
            </button>
           
          </div>
        </div>
      </div>
</template>

<script setup>
const showModal = ref(false)

const closeModal = () => {
    showModal.value = false
}
  
</script>