<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue";
import ServerList from '../components/ServerList.vue';
import ChannelList from '../components/ChannelList.vue';
import ChatContainer from '../components/ChatContainer.vue'
import axios from "axios";
import { store } from '../store'

const apiUrl = import.meta.env.VITE_API_URL


interface Server {
  name: string
  _id: string
  icon: string
}
interface Channel {
  name: string
  _id: string
  serverId: string
}

const serversEmpty = ref(true)
const servers = ref<Server[]>([]) //TODO types to a new file, and import and use here
const channels = ref<Channel[]>([])

const getServers = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/servers`)
    servers.value = data
    store.currentServer.name = servers.value[0].name
    store.currentServer.id = servers.value[0]._id
    console.log(servers.value)
    serversEmpty.value = false
  } catch (e) {
    console.log(e)
  }
}

const getChannels = async (serverId: string) => {
  try {
    const { data } = await axios.get(`${apiUrl}/servers/${serverId}`)
    channels.value = data.channels
    store.currentChannel.id = channels.value[0]._id
    store.currentChannel.name = channels.value[0].name
  } catch (e) {
    console.log(e)
  }
}


onBeforeMount(() => {
  getServers()
  getChannels(store.currentServer.id)
})
/*
onMounted(() => {
  getMessages(servers.value[0]._id, channels[0].name)
})

*/

watch(store.currentServer, () => {
  getChannels(store.currentServer.id)
})


</script>


<template>
  <div v-if='servers' class="flex max-h-screen">
    <ServerList :servers="servers" />
    <ChannelList :channels="channels" />
    <ChatContainer />
  </div>
  <div v-else class="flex items-center justify-center">
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
  </div>
</template>

