<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
   <div>
           <!-- Navigation -->
           <AppNavBar />
      <!-- End Navigation -->
       <main :class="{ 'non-index-padding': route.name !== 'index' }" > 
       <slot />  
    </main>
    <AppFooter />
    </div>
   
    </template>

    <style scoped>

        @import "~/assets/css/styles.css";
    
    .error {
      color:red;
    }

    /* .non-index-padding {
  padding: 100px 0 0 0;
} */

    </style>