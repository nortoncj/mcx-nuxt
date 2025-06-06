<script setup>
import { useUserStore } from "~~/stores/user";

const emit = defineEmits(["close"]);

const userStore = useUserStore();

const name = ref("");
const url = ref("");
const errors = ref(null);

async function addLink() {
  try {
    await userStore.addLink(name.value, url.value);
    await userStore.getAllLinks();
    setTimeout(() => {
      emit("close");
      name.value = "";
      url.value = "";
    }, 100);
  }
  catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  }
}
</script>

<template>
  <div id="AddLink" class="w-full bg-white rounded-3xl overflow-hidden">
    <div class="flex items-center justify-between pb-2 p-6">
      <div class="text-[19px] font-semibold">
        Enter URL
      </div>
      <button
        class="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
        @click="$emit('close')"
      >
        <Icon
          name="mdi:close"
          size="20"
          color="#676B5F"
        />
      </button>
    </div>

    <form
      class="flex items-center gap-4 w-full pt-2 p-6"
      @submit.prevent="submit()"
    >
      <div class="w-full">
        <TextInput
          v-model:input="name"
          class="w-full"
          placeholder="Name"
          input-type="text"
          :error="errors && errors.name ? errors.name[0] : ''"
        />

        <div class="py-1" />

        <TextInput
          v-model:input="url"
          class="w-full"
          placeholder="URL"
          input-type="text"
          :error="errors && errors.url ? errors.url[0] : ''"
        />
      </div>

      <button
        type="submit"
        :disabled="!name && !url"
        class="rounded p-3 px-6"
        :class="
          name && url
            ? 'btn btn-accent text-white'
            : 'bg-[#EFF0EA] text-[#A7AAA2]'
        "
        @click="addLink()"
      >
        Add
      </button>
    </form>
  </div>
</template>
