<script setup lang="ts">
//import { ref } from "vue";
const props = defineProps(["channels"]);
</script>

<template>
  <div class="flex flex-col bg-dc-grey-500 w-80 px-2 min-h-screen">
    <div
      v-for="channel in props.channels"
      :key="channel._id"
      class="p-1 px-2 text-dc-grey-text rounded-md hover:bg-dc-grey-100 hover:text-white"
    >
      # {{ channel.name }}
    </div>
  </div>
</template>
