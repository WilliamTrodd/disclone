<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth';
import { store } from '../store'
import { onMounted, ref } from 'vue';
import { updateUsername } from '../services/users'
import WS from '../services/ws';

//going to implement user detail changing here (e.g. change username, change profile picture, etc.)

const signOutUser = () => {
  const auth = getAuth()
  signOut(auth).then(() => {
    store.loggedInUser = {
      _id: '',
      firebaseId: '',
      username: '',
      profilePicture: '',
      memberOf: ['']
    }
    store.settingsModal = false
  }).catch((error: string) => {
    throw new Error(error)
  })
}

const setDisplayName = async (newName: string) => {
  store.loggedInUser.username = newName
  displayName.value = newName
  const data = await updateUsername(store.loggedInUser)
  WS.send(JSON.stringify(data))
}

const displayName = ref('')

onMounted(() => {
  if (displayName.value !== '') {
    displayName.value = store.loggedInUser.username
  }
})

</script>

<template>
  <Teleport to="body">
    <div v-if="store.settingsModal === true">
      <div class="absolute bg-dc-grey-200 z-50 top-1/3 left-1/3 rounded-lg overflow-hidden">
        <div id="settings-popout" class="w-96 h-60 flex flex-col">
          <svg class="z-0" viewBox="0 0 340 60">
            <foreignObject x="0" y="0" width="100%" height="100%">
              <div class="bg-dc-blue-800 h-[60px] flex items-center">
                <h1 class="pl-3 text-dc-grey-800 text-2xl font-semibold mb-2">Settings</h1>
              </div>
            </foreignObject>
          </svg>
          <div class="mt-3 mx-3 h-[1px] sticky top-0 bg-dc-grey-100"></div>
          <div class="grid grid-cols-3 grid-rows-2 gap-2 p-4">
            <input id="displayName" class="bg-dc-grey-700 col-span-2 text-dc-grey-text rounded-sm outline-none px-2"
              v-model="displayName" />
            <button class="text-xs bg-dc-blue-100 uppercase text-white font-medium p-2 rounded-md"
              @click="setDisplayName(displayName)">
              Set Display Name
            </button>
            <span></span>
            <span></span>
            <button @click="signOutUser" class="p-2 rounded-md bg-dc-blue-100 text-white w-full">Sign Out</button>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>