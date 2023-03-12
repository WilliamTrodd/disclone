import { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  username: string
  profilePicture: string
  memberOf: Server[]
  firebaseUid: string
}

export interface Message {
  text: string
  user: ObjectId
  time: Date
  _id: ObjectId
}

export interface Channel {
  name: string
  messages: Message[]
  _id: ObjectId
}
interface Server {
  name: string
  channels: Channel[]
  icon: string
  users: User[]
  _id: ObjectId
}
