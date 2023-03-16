<script setup lang="ts">
import { store } from '../store'
import IconChannelHash from './icons/IconChannelHash.vue';
</script>

<template>
  <div class="flex cursor-pointer shadow-1ch h-12 px-4 py-3 bg-dc-grey-300 transition-colors duration-100 text-white z-0">
    <IconChannelHash />
    {{ store.currentChannel.name }}
  </div>
</template>