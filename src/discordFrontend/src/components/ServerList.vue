<script setup lang="ts">
import { store } from '../store'

const props = defineProps(["servers"]);

const changeServer = (name: string, id: string) => {
  store.currentServer.id = id
  store.currentServer.name = name
}
</script>

<template>
  <div class="flex flex-col bg-dc-grey-800 w-[72px] px-2 pt-2 content-center">
    <div
      class="h-12 w-12 rounded-[50%] mb-2 overflow-hidden bg-dc-grey-text hover:bg-dc-blue-800 transition-all duration-150 hover:rounded-[33%] hover:cursor-pointer">
    </div>
    <svg viewBox="0 0 100 20">
      <line x1="25" y1="0" x2="75" y2="0" class="stroke-dc-grey-text" />
    </svg>

    <div v-for="server in props.servers" :key="server._id"
      class="inline-block h-12 w-12 rounded-[50%] mb-2 overflow-hidden bg-dc-blue-800 transition-all ease-in hover:rounded-[33%] duration-150"
      @click="changeServer(server.name, server._id)">
      <img :src="server.icon" />
    </div>
  </div>
</template>
