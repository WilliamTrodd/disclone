<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { store } from '../store'


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
    const response = await axios.post(`http://localhost:3001/api/messages/`, message)
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

const onSubmit = () => {
  console.log(text.value)
  sendMessage(text.value)
  text.value = ''
}
</script>

<template>
  <div class="h-24 bg-dc-grey-300 text-center px-2">
    <form v-on:submit.prevent="() => onSubmit()">
      <input placeholder="Message here" v-model.trim="text"
        class="-mt-2 p-2 min-w-full rounded-md bg-dc-grey-100 text-sm focus:outline-0 focus:shadow-none" />
    </form>
  </div>
</template>
