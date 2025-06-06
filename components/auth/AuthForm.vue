<script setup>
import AppleIcon from "~/components/icons/AppleIcon.vue";
import GoogleIcon from "~/components/icons/GoogleIcon.vue";
import LinkedInIcon from "~/components/icons/LinkedInIcon.vue";
import MicrosoftIcon from "~/components/icons/MicrosoftIcon.vue";

// Reactive state
const variant = ref("LOGIN"); // 'LOGIN' or 'REGISTER'
const isLoading = ref(false);
const formData = reactive({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const errors = ref(null);

// Toast notification function
function showToast(message, type = "info") {
// In a real app, you'd use a proper toast library like vue-toastification
  if (type === "error") {
    alert(`Error: ${message}`);
  }
  else if (type === "success") {
    alert(`Success: ${message}`);
  }
  else {
    alert(message);
  }
}

// Methods
function toggleVariant() {
  variant.value = variant.value === "LOGIN" ? "REGISTER" : "LOGIN";
  errors.value = null; // Clear errors when switching
}

function validateForm() {
  const newErrors = {};

  if (!formData.email) {
    newErrors.email = "Email is required";
  }
  else if (!/\S[^\s@]*@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email is invalid";
  }

  if (!formData.password) {
    newErrors.password = "Password is required";
  }
  else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (variant.value === "REGISTER") {
    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    }
    else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  }

  errors.value = Object.keys(newErrors).length > 0 ? newErrors : null;
  return Object.keys(newErrors).length === 0;
}

async function onSubmit() {
  if (!validateForm()) {
    return;
  }

  isLoading.value = true;

  try {
    if (variant.value === "REGISTER") {
    // Simulate registration API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast("Registration successful! Please login.", "success");
      variant.value = "LOGIN";
      formData.name = "";
      formData.confirmPassword = "";
    }
    else {
    // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (
        formData.email === "demo@example.com"
        && formData.password === "password"
      ) {
        showToast("Login successful!", "success");
      // In a real app, you'd redirect or update app state here
      }
      else {
        showToast("Invalid credentials", "error");
      }
    }
  }
  catch (error) {
    showToast("Something went wrong!", "error");
  }
  finally {
    isLoading.value = false;
  }
}

function socialAction(action) {
  isLoading.value = true;
  setTimeout(() => {
    if (["google", "microsoft", "linkedin", "apple"].includes(action)) {
      showToast(`${action} login successful!`, "success");
    }
    else {
      showToast(`${action} Error!`, "error");
    }
    isLoading.value = false;
  }, 1000);
}
</script>

<template>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
      <form class="space-y-6" @submit.prevent="onSubmit">
        <!-- Register fields -->
        <div v-if="variant === 'REGISTER'">
          <TextInput
            v-model:input="formData.name"
            placeholder="First Name"
            input-type="text"
            :error="errors && errors.name ? errors.name : ''"
          />
        </div>

        <div>
          <TextInput
            v-model:input="formData.email"
            placeholder="Email: email@example.com"
            input-type="email"
            :error="errors && errors.email ? errors.email : ''"
          />
        </div>

        <div>
          <TextInput
            v-model:input="formData.password"
            placeholder="Password"
            input-type="password"
            :error="errors && errors.password ? errors.password : ''"
          />
        </div>

        <div v-if="variant === 'REGISTER'">
          <TextInput
            v-model:input="formData.confirmPassword"
            placeholder="Confirm Password"
            input-type="password"
            :error="errors && errors.confirmPassword ? errors.confirmPassword : ''"
          />
        </div>

        <div>
          <button
            type="submit"
            class="rounded w-full p-3 font-bold btn"
            :disabled="
              isLoading
                || !formData.email
                || !formData.password
                || (variant === 'REGISTER' && (!formData.name || !formData.confirmPassword))
            "
            :class="
              (formData.email
                && formData.password
                && !isLoading
                && (variant === 'LOGIN' || (formData.name && formData.confirmPassword))
              ) ? 'btn-success' : 'btn-neutral'
            "
          >
            {{ isLoading ? 'Loading...' : (variant === 'LOGIN' ? 'Login' : 'Register') }}
          </button>
        </div>
      </form>

      <div class="mt-10 grid grid-cols-3 items-center text-gray-500">
        <hr class="text-gray-500">
        <p class="text-center text-sm">
          or continue with
        </p>
        <hr class="text-gray-500">
      </div>

      <div class="mt-6 grid grid-cols-4 gap-2">
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          @click="socialAction('google')"
        >
          <GoogleIcon />
        </button>
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          @click="socialAction('microsoft')"
        >
          <MicrosoftIcon />
        </button>
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          @click="socialAction('linkedin')"
        >
          <LinkedInIcon />
        </button>
        <button
          type="button"
          class="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          @click="socialAction('apple')"
        >
          <AppleIcon />
        </button>
      </div>

      <div class="text-[14px] text-center pt-12">
        {{ variant === 'LOGIN' ? "Don't have an Account?" : "Already have an account?" }}
        <span class="underline text-warning-content cursor-pointer ml-2" @click="toggleVariant">
          {{ variant === 'LOGIN' ? 'Sign up' : 'Login' }}
        </span>
      </div>

      <!-- Demo credentials info -->
      <div class="mt-4 p-3 bg-gray-100 rounded-md">
        <p class="text-xs">
          <strong>Demo:</strong> Use email "demo@example.com" and password
          "password" to test login
        </p>
      </div>
    </div>
  </div>
</template>
