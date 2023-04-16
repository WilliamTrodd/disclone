import messageService from './messages'
import {getUsers} from './users'

const WS = new WebSocket('ws://localhost:3001')

WS.onmessage = (event) => {
  const data = JSON.parse(event.data)
  switch(data.type) {
    case 'message':
      messageService.getMessages()
      break
    case 'updateUser':
      console.log('updated user')
      getUsers()
      messageService.getMessages()
      break
  }
}


export default WS