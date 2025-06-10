<template>
<div class="analytics-overview">
            <div class="stat-card">
              <Icon name="ri:flashlight-line" class="stat-icon" />
              <div class="stat-info">
                <span class="stat-number">{{ profile.stats.totalViews.toLocaleString() }}</span>
                <span class="stat-label">Total Views</span>
              </div>
            </div>
            <div class="stat-card">
              <Icon name="ri:eye-line" class="stat-icon" />
              <div class="stat-info">
                <span class="stat-number">{{ profile.stats.weeklyViews }}</span>
                <span class="stat-label">This Week</span>
              </div>
            </div>
            <div class="stat-card">
              <Icon name="ri:user-line" class="stat-icon" />
              <div class="stat-info">
                <span class="stat-number">{{ profile.stats.connections }}</span>
                <span class="stat-label">Connections</span>
              </div>
            </div>
            <div class="stat-card">
              <Icon name="ri:star-line" class="stat-icon" />
              <div class="stat-info">
                <span class="stat-number">{{ profile.stats.saves }}</span>
                <span class="stat-label">Saves</span>
              </div>
            </div>
          </div>
</template>
<script setup>
const props = defineProps({
    profile: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
  @import "~/assets/css/account/profile.css";
  </style>