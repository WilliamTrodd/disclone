import { reactive } from 'vue'

export const store = reactive({
  currentServer: {id: "", name: "" },
  currentChannel: {id: "", name:""},
  messages: [],
})