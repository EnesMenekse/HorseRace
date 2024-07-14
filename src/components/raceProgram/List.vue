<template>
  <div>
    <div class="flex items-center w-full px-3 h-8 bg-green-500 text-white">
      <h2 class="text-xs md:text-sm font-bold">
        {{ `Lap ${lap} - ${1000 + 200 * lap}m` }}
      </h2>
    </div>
    <div class="flex flex-col w-full">
      <div>
        <div class="col-span-4">Lane</div>
        <div class="col-span-8">Name</div>
      </div>
      <div v-for="{ name, lane } in List" :key="lane">
        <div class="col-span-4">{{ lane }}</div>
        <div class="col-span-8">{{ name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    lap: Number,
    List: Array,
  },
};
</script>

<style scoped>
.flex-col > div {
  @apply grid grid-cols-12 w-full;
}

.flex-col > div > div {
  @apply text-center p-2 bg-white border border-gray-300 text-sm font-bold;
}
.flex-col > div:first-child > div {
  @apply bg-gray-200;
}
</style>
