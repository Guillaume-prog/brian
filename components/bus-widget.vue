<template>
  <Section icon="directions_bus" title="Upcoming buses">
    <Bus
      v-for="bus in busLines"
      :bus="bus"
      @expiredTime="getBus"
      class="w-full"
    />
  </Section>
</template>

<script setup lang="ts">
import { BusLine } from "@/types";
const busLines = ref<BusLine[]>();
getBus();

async function getBus() {
  console.log("Fetching bus lines");
  busLines.value = await $fetch("/api/bus");
  console.log("Retrieved bus lines");
}
</script>
