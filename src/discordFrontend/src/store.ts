import { reactive } from 'vue'

interface Message {
  text: string
  channelId: string
  userId: string
}

interface User {
  _id: string
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}
// move to using Pinia for better TS integration
export const store = reactive({
  currentServer: {id: '', name: '' },
  currentChannel: {id: '', name:''},
  selectedUserId: '',
  messages: [] as Message[],
  loggedInUser: {
    _id: '',
    firebaseId: '',
    username: '',
    profilePicture: '',
    memberOf: ['']
  },
  settingsModal: false,
  users: [] as User[],
})

/*
Should I add serverList: {{serverName: __, serverIcon: __, serverId: __}, {...}}
same with channelList: {{channelName: __, channelId: __}}
*/