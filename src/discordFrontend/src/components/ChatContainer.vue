<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { store } from '../store'
import messageService from '../services/messages'
import MessageList from './MessageList.vue'
import MessageInput from './MessageInput.vue'
import UserList from './UserList.vue'
import ChatBanner from './ChatBanner.vue'

onMounted(() => {
  messageService.getMessages()
})

watch(store.currentChannel, () => {
  store.messages = []
  store.messagePage = 1
  messageService.getMessages()
})

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
