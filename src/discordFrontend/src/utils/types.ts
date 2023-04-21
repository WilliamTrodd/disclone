export interface User {
  _id: string
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}
export interface Message {
  text: string
  channelId: string
  userId: string
  timestamp: Date
  _id: string
  user: User
}

export interface NewMessage {
  text: string
  channelId: string
  userId: string
}

export interface NewUser {
  username: string
  memberOf: string[]
  profilePicture: string
  firebaseId: string
}

export interface Server {
  name: string
  _id: string
  icon: string
}
export interface Channel {
  name: string
  _id: string
  serverId: string
}