<script setup lang="ts">
import { store } from '../store'

const props = defineProps(["servers"]);

const changeServer = (name: string, id: string) => {
  store.currentServer.id = id
  store.currentServer.name = name
}

const hoverWatcher = () => {

}
</script>

<template>
  <div class="flex flex-col bg-dc-grey-800 w-[72px] pt-2 content-center">
    <div class="w-[72px] items-center flex relative mb-2 justify-center">
      <div class="absolute left-0 top-0 w-2 h-12 flex justify-start overflow-hidden items-center">
        <span
          class="opacity-100 absolute w-2 h-2 rounded-[4px] -ml-1 bg-white transition-all ease-in hover:h-5 hover:block"></span>
        <!-- TODO change size on hover -->
      </div>
      <div
        class="h-12 w-12 rounded-[50%] mb-2 overflow-hidden bg-dc-grey-text hover:bg-dc-blue-800 transition-all duration-150 hover:rounded-[33%] hover:cursor-pointer">
      </div>
    </div>

    <svg viewBox="0 0 100 20">
      <line x1="25" y1="0" x2="75" y2="0" class="stroke-dc-grey-text" />
    </svg>

    <div v-for="server in props.servers" :key="server._id"
      class="h-[48px] w-[72px] relative flex justify-center items-center mb-2">
      <div class="h-12 w-12 bg-slate-400 cursor-pointer hover:rounded-[33%] hover:cursor-pointer"
        @click="changeServer(server.name, server._id)"
        :class="[server._id === store.currentServer.id ? 'rounded-[33%]' : 'rounded-[50%] [&:hover>#pill-container>#pill]:h-5']">
        <div id="pill-container"
          class="h-[48px] w-2 absolute left-0 top-0 flex justify-start items-center pointer-events-none">
          <span id="pill"
            class="opacity-100 absolute w-2 rounded-[4px] -ml-1 bg-white pointer-events-none transition-all ease-in"
            :class="[server._id === store.currentServer.id ? 'h-10' : 'h-2']">
          </span>
        </div>
      </div>
    </div>


  </div>
</template>
