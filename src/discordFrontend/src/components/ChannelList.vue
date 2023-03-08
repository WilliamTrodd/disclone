<script setup lang="ts">
import { onMounted, ref } from "vue"
import { store } from '../store'
import axios from 'axios'
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

const props = defineProps(["channels"])
const messages = ref([])


const setChannel = (name: string) => {
  store.currentChannel = name
  getMessages()
}

const getMessages = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/servers/${store.currentServer.id}/${store.currentChannel}`)
    console.log(response)
    messages.value = response.data.messages
    console.log(messages)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  getMessages()
})

</script>

<template>
  <div class="flex grow ">
    <div class="flex-none flex-col bg-dc-grey-500 w-80 px-2 min-h-screen">
      <div class="flex h-12 mb-2">{{ store.currentServer.name }}</div>
      <hr class="-mx-2">
      <div v-for="channel in props.channels" :key="channel._id"
        class="mt-2 p-1 px-2 text-dc-grey-text rounded-md hover:bg-dc-grey-100 hover:text-white hover:cursor-pointer"
        @click="setChannel(channel.name)">
        # {{ channel.name }}
      </div>
    </div>
    <div class="flex grow flex-col max-h-screen">
      <MessageList :messages="messages" />
      <MessageInput />
    </div>
  </div>
</template>
