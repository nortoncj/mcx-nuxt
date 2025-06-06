<script setup>
const props = defineProps(["input", "placeholder", "max", "inputType", "error"]);
const emit = defineEmits(["update:input"]);
const { input, placeholder, max, inputType, error } = toRefs(props);

const isFocused = ref(false);

const inputComputed = computed({
  get: () => input.value,
  set: val => emit("update:input", val),
});
</script>

<template>
  <div>
    <client-only>
      <input
        :id="placeholder"
        :placeholder="placeholder"
        v-model="inputComputed"
        :maxlength="String(max)"
        class="
                    w-full
                    bg-[#EFF0EB]
                    text-stone-800
                    border-2
                    text-sm
                    border-[#EFF0EB]
                    rounded
                    py-3.5
                    px-3
                    placeholder-gray-500
                    focus:outline-none
                "
        :class="isFocused ? 'border-stone-900' : ''"
        :type="inputType"
        autocomplete="off"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >
    </client-only>
    <span v-if="error" class="text-error text-[14px] font-semibold">
      {{ error }}
    </span>
  </div>
</template>
