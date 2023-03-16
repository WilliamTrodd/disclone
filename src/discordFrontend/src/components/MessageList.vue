<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import Message from './Message.vue'

const props = defineProps(['messages']);

onMounted(() => {
  console.log(props.messages)

})

</script>

<template>
  <div class="bg-dc-grey-300 text-white flex flex-col-reverse overflow-y-scroll grow">
    <div v-for="message in messages" :key="message._id" class="p-2 flex justify-between hover:bg-dc-grey-500">
      <div class="rounded-full w-8 h-8 bg-dc-blue-800 text-center align-middle mr-2">
        x
      </div>
      <Message :username="message.user.username" :text="message.text" :timestamp="message.timestamp" />
    </div>
  </div>
</template>
