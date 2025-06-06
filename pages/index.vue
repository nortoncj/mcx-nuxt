<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errors = ref(null);
</script>

<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Login to your <NuxtLink to="./admin">
          Account
        </NuxtLink>
      </h1>
      <AuthForm />
    </div>
  </AuthLayout>
</template>
