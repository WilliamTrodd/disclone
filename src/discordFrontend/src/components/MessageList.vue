<script setup lang="ts">
import { computed, onMounted, onUnmounted, onUpdated } from 'vue'
import Message from './Message.vue'
import DateSeparator from './DateSeparator.vue'
import messageService from '../services/messages'
import { store } from '../store'


const scrollToLatest = () => {
  // this could be updated to instead show a small notification that there are new messages
  const chatBottom = document.getElementById('chatBottom')
  chatBottom?.scrollIntoView(false)
}

onMounted(() => {
  document.getElementById('chat')?.addEventListener('scroll', onScroll)
  scrollToLatest()
})

onUpdated(() => {
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

const showUserDetails = (msgIndex: number) => {
  if (store.messages[msgIndex - 1]) {
    if (store.messages[msgIndex].user._id === store.messages[msgIndex - 1].user._id) {
      return false
    }
  }
  return true
}

</script>

<template>
  <!--TODO split up by day and merge message by user-->
  <div class="relative flex grow shrink basis-auto min-h-0 min-w-0 z-0">
    <div id="chat"
      class="absolute bg-dc-grey-200 top-0 bottom-0 left-0 right-0 overflow-y-scroll overflow-hidden overscroll-none">
      <div class=" flex relative min-h-full items-stretch justify-end">
        <ol class="bg-dc-grey-300 text-white flex grow flex-col overflow-hidden relative leading-4 justify-end">
          <!-- TODO - split the messages up by day and also by user so only one avatar is shown -->
          <div v-for="(message, msgIndex) in store.messages" :key="message._id + message.timestamp">
            <template v-if="store.messages[msgIndex - 1]">
              <div
                v-if="message.timestamp.toString().substring(0, 10) !== store.messages[msgIndex - 1].timestamp.toString().substring(0, 10)">
                <DateSeparator :timestamp="message.timestamp" />
              </div>
            </template>
            <Message :username="message.user ? message.user.username : 'Deleted User'" :text="message.text"
              :timestamp="message.timestamp" :userDetails="showUserDetails(msgIndex)" />
          </div>
          <div id="chatBottom" class="h-[30px] w-[1px] block"></div>
        </ol>
      </div>
    </div>
  </div>
</template>
