import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'

config()
const uri = process.env.MONGO_URI as string

export const connectToServers = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const servers = database.collection('servers')
  return servers
}

export const connectToChannels = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const channels = database.collection('channels')
  return channels
}

export const connectToMessages = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const messages = database.collection('messages')
  return messages
}

export const connectToUsers = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const users = database.collection('users')
  return users
}
