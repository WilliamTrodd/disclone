import axios from 'axios'
import {store} from '../store'
import { User, NewUser } from '../utils/types'
import { getAuth } from 'firebase/auth'
const apiUrl = import.meta.env.VITE_API_URL


export const getUsers = async () => {
  try {
    const auth = getAuth()
    if(auth.currentUser){
      const {data} = await axios.get<User[]>(`${apiUrl}/users/server/${store.currentServer.id}`)
      store.users = data
    }
  } catch (e){
    throw new Error('Error fetching users')
  }
}

export const findUser = async (userFbId: string) => {
  try {
    const {data}= await axios.get<User>(`${apiUrl}/users/loggedIn/${userFbId}`)
    return data
  } catch (e) {
    throw new Error('Error fetching logged in user')
  }
}

export const createUser = async (user: NewUser) => {
  try {
    const { data } = await axios.post<User>(`${apiUrl}/users`, user)
    return data
  } catch (e) {
    throw new Error('Error creating user')
  }
}

export const getUserDetails = async (userId: string) => {
  try {
    const { data } = await axios.get<User>(`${apiUrl}/users/${userId}`)
    return data
  } catch (e) {
    throw new Error('Error fetching user details')
  }
}

interface UpdateUser {
  _id: string
  username: string
  memberOf: string[]
  profilePicture: string
}

export const updateUsername = async (user: User) => {
  try {
    const { data } = await axios.put<UpdateUser>(`${apiUrl}/users/username/${user._id}`, user)
    return data
  } catch (e) {
    throw new Error('Error updating user')
  }
}