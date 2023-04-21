<script setup lang="ts">
import { store } from '../store'
import IconChannelHash from './icons/IconChannelHash.vue';

const props = defineProps(["channels"])

const setChannel = (name: string, id: string) => {
  store.currentChannel.name = name
  store.currentChannel.id = id

}

</script>

<template>
  <div class="flex grow">
    <div class="flex-none flex-col bg-dc-grey-500 w-60 ">
      <div
        class="flex cursor-pointer shadow-1ch h-12 mb-2 px-4 py-3 bg-dc-grey-500 hover:bg-dc-grey-200 transition-colors duration-100 text-white">
        {{ store.currentServer.name }}
      </div>
      <div class="pt-2">
        <div v-for="channel in props.channels" :key="channel._id" @click="setChannel(channel.name, channel._id)">
          <div
            class="mx-2 px-2 py-[1px] leading-4 text-dc-grey-text rounded-[4px] hover:bg-dc-grey-100 hover:text-white hover:cursor-pointer"
            :class="{ ['bg-dc-grey-100 text-white']: channel._id === store.currentChannel.id }">
            <div class="flex py-[6px]">
              <div class="mr-[6px] ">
                <IconChannelHash />
              </div>
              {{ channel.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
