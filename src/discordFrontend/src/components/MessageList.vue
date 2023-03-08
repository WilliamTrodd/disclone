<script setup lang="ts">

const props = defineProps(["messages"]);

</script>

<template>
  <div class="bg-dc-grey-300 grow text-white flex flex-col-reverse overflow-y-auto">
    <div v-for="message in messages" :key="message._id" class="p-2 flex justify-between hover:bg-dc-grey-500">
      <div class="rounded-full w-8 h-8 bg-dc-blue-800 text-center align-middle mr-2">
        x
      </div>
      <div class="grow text-sm flex flex-col">
        <div>{{ message.user }} - {{ message.time }}</div>
        <div>{{ message.text }}</div>
      </div>
    </div>
  </div>
</template>
