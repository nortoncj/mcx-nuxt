<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ type === 'avatar' ? 'Upload Profile Picture' : 'Upload Cover Image' }}</h3>
          <button class="modal-close" @click="closeModal">×</button>
        </div>
        
        <div class="modal-content">
          <!-- File Selection State -->
          <div v-if="!selectedFile && !isOpenCamera" class="upload-section">
            <p>Choose how to add your image:</p>
            <input 
              ref="fileInput"
              type="file" 
              @change="handleFileUpload"
              accept="image/*"
              hidden
            />
            <div class="button-container">
              <button class="btn-primary" @click="$refs.fileInput.click()">
                <Icon name="ri:image-line" size="16" />
                Select Image
              </button>
              <button class="btn-primary" @click="openCamera">
                <Icon name="ri:camera-line" size="16" />
                Open Camera
              </button>
            </div>
          </div>
  
          <!-- Camera Section -->
          <div v-if="isOpenCamera" class="camera-section">
            <video 
              ref="video" 
              v-show="!isNewPhoto" 
              autoplay 
              playsinline
              class="camera-video"
            ></video>
            <canvas 
              ref="canvas" 
              v-show="isNewPhoto"
              class="photo-canvas"
            ></canvas>
            
            <div class="camera-controls">
              <button 
                v-if="!isNewPhoto"
                class="btn-primary" 
                @click="takePhoto"
                :disabled="isTakingPhoto"
              >
                <Icon v-if="isTakingPhoto" name="ri:loader-fill" size="16" class="spinning" />
                <Icon v-else name="ri:camera-line" size="16" />
                {{ isTakingPhoto ? 'Taking...' : 'Take Photo' }}
              </button>
              
              <button v-if="isNewPhoto" class="btn-primary" @click="useCapturedPhoto">
                Use This Photo
              </button>
              <button class="btn-secondary" @click="closeCamera">Cancel</button>
            </div>
          </div>
  
          <!-- Cropper Section -->
          <div v-if="selectedFile && !isOpenCamera && !isNewPhoto" class="cropper-section">
            <div class="cropper-container">
              <Cropper
                ref="cropper"
                class="cropper"
                :src="imageUrl"
                :stencil-props="{
                  handlers: {},
                  moveable: true,
                  resizable: true,
                  aspectRatio: type === 'avatar' ? 1 : 16/9
                }"
                :resize-image="{
                  adjustStencil: false
                }"
                image-restriction="stencil"
              />
            </div>
            
            <div class="cropper-controls">
              <button class="btn-secondary" @click="resetImage">
                <Icon name="ri:arrow-left-line" size="16" />
                Choose Different Image
              </button>
              <button class="btn-primary" @click="cropAndUpload">
                <Icon name="ri:crop-line" size="16" />
                Crop & Upload
              </button>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn-secondary" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { Cropper } from 'vue-advanced-cropper'
  import 'vue-advanced-cropper/dist/style.css'
  
  // Props
  const props = defineProps({
    type: {
      type: String,
      required: true
    },
    profile: {
      type: Object,
      required: true
    }
  })
  
  // Emits
  const emit = defineEmits(['close', 'update'])
  
  // Refs
  const fileInput = ref(null)
  const video = ref(null)
  const canvas = ref(null)
  const cropper = ref(null)
  
  // State
  const selectedFile = ref(null)
  const isOpenCamera = ref(false)
  const isNewPhoto = ref(false)
  const isTakingPhoto = ref(false)
  const photoData = ref(null)
  const stream = ref(null)
  
  // Computed
  const imageUrl = computed(() => {
    if (selectedFile.value) return URL.createObjectURL(selectedFile.value)
    return ''
  })
  
  // Methods
  const closeModal = () => {
    stopCamera()
    emit('close')
  }
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      selectedFile.value = file
      isOpenCamera.value = false
      isNewPhoto.value = false
    }
  }
  
  const openCamera = async () => {
    try {
      isOpenCamera.value = true
      await nextTick()
      
      stream.value = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        } 
      })
      
      if (video.value) {
        video.value.srcObject = stream.value
        video.value.play()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Could not access camera. Please try selecting an image file instead.')
      isOpenCamera.value = false
    }
  }
  
  const takePhoto = () => {
    if (!video.value || video.value.readyState !== 4) return
    
    isTakingPhoto.value = true
    
    const videoWidth = video.value.videoWidth
    const videoHeight = video.value.videoHeight
    
    canvas.value.width = videoWidth
    canvas.value.height = videoHeight
    
    const context = canvas.value.getContext('2d')
    context.drawImage(video.value, 0, 0, videoWidth, videoHeight)
    
    photoData.value = canvas.value.toDataURL('image/png')
    isNewPhoto.value = true
    isTakingPhoto.value = false
  }
  
  const useCapturedPhoto = () => {
    stopCamera()
    isOpenCamera.value = false
    
    // Convert canvas data URL to blob, then to file for cropper
    if (photoData.value) {
      fetch(photoData.value)
        .then(res => res.blob())
        .then(blob => {
          // Create a file-like object from the blob
          const file = new File([blob], 'captured-photo.png', { type: 'image/png' })
          selectedFile.value = file
          // Clear photo data since we're now using selectedFile
          photoData.value = null
          isNewPhoto.value = false
        })
    }
  }
  
  const closeCamera = () => {
    stopCamera()
    isOpenCamera.value = false
    isNewPhoto.value = false
    photoData.value = null
  }
  
  const stopCamera = () => {
    if (stream.value) {
      stream.value.getTracks().forEach(track => track.stop())
      stream.value = null
    }
  }
  
  const resetImage = () => {
    selectedFile.value = null
    photoData.value = null
    isNewPhoto.value = false
  }
  
  const cropAndUpload = () => {
    if (!cropper.value) return
    
    const { canvas } = cropper.value.getResult()
    if (canvas) {
      canvas.toBlob((blob) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const updatedProfile = { ...props.profile }
          
          if (props.type === 'avatar') {
            updatedProfile.avatar = e.target.result
          } else {
            updatedProfile.coverImage = e.target.result
          }
          
          emit('update', updatedProfile)
          closeModal()
        }
        reader.readAsDataURL(blob)
      }, 'image/jpeg', 0.8)
    }
  }
  
  // Cleanup
  onUnmounted(() => {
    stopCamera()
  })
  </script>
  
  <style scoped>
  @import "~/assets/css/account/profile.css";
  
  .upload-section {
    text-align: center;
    padding: 20px;
  }
  
  .button-container {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 16px;
  }
  
  .camera-section {
    text-align: center;
  }
  
  .camera-video, .photo-canvas {
    max-width: 100%;
    max-height: 300px;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .camera-controls {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .cropper-section {
    width: 100%;
  }
  
  .cropper-container {
    height: 400px;
    margin-bottom: 16px;
  }
  
  .cropper {
    height: 100%;
    width: 100%;
  }
  
  .cropper-controls {
    display: flex;
    gap: 12px;
    justify-content: space-between;
  }
  
  .spinning {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .cropper-container {
      height: 300px;
    }
    
    .cropper-controls {
      flex-direction: column;
      gap: 8px;
    }
    
    .button-container {
      flex-direction: column;
      align-items: center;
    }
  }
  </style>