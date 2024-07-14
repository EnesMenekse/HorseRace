<template>
  <div class="shrink-0 order-2 flex-grow md:order-none md:flex-grow-0 grid grid-cols-2 w-[30%] bg-gray-100">
    <div>
      <h2 class="bg-blue-500 text-white">Program</h2>
      <div v-if="raceList.length > 0">
        <List v-for="index in 6" :key="index" :List="raceList" :lap="index" />
      </div>
    </div>
    <div>
      <h2 class="bg-green-500 text-white">Results</h2>
      <div v-if="resultList[0].length > 0">
        <List v-for="(result, index) in filteredResultList" :key="index" :List="result" :lap="index + 1" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import List from "./List.vue";

export default {
  name: "Program",
  components: {
    List,
  },
  computed: {
    ...mapState(["raceList", "resultList"]),
    filteredResultList() {
      return this.resultList.filter((result) => result.length > 0);
    },
  },
};
</script>

<style scoped>
h2 {
  @apply flex justify-center items-center w-full h-12 text-lg font-bold;
}

.grid > div > div {
  @apply max-h-[85vh] overflow-y-scroll;
}
</style>
