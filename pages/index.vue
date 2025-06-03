<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Login to your <NuxtLink to="./admin">Account</NuxtLink>
      </h1>
      <AuthForm />
    
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";
let name = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);
let errors = ref(null);
</script>
