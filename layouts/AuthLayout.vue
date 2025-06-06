<script setup>
import { storeToRefs } from "pinia";

import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const { updateLinkId } = storeToRefs(userStore);
const route = useRoute();

onUnmounted(() => updateLinkId.value = 0);
</script>

<template>
  <div id="AuthLayout" class="h-screen w-full flex justify-between">
    <div class="lg:pt-7 lg:px-12 px-6 lg:w-2/3 w-full min-width-[800px]">
      <NuxtLink to="/" class="inline-block">
        <img
          src="~/assets/images/demo/linktree-logo.png"
          alt="logo"
          class="lg:w-28 w-[75px] select-none"
        >
      </NuxtLink>
      <main class="w-full">
        <div class="w-full md:max-w-[550px] max-w-[360px] mx-auto">
          <slot />
        </div>
      </main>
    </div>
    <div class="lg:block hidden w-1/3 pointer-events-none">
      <img
        v-if="route.fullPath === '/'"
        class="object-cover w-full h-screen select-none"
        src="~/assets/images/demo/side1.png"
        alt="side1"
      >
      <img
        v-else="route.fullPath === '/'"
        class="object-cover w-full h-screen select-none"
        src="~/assets/images/demo/side2.png"
        alt="side2"
      >
    </div>
  </div>
</template>
