<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { store } from '../store'
import axios from 'axios'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'

interface User {
  _id: string
  memberOf: []
  username: string
  profilePicture: string
}

interface Message {
  text: string
  channelId: string
  user: User
  timestamp: Date
  _id: string
}

const messages = ref<Message[]>([])

const getMessages = async () => {
  try {
    const response = await axios.get(`http://localhost:3001/api/channels/${store.currentChannel.id}`)
    messages.value = response.data
  } catch (e) {
    console.log(e)
  }
}

watch(store.currentChannel, () => {
  getMessages()
})

</script>

<template>
  <div class="flex grow flex-col max-h-screen">
    <MessageList :messages="messages" />
    <MessageInput />
  </div>
</template>