import { Collection, Db } from 'mongodb'
import { Server, Channel, Message, User } from '../types'

const db = require('../db').default

export const connectToServers = async () => {
  const database: Db = await db
  const servers: Collection<Server> = database.collection('servers')
  return servers
}

export const connectToChannels = async () => {
  const database: Db = await db
  const channels: Collection<Channel> = database.collection('channels')
  return channels
}

export const connectToMessages = async () => {
  const database: Db = await db
  const messages: Collection<Message> = database.collection('messages')
  return messages
}

export const connectToUsers = async () => {
  const database: Db = await db
  const users: Collection<User> = database.collection('users')
  return users
}
