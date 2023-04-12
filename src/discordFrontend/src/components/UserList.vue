<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue'
import { store } from '../store'
import { getUsers } from '../services/users'

interface User {
  _id: string
  username: string
  profilePicture: string
  memberOf: string[]
}

const users = ref<User[]>([])

onBeforeMount(async () => {
  users.value = await getUsers()
})

watch(store.currentServer, async () => {
  users.value = await getUsers()
})

const userClickHandler = (userId: string) => {
  store.selectedUserId = userId
}

</script>

<template>
  <div class="flex flex-col bg-dc-grey-500 text-dc-grey-text-200">
    <div class="w-[240px]">
      <h3 class="pt-6 pl-4 pr-2 text-xs leading-4 h-10 uppercase">
        Online
      </h3>
      <div v-for="user in users" :key="user._id" class="relative max-w-[224px] ml-2 py-[1px]"
        @click.stop="() => userClickHandler(user._id)">
        <div class="flex items-center rounded-[4px] h-[42px] px-2 hover:bg-dc-grey-100 cursor-pointer">
          <div class="rounded-full">
            <div class="flex justify-center w-8 h-8 mr-3">
              <svg width="40" height="40" viewBox="0 0 40 40" class="absolute">
                <mask id=":round:" width="32" height="32">
                  <circle cx="16" cy="16" r="16" fill="white"></circle>
                  <!-- TODO: this can be used to mask the area for statuses rect color="black" x="19" y="19" width="16" height="16" rx="8" ry="8"></rect -->
                </mask>
                <foreignObject x="0" y="0" width="32" height="32" mask="url(#:round:)">
                  <img src="../assets/defaultDiscordAvatar.png" />
                </foreignObject>
              </svg>
            </div>
          </div>
          <div class="flex grow shrink basis-auto">
            <div class="flex items-center justify-start">
              <div class="font-medium flex grow-0 shrink basis-auto leading-5 text-base">
                <span class="overflow-ellipsis overflow-hidden">{{ user.username }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>