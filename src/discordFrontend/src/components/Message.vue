<script setup lang="ts">
const props = defineProps(['username', 'text', 'timestamp', 'userDetails'])

</script>

<template>
  <li class="text-sm relative justify-between hover:bg-dc-grey-500" :class="[userDetails ? 'p-2' : 'px-2 py-1']">
    <img v-if="props.userDetails" src="../assets/defaultDiscordAvatar.png"
      class="rounded-full w-10 h-10 left-4 absolute" />
    <div class="pl-[72px]">
      <h3 v-if="props.userDetails" class="">
        <span class="mr-1">
          <span class="font-medium align-baseline">
            {{ props.username }}
          </span>
        </span>
        <span class="ml-1 text-dc-grey-text text-xs font-medium leading-[1.375rem]">
          <time class="">{{ new Date(props.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          }}</time>
        </span>
      </h3>
      <div class="leading-[1.375rem]">{{ props.text }}</div>
    </div>
  </li>
</template>