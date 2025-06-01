<template>
  <AuthLayout>
    <div class="mt-10">
      <h1 class="lg:text-5xl text-3xl text-center font-extrabold">
        Login to your Account
      </h1>
      
      <form 
                class="mt-12" 
                @submit.prevent="login()"
            >
                <div>
                    <TextInput 
                        placeholder="Email: email.example.com"
                        v-model:input="email"
                        inputType="email"
                        :error="errors && errors.email ? errors.email[0] : ''"
                    />
                </div>

                <div class="mt-4">
                    <TextInput 
                        placeholder="Password"
                        v-model:input="password"
                        inputType="password"
                        :error="errors && errors.password ? errors.password[0] : ''"
                    />
                </div>

                <div class="mt-10">
                    <button
                        type="submit"
                        class="rounded w-full p-3 font-bold btn"
                        :disabled="(!email || !password) "
                        :class="
                            (email && password) 
                                ? 'btn-success' 
                                : 'btn-neutral'
                        "
                    >
                        Log in
                    </button>
                </div>
            </form>
      <div class="text-[14px] text-center pt-12">
        Don't have an Account
        <NuxtLink to="/register" class="underline text-warning-content"
          >Sign up</NuxtLink
        >
      </div>
    </div>
  </AuthLayout>
</template>

<script setup>
import AuthLayout from "~/layouts/AuthLayout.vue";

let email = ref(null);
let password = ref(null);
let errors = ref(null);
</script>
