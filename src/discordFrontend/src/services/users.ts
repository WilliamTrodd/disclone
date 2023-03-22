import axios from 'axios'
import {store} from '../store'
const apiUrl = import.meta.env.VITE_API_URL

interface User {
  _id: string,
  username: string,
  memberOf: string[]
  profilePicture: string
}

export const getUsers = async () => {
  try {
    const {data}: {data: User[]} = await axios.get(`${apiUrl}/users/${store.currentServer.id}`)
    return data
  } catch (e){
    throw new Error('Error fetching users')
  }
}