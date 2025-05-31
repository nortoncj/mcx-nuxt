<template >
  <div class="flex min-h-screen flex-col">
    <AppNavBar />
    <main>
      <slot />
    </main>
  </div>
  
</template>
<script setup>
onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'MCX')
})
</script>
