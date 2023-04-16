import axios from 'axios'
import { store } from '../store'
const baseUrl = import.meta.env.VITE_API_URL

interface NewMessage {
  text: string
  channelId: string
  userId: string
}

let token: string = ''

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const create = async (newMessage: NewMessage) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/messages/`, newMessage, config)
  return response.data
}

const getMessages = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/channels/${store.currentServer.id}/${store.currentChannel.id}`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )
    store.messages = response.data
  } catch (e) {
    console.log(e)
  }
}


export default { create, setToken, getMessages }