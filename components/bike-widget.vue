<template>
  <Section icon="directions_bike" title="Available bikes">
    <div class="card justify-between">
      <p>{{ bike_info?.name ?? "-" }}</p>
      <b>{{ count }}</b>
    </div>
  </Section>
</template>

<script setup lang="ts">
import { BikeInfo } from "@/types";

const bike_info = ref<BikeInfo>();
updateBikes();

const count = computed(() =>
  bike_info.value == undefined
    ? "-/-"
    : `${bike_info.value.available}/${bike_info.value.total}`
);

const updateInterval = setInterval(updateBikes, 1000 * 60);
onDeactivated(() => clearInterval(updateInterval));

async function updateBikes() {
  console.log("updating bikes");
  bike_info.value = await $fetch("/api/bike");
}
</script>

<style scoped></style>
