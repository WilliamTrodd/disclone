import axios from 'axios'
import { ref } from 'vue'
import { store } from '../store'
const apiUrl = import.meta.env.VITE_API_URL

interface User {
  _id: string,
  username: string,
  memberOf: string[]
  profilePic: string
}

interface Message {
  _id: string,
  text: string,
  user: User,
  time: Date
}

interface Channel {
  _id: string,
  name: string,
  serverId: string
}

interface Server {
  _id: string,
  name: string,
  icon: string,
  users: User[],
  channels: Channel[],
}

export const getServers = async () => {
  try {
    const { data }: {data: Server[]} = await axios.get(`${apiUrl}/servers`)
    store.currentServer.name = data[0].name
    store.currentServer.id = data[0]._id
    return data
  } catch (e) {
    console.error(e)
    throw new Error('Error fetching servers')
  }
}

export const getChannels = async (serverId: string) => {
  try {
    const {data}: {data: Channel[]} = await axios.get(`${apiUrl}/channels/${serverId}`)
    store.currentChannel.id = data[0]._id
    store.currentChannel.name = data[0].name
    return data
  } catch (e) {
    console.error(e)
    throw new Error('Error fetching channels')
  }
}

const getMessages = async (serverId: string, channel: string) => {
  let messages

  try {
    const response = await axios.get(`${apiUrl}/servers/${serverId}/${channel}`)
    messages = response.data.messages
  } catch (e) {
    console.log(e)
  }

  return messages
}
