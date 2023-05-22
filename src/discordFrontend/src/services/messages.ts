import axios from 'axios'
import { store } from '../store'
const baseUrl = import.meta.env.VITE_API_URL
import { Message, NewMessage } from '../utils/types'

let token: string = ''

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`
}

const create = async (newMessage: NewMessage) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post<Message>(`${baseUrl}/messages/`, newMessage, config)
  return response.data
}

interface PagedData {
  messages: {
    data: Message[]
    metadata: {
      totalCount: number
    }
  }
}

const getMessages = async () => {
  try {
    const pagedData = await axios.get<PagedData>(`${baseUrl}/channels/${store.currentServer.id}/${store.currentChannel.id}/${store.messagePage}`,
    {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
    store.messageCount = pagedData.data.messages.metadata.totalCount
    store.messages = [...pagedData.data.messages.data, ...store.messages]
  } catch (e) {
    console.log(e)
  }
}

export default { create, setToken, getMessages }