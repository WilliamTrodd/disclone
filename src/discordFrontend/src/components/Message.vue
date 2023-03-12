<script setup lang="ts">
const props = defineProps(['username', 'text', 'timestamp'])
</script>

<template>
  <div class="grow text-sm flex flex-col">
    <div class="flex flex-row align-baseline">
      <div class="text-sm">{{ props.username }}</div>
      <div class="text-xs">{{ new Date(props.timestamp).toLocaleTimeString() }}</div>
    </div>
    <div>{{ props.text }}</div>
  </div>
</template>