<template>
  <div id="main" class="grid w-full place-items-center bg-slate-100">
    <div class="w-full row">
      <BusWidget />
      <div class="col">
        <BikeWidget />
        <LaundryWidget />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.row {
  @apply flex items-start justify-center gap-8;
}

.col {
  @apply flex gap-8 flex-col w-full max-w-md;
}
</style>
