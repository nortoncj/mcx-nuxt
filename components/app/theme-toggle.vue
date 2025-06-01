<script lang="ts" setup>
const currentTheme = ref('MCX');

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'MCX' ? 'MCX-Dark' : 'MCX';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  console.log('Theme set to:', currentTheme.value);
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', 'MCX');
});
</script>

<template>
  <label class="swap swap-rotate">
    <input 
      :checked="currentTheme === 'MCX-Dark'" 
      @change="toggleTheme"
      type="checkbox"
    >
    <Icon class="swap-on" name="ri:sun-line" size="24" />
    <Icon class="swap-off" name="ri:moon-fill" size="24" />
  </label>
</template>