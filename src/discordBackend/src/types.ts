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
  channelId: ObjectId
  userId: ObjectId
  timestamp: Date
  _id: ObjectId
}

export interface Channel {
  name: string
  serverId: ObjectId
  _id: ObjectId
}
export interface Server {
  name: string
  icon: string
  users: User[]
  _id: ObjectId
}
