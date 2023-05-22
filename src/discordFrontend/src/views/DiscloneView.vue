<script setup lang="ts">
import { onBeforeMount, onMounted, onUpdated, ref, watch } from "vue"
import ServerList from '../components/ServerList.vue'
import ChannelList from '../components/ChannelList.vue'
import ChatContainer from '../components/ChatContainer.vue'
import SignUp from '../components/SignUp.vue';
import { store } from '../store'
import { getServers, getChannels } from '../services/servers'
import { findUser } from '../services/users'
import messageService from "../services/messages"
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import UserPanel from "../components/UserPanel.vue"
import UserDetails from "../components/UserDetails.vue";
import Settings from "../components/Settings.vue";
import { Server, Channel } from '../utils/types'

const servers = ref<Server[]>([])
const channels = ref<Channel[]>([])
const uid = ref()

//TODO split the Signin and Main view into two different views using the Router
//at the moment, the signin page is shown briefly before the main view is loaded

const auth = getAuth()
onAuthStateChanged(auth, async (user) => {
  console.log(auth.currentUser)
  if (user) {
    const loggedIn = await findUser(user.uid)
    const userToken = await user.getIdToken()
    uid.value = userToken
    messageService.setToken(userToken)
    store.loggedInUser = loggedIn
  } else {
    console.log('no user')
  }
})

onBeforeMount(async () => {
  uid.value = await auth.currentUser?.getIdToken()
  servers.value = await getServers()
  channels.value = await getChannels(store.currentServer.id)
})

watch(store.currentServer, async () => {
  channels.value = await getChannels(store.currentServer.id)
})

const modalCloser = () => {
  if (store.selectedUserId !== '') {
    store.selectedUserId = ''
  }
  if (store.settingsModal === true) {
    store.settingsModal = false
  }
}

</script>


<template>
  <div v-if='uid' class="min-h-screen flex" @click="modalCloser">
    <UserDetails />
    <Settings />
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

