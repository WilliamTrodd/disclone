import messageService from './messages'
import {getUsers} from './users'
import {store} from '../store'

const WS = new WebSocket('ws://localhost:3001')

WS.onmessage = (event) => {
  const data = JSON.parse(event.data)
  switch(data.type) {
    case 'message':
      store.messages.push(data.data[0])
      messageService.getMessages()
      break
    case 'updateUser':
      console.log(data.value)
      getUsers()
      messageService.getMessages()
      break
  }
}


export default WS