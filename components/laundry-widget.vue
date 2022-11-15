<template>
  <Section icon="local_laundry_service" title="CROUS Laundry Room">
    <div class="card justify-between">
      <p>Washers</p>
      <b>{{ percent(laundry_info?.washers) }}</b>
    </div>
    <div class="card justify-between">
      <p>Dryers</p>
      <b>{{ percent(laundry_info?.dryers) }}</b>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { LaundrySummary, LaundryOccupancy } from "@/types";
const laundry_info = ref<LaundrySummary>();
setLaundry();

async function setLaundry() {
  laundry_info.value = await $fetch("/api/laundry");
}

const percent = (occupancy?: LaundryOccupancy) =>
  occupancy == undefined ? "-/-" : `${occupancy.available}/${occupancy.total}`;
</script>

<style scoped></style>
