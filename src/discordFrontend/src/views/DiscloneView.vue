<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue";
import ServerList from '../components/ServerList.vue';
import ChannelList from '../components/ChannelList.vue';
import axios from "axios";
import { store } from '../store'


const serversEmpty = ref(true)
const servers: any = ref([])
const channels: any = ref([])

const getServers = async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/servers')
    servers.value = response.data
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
    const response = await axios.get(`http://localhost:3001/api/servers/${serverId}`)
    channels.value = response.data.channels
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
  <div v-if='servers' class="flex justify-start">
    <ServerList :servers="servers" />
    <ChannelList :channels="channels" />
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

