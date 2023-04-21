<script setup lang='ts'>
const props = defineProps(['timestamp'])

const date = new Date(props.timestamp).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })


</script>

<template>
  <div
    class="mb-2 mt-8 ml-4 mr-[0.875rem] h-0 flex relative left-auto right-auto  border-solid border-t-[1px] border-dc-grey-50 items-center justify-center">
    <span
      class="block rounded-lg grow-0 shrink-0 basis-auto py-[2px] px-1 -mt-[1px] font-semibold text-xs leading-[13px] text-dc-grey-text bg-dc-grey-300">
      {{ date }}</span>
  </div>
</template>