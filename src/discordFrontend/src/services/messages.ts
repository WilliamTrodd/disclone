import axios from 'axios'
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


export default { create, setToken }