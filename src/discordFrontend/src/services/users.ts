import axios from 'axios'
import {store} from '../store'
const apiUrl = import.meta.env.VITE_API_URL

interface User {
  _id: string
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}

interface NewUser {
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}

export const getUsers = async () => {
  try {
    const {data}: {data: User[]} = await axios.get(`${apiUrl}/users/server/${store.currentServer.id}`)
    return data
  } catch (e){
    throw new Error('Error fetching users')
  }
}

export const findUser = async (userFbId: string) => {
  try {
    const {data}: {data: User} = await axios.get(`${apiUrl}/users/user/${userFbId}`)
    return data
  } catch (e) {
    throw new Error('Error fetching logged in user')
  }
}

export const createUser = async (user: NewUser) => {
  try {
    const {data}: {data: User} = await axios.post(`${apiUrl}/users`, user)
    return data
  } catch (e) {
    throw new Error('Error creating user')
  }
}