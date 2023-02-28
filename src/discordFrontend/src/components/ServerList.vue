<script setup lang="ts">
//import { ref } from "vue";
const props = defineProps(["servers"]);
</script>

<template>
  <div
    class="flex flex-col bg-dc-grey-800 w-fit px-2 mx-auto pt-2 content-center"
  >
    <div
      class="h-12 w-12 rounded-full mb-2 overflow-hidden bg-dc-grey-text hover:bg-dc-blue-800 hover:rounded-lg"
    ></div>
    <svg viewBox="0 0 100 20">
      <line x1="25" y1="0" x2="75" y2="0" class="stroke-dc-grey-text" />
    </svg>

    <div
      v-for="server in props.servers"
      :key="server._id"
      class="inline-block h-12 w-12 rounded-full mb-2 overflow-hidden bg-dc-blue-800 hover:rounded-lg transition-all duration-1000"
    >
      <img :src="server.icon" />
    </div>
  </div>
</template>
