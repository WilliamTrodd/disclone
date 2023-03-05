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

const getAll = async () => {
  let data = <Server[]>[]
  const error: string = ""

  try{
    const response = await axios.get(baseUrl)
    data = response.data
  } catch (err) {
    console.log(error)
  }

  console.log()
    
  return data
}

export default { getAll };
