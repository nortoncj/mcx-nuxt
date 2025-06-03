<template>
  <div>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <VitePwaManifest />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
const userStore = useUserStore();
const { isMobile, isPreviewOverlay, updatedLinkId, addLinkOverlay, id } =
  storeToRefs(userStore);

const route = useRoute();
let show = ref(false);
let bgIsGray = ref(false);

onMounted(() => {
  document.documentElement.setAttribute("data-theme", "MCX");
  userStore.colors = colors();
  updatedLinkId.value = 0;
  addLinkOverlay.value = false;
  isPreviewOverlay.value = false;
  isMobile.value = false;

  if ("ontouchstart" in window) {
    isMobile.value = true;
  }
});

const colors = () => {
  return [
    { id: 1, color: "bg-white", text: "text-black", name: "Air White" },
    { id: 2, color: "bg-gray-800", text: "text-white", name: "Midnight Black" },
    {
      id: 3,
      color: "bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-500",
      text: "text-white",
      name: "Royal Purple",
    },
    {
      id: 4,
      color: "bg-gradient-to-t from-gray-500 via-blue-500 to-green-500",
      text: "text-white",
      name: "Livid Green",
    },
    {
      id: 5,
      color: "bg-gradient-to-t from-orange-500 via-green-500 to-red-500",
      text: "text-white",
      name: "Northern Lights",
    },
    {
      id: 6,
      color: "bg-gradient-to-b from-blue-800 via-blue-500 to-green-500",
      text: "text-white",
      name: "Azure",
    },
    {
      id: 7,
      color: "bg-gradient-to-t from-lime-500 via-indigo-700 to-amber-500",
      text: "text-white",
      name: "Dawn",
    },
    {
      id: 8,
      color: "bg-gradient-to-t from-gray-800 to-emerald-500",
      text: "text-white",
      name: "Auqua",
    },
    {
      id: 9,
      color: "bg-gradient-to-br from-yellow-500 via-yellow-600 to-amber-700",
      text: "text-black",
      name: "Imperial Gold",
    },
    {
      id: 10,
      color: "bg-gradient-to-t from-red-900 via-red-800 to-red-700",
      text: "text-white",
      name: "Crimson Velvet",
    },
    {
      id: 11,
      color: "bg-gradient-to-br from-gray-900 via-yellow-600 to-gray-900",
      text: "text-white",
      name: "Emperors Standard",
    },
    {
      id: 12,
      color: "bg-gradient-to-t from-stone-200 via-stone-100 to-white",
      text: "text-gray-800",
      name: "Roman Marble",
    },
    {
      id: 13,
      color: "bg-gradient-to-br from-gray-600 via-gray-500 to-gray-700",
      text: "text-white",
      name: "Metal Gray",
    },
    {
      id: 14,
      color: "bg-gradient-to-t from-black via-yellow-600 to-black",
      text: "text-white",
      name: "Golden Onyx",
    },
    {
      id: 15,
      color: "bg-gradient-to-br from-amber-600 via-orange-600 to-red-800",
      text: "text-white",
      name: "Caesar's Glory",
    },
    {
      id: 16,
      color: "bg-gradient-to-t from-gray-900 via-stone-600 to-amber-500",
      text: "text-white",
      name: "Ancient Luxury",
    },
    {
      id: 17,
      color: "bg-gradient-to-br from-red-900 via-yellow-600 to-gray-900",
      text: "text-white",
      name: "Senate Gold",
    },
    {
      id: 18,
      color: "bg-gradient-to-t from-stone-800 via-amber-600 to-stone-200",
      text: "text-gray-900",
      name: "Marble & Gold",
    },
    {
      id: 19,
      color: "bg-gradient-to-br from-gray-900 via-red-800 to-black",
      text: "text-white",
      name: "Praetorian",
    },
    {
      id: 20,
      color: "bg-gradient-to-t from-yellow-500 via-amber-400 to-orange-500",
      text: "text-black",
      name: "Aurelius",
    },
  ];
};
</script>
