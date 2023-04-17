import { reactive } from 'vue'

interface User {
  _id: string
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}
interface Message {
  text: string
  channelId: string
  userId: string
  timestamp: Date
  _id: string
  user: User
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
  messagePage: 1,
  messageCount: 0,
})

/*
Should I add serverList: {{serverName: __, serverIcon: __, serverId: __}, {...}}
same with channelList: {{channelName: __, channelId: __}}
*/