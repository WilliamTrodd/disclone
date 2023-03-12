import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { Channel } from '../types'

const channelsRouter = require('express').Router()

config()

const uri = process.env.MONGO_URI as string

const connectToChannels = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const channels = database.collection('channels')
  return channels
}

const connectToMessages = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const messages = database.collection('messages')
  return messages
}

// get all channels
channelsRouter.get('/', async (req, res) => {
  try {
    const channels = await connectToChannels()
    const allChannels = await channels.find({}).toArray()
    res.json(allChannels)
  } catch (e) {
    console.log(e)
  }
})

// get messages for channel
channelsRouter.get('/:id', async (req, res) => {
  try {
    const messages = await connectToMessages()
    const agg = [
      {
        $match: {
          channelId: new ObjectId(req.params.id),
        },
      },
    ]
    const gotMessages = messages.aggregate(agg)
    const channelMessages = await gotMessages.toArray()
    res.json(channelMessages)
  } catch (e) {
    console.log(e)
  }
})

module.exports = channelsRouter
