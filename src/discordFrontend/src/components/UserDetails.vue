<script setup lang="ts">
import { reactive, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { getUserDetails } from '../services/users'
import { store } from '../store'

const hover = ref<Boolean>(false)

interface User {
  _id: string
  username: string
  profilePicture: string
  memberOf: string[]
}

const user = ref<User>({} as User);
/*
onMounted(async () => {
  //user.value = await getUserDetails(store.selectedUserId);
  hover.value = true
});*/

watch(() => store.selectedUserId, async () => {
  if (store.selectedUserId !== '') {
    user.value = await getUserDetails(store.selectedUserId);
  }
});



</script>

<template>
  <Teleport to="body">
    <div v-if="store.selectedUserId != ''">
      <div class="absolute top-24 right-60 pointer-events-auto z-50">
        <div id="user-popout"
          class="max-h-[calc(100vh-28px)] overflow-hidden rounded-lg z-50 bg-dc-grey-700 flex flex-col">
          <svg class="min-w-[340px] min-h-[60px] z-0" viewBox="0 0 340 60">
            <mask id=":popoutBanner:">
              <rect fill="white" x="0" y="0" width="100%" height="100%"></rect>
              <circle fill="black" cx="62" cy="56" r="46"></circle>
            </mask>
            <foreignObject x="0" y="0" width="100%" height="100%" mask="url(#:popoutBanner:)">
              <div class="bg-dc-blue-800 w-full h-[60px]">
                <div></div>
              </div>
            </foreignObject>
          </svg>
          <div
            class="relative top-3 right-4 self-end w-fit flex flex-wrap justify-end items-center gap-[2px] min-h-[22px]">
          </div>
          <div class="top-[16px] left-[22px] absolute cursor-pointer rounded-[50%]">
            <div class="w-20 h-20" role="img">
              <svg class="h-[92px] w-[92px]" viewBox="0 0 92 92">
                <mask id=":r7:" width="80" height="80">
                  <circle cx="40" cy="40" r="40" fill="white"></circle>
                </mask>
                <foreignObject x="0" y="0" class="w-20 h-20" mask="url(#:r7:)">
                  <div class="grid w-full h-full">
                    <img class="w-full h-full" src="../assets/defaultDiscordAvatar.png" />
                  </div>

                </foreignObject>
                <svg x="48" y="52" width="40" height="24" viewBox="0 0 40 24" class="cursorDefault-2M8ZNp">
                  <mask id=":rb:">
                    <rect x="12" y="8" width="16" height="16" rx="8" ry="8" fill="white"></rect>
                    <rect x="10" y="6" width="12" height="12" rx="6" ry="6" fill="black"></rect>
                    <polygon points="-3.464096,-4 3.464096,0 -3.464096,4" fill="black"
                      transform="scale(0) translate(21 16)" style="transform-origin: 21px 16px 0px;"></polygon>
                    <circle fill="black" cx="20" cy="16" r="0"></circle>
                  </mask>
                  <rect fill="#f0b232" width="40" height="24" mask="url(#:rb:)"></rect>
                </svg>
              </svg>
            </div>
          </div>
          <div class="mt-7 mx-4 mb-4 relative rounded-lg bg-[#111214] flex flex-col">
            <div id="usernameSection" class="pt-3 px-3">
              <div>
                <h1 class="break-words text-white text-xl font-semibold">
                  {{ user.username }}
                </h1>
                <div class="leading-[18px] text-sm font-medium">
                  <!-- TODO userid here -->
                  <span class="text-dc-grey-text">{{ user._id?.substring(0, 4) }}</span>
                  <span class="text-dc-grey-text">#{{ user._id?.substring(4, 9) }}</span>
                </div>
              </div>
            </div>
            <div class="mt-3 mx-3 h-[1px] sticky top-0 bg-dc-grey-100"></div>
            <div id="userProfileScroller" class="overflow-scroll px-3 grow-0 shrink basis-auto">
              <div class="pt-3">
                <h2 class="flex font-bold mb-[6px] text-white text-xs uppercase">
                  Member Since
                </h2>
                <div class="flex gap-x-2 items-center">
                  <svg aria-label="Discord" class="h-4 w-4" aria-hidden="false" role="img" width="28" height="20"
                    viewBox="0 0 28 20">
                    <path fill="#b5bac1"
                      d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z">
                    </path>
                  </svg>
                  <div class="text-dc-grey-text text-sm leading-[18px] font-normal">
                    <!-- TODO user join date -->
                    Sep 21, 2021
                  </div>
                  <div class="h-1 w-1 rounded-[50%] bg-dc-grey-text">
                    <!-- TODO current server icon -->
                  </div>
                  <div class="text-dc-grey-text text-sm leading-[18px] font-normal">
                    <!-- TODO Server join date-->
                    Feb 27, 2023
                  </div>
                </div>
              </div>
              <div class="pt-3">
                <h2 class="uppercase mb-3 font-bold flex text-white text-xs">
                  No roles
                </h2>
              </div>
              <div class="py-3">
                <h2 class="uppercase mb-3 font-bold flex text-white text-xs">
                  Note
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>