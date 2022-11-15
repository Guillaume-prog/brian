<template>
  <div class="p-4 w-full max-w-md">
    <div class="flex gap-4 items-center text-lg mb-4">
      <span class="material-symbols-outlined">{{ icon }}</span>
      <p>{{ title }}</p>
    </div>
    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string; icon: string }>();
</script>

<style scoped></style>
