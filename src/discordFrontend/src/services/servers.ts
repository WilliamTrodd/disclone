import axios from 'axios'
import { ref } from 'vue'
const baseUrl = 'http://localhost:3001/api/servers';

interface User {
  _id: string,
  name: string,
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
  messages: Message[]
}

interface Server {
  _id: string,
  name: string,
  icon: string,
  users: User[],
  channels: Channel[],
}

const getServers = async () => {
  let servers: Server[] = []
  
  try {
    const response = await axios.get('http://localhost:3001/api/servers')
    servers = response.data
  } catch (e) {
    console.log(e)
  }

  return servers
}

const getChannels = async (serverId: string) => {
  let channels

  try {
    const response = await axios.get(`http://localhost:3001/api/servers/${serverId}`)
    console.log('Channels')
    console.log(response)
    channels = response.data.channels
  } catch (e) {
    console.log(e)
  }

  return channels
}

const getMessages = async (serverId: string, channel: string) => {
  let messages

  try {
    const response = await axios.get(`http://localhost:3001/api/servers/${serverId}/${channel}`)
    console.log(response)
    messages = response.data.messages
  } catch (e) {
    console.log(e)
  }

  return messages
}

export default { getServers, getChannels, getMessages };