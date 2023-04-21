import { reactive } from 'vue'
import { User, Message } from './utils/types'

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