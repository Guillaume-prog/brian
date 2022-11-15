<template>
  <div class="card">
    <header
      :style="colors"
      class="w-12 md:w-16 h-12 md:h-16 grid place-items-center rounded-lg font-bold"
    >
      {{ bus.name }}
    </header>
    <div class="flex-grow">
      <p
        v-for="{ name, minutes } in times"
        class="w-full flex justify-between items-center gap-3 md:gap-4 md:text-base text-sm"
      >
        <span>{{ name }}</span>
        <b>{{ minutes }} min</b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BusLine } from "@/types";
const props = defineProps<{ bus: BusLine }>();
const emit = defineEmits(["expiredTime"]);

const colors = computed(
  () => `background-color: ${props.bus.color.bg}; color: ${props.bus.color.fg};`
);

// Countdown setup
const times = computed(() =>
  Object.entries(props.bus.times).map(([tag, date]) => ({
    name: tag,
    minutes: new Date(new Date(date).getTime() - Date.now()).getMinutes(),
  }))
);

// Countdown timer mechanism
const updateInterval = setInterval(() => {
  times.value.forEach((t) => {
    t.minutes -= 1;
    if (t.minutes <= 0) emit("expiredTime");
  });
}, 1000 * 60);

onDeactivated(() => clearInterval(updateInterval));
</script>

<style scoped></style>
