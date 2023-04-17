<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, ref } from 'vue'
import Message from './Message.vue'
import messageService from '../services/messages'
import { store } from '../store'


//todo pagination

const props = defineProps(['messages']);
const scrollComponent = ref(null)

const scrollToLatest = () => {
  const chatBottom = document.getElementById('chatBottom')
  chatBottom?.scrollIntoView(false)
}

onMounted(() => {
  document.getElementById('chat')?.addEventListener('scroll', onScroll)
  scrollToLatest()
})

onUpdated(() => {
  // TODO - only scroll to latest if the user is already at the bottom of the chat
  // TODO - stop scrolling if the user is in another chat
  //something to do with store.currentServer but I need to think about this some more
  scrollToLatest()
})

onUnmounted(() => {
  document.getElementById('chat')?.removeEventListener('scroll', onScroll)
})

const onScroll = (async (e) => {
  const element = e.target
  if (element.scrollTop === 0 && store.messages.length < store.messageCount) {
    store.messagePage++
    let x = element.scrollHeight
    await messageService.getMessages()
    let y = element.scrollHeight - x
    element.scrollTo(0, y)
  }
})

</script>

<template>
  <!--TODO split up by day and merge message by user-->
  <div class="relative flex grow shrink basis-auto min-h-0 min-w-0 z-0">
    <div id="chat"
      class="absolute bg-dc-grey-200 top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-hidden overscroll-none">
      <div class=" flex relative min-h-full items-stretch justify-end">
        <ol class="bg-dc-grey-300 text-white flex grow flex-col overflow-hidden relative leading-4 justify-end">
          <div v-for="message in messages" :key="message._id" class="p-2 flex justify-between hover:bg-dc-grey-500">
            <Message :username="message.user.username" :text="message.text" :timestamp="message.timestamp" />
          </div>
          <div id="chatBottom" class="h-[30px] w-[1px] block"></div>
        </ol>
      </div>
    </div>
  </div>
</template>
