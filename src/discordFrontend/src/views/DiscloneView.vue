<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue";
import ServerList from '../components/ServerList.vue';
import ChannelList from '../components/ChannelList.vue';
import ChatContainer from '../components/ChatContainer.vue'
import SignUp from '../components/SignUp.vue';
import { store } from '../store'
import { getServers, getChannels } from '../services/servers'
import { findUser } from '../services/users'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserPanel from "../components/UserPanel.vue";



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

const servers = ref<Server[]>([])
const channels = ref<Channel[]>([])

onBeforeMount(async () => {
  const auth = getAuth()
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      store.loggedInUser = await findUser(user.uid)
      console.log(store.loggedInUser)
    } else {
      console.log('no user')
    }
  })
})

onBeforeMount(async () => {
  servers.value = await getServers()
  console.log(servers.value)
  channels.value = await getChannels(store.currentServer.id)
  console.log(store.loggedInUser.username)
})

watch(store.currentServer, async () => {
  channels.value = await getChannels(store.currentServer.id)
  console.log(channels.value)
})
</script>


<template>
  <div v-if='!store.loggedInUser.username' class="min-h-screen flex">
    <div v-if='servers' class="flex grow">
      <ServerList :servers="servers" />
      <div class="flex flex-col">
        <ChannelList :channels="channels" />
        <UserPanel />
      </div>
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
  </div>
  <div v-else>
    <SignUp />
  </div>
</template>

