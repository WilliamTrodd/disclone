import {getUsers} from './users'
import {store} from '../store'

const WS = new WebSocket('ws://localhost:3001')

WS.onmessage = (event) => {
  const data = JSON.parse(event.data)
  switch(data.type) {
    case 'message':
      if(store.currentChannel === data.data[0].channelId)
        {store.messages.push(data.data[0])}
      break
    case 'updateUser':
      console.log(data.value.value)
      store.messages = store.messages.map(
        (message) => message.userId === data.value.value._id 
        ? {...message, user: {...message.user, username: data.value.value.username}} 
        : message
      )
      break
  }
}


export default WS