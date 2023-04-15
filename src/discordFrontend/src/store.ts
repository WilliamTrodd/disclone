import { reactive } from 'vue'

interface Message {
  text: string
  channelId: string
  userId: string
}

export const store = reactive({
  currentServer: {id: '', name: '' },
  currentChannel: {id: '', name:''},
  selectedUserId: '',
  messages: [],
  loggedInUser: {
    _id: '',
    firebaseId: '',
    username: '',
    profilePicture: '',
    memberOf: ['']
  },
  settingsModal: false
})

/*
Should I add serverList: {{serverName: __, serverIcon: __, serverId: __}, {...}}
same with channelList: {{channelName: __, channelId: __}}
*/