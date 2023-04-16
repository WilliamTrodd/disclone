<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { store } from '../store'
import messageService from '../services/messages'
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
/*
const getMessages = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/channels/${store.currentServer.id}/${store.currentChannel.id}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
    store.messages = response.data
  } catch (e) {
    console.log(e)
  }
}
*/
onMounted(() => {
  messageService.getMessages()
})

watch(store.currentChannel, () => {
  messageService.getMessages()
})
/*
WS.onmessage = async (event) => {
  console.log('message received')
  await getMessages()
}
*/
</script>

<template>
  <div class="flex flex-col grow relative">
    <ChatBanner />
    <div class="flex flex-row grow overflow-auto">
      <div class="flex flex-col grow w">
        <MessageList :messages="store.messages" />
        <MessageInput />
      </div>
      <UserList />
    </div>
  </div>
</template>
