import { reactive } from 'vue'

export const store = reactive({
  currentServer: {id: "", name: "" },
  currentChannel: {id: "", name:""},
  messages: [],
})

/*
Should I add serverList: {{serverName: __, serverIcon: __, serverId: __}, {...}}
same with channelList: {{channelName: __, channelId: __}}
*/