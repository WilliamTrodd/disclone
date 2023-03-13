import { reactive } from 'vue'

interface Message {
  text: string
  channelId: string
  userId: string
}

export const store = reactive({
  currentServer: {id: '', name: '' },
  currentChannel: {id: '', name:''},
  messages: [],
  loggedInUser: '63f84cf878b9a5c96f8bf92d'
})

/*
Should I add serverList: {{serverName: __, serverIcon: __, serverId: __}, {...}}
same with channelList: {{channelName: __, channelId: __}}
*/