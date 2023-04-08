<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { store } from '../store'
import axios from 'axios'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import UserList from './UserList.vue'
import ChatBanner from './ChatBanner.vue'
import WS from '../services/ws'

const apiUrl = import.meta.env.VITE_API_URL

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
    const response = await axios.get(`${apiUrl}/channels/${store.currentServer.id}/${store.currentChannel.id}`)
    messages.value = response.data
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  getMessages()
})

watch(store.currentChannel, () => {
  getMessages()
})

WS.onmessage = (event) => {
  console.log('Message received')
  getMessages()
}

</script>

<template>
  <div class="flex flex-col grow relative">
    <ChatBanner />
    <div class="flex flex-row grow overflow-auto">
      <div class="flex flex-col grow w">
        <MessageList :messages="messages" />
        <MessageInput />
      </div>
      <UserList />
    </div>
  </div>
</template>
