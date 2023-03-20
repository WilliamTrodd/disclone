<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { store } from '../store'
import WS from '../services/ws'


interface NewMessage {
  text: string
  channelId: string
  userId: string
}

const text = ref('')

const sendMessage = async (text: string) => {
  const message: NewMessage = {
    text: text,
    channelId: store.currentChannel.id,
    userId: store.loggedInUser
  }
  try {
    const { data } = await axios.post(`http://localhost:3001/api/messages/`, message)
    WS.send(JSON.stringify(data))
    console.log(data)
  } catch (e) {
    console.log(e)
  }
}

const onSubmit = () => {
  sendMessage(text.value)
  text.value = ''
}
</script>

<template>
  <form v-on:submit.prevent="() => onSubmit()" class="bg-dc-grey-300 text-center px-4 relative shrink-0 -mt-2 leading-4">
    <div class="mb-6 relative w-full">
      <input placeholder="Message here" v-model.trim="text"
        class="-mt-2 py-[11px] px-2 min-w-full rounded-lg bg-dc-grey-100 text-sm focus:outline-0 focus:shadow-none" />
    </div>
  </form>
</template>
