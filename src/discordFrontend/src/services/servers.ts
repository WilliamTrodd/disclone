import axios from 'axios'
import { ref } from 'vue'
import { store } from '../store'
import { User, Channel, Server } from '../utils/types'
const apiUrl = import.meta.env.VITE_API_URL

export const getServers = async () => {
  try {
    const { data }  = await axios.get<Server[]>(`${apiUrl}/servers`)
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
    const {data}= await axios.get<Channel[]>(`${apiUrl}/channels/${serverId}`)
    store.currentChannel.id = data[0]._id
    store.currentChannel.name = data[0].name
    return data
  } catch (e) {
    console.error(e)
    throw new Error('Error fetching channels')
  }
}
