import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { Message } from '../types'

const serversRouter = require('express').Router()

config()
const uri = process.env.MONGO_URI as string

const connectToServers = async () => {
  const client = await connectToCluster(uri)
  const database = client.db('discordClone')
  const servers = database.collection('servers')
  return servers
}

// Get all servers
serversRouter.get('/', async (_req, res) => {
  try {
    const servers = await connectToServers()
    const allServers = await servers.find({}).toArray()
    res.json(allServers)
  } catch (e) {
    console.log(e)
  }
})

// Get server channels
serversRouter.get('/:id', async (req, res) => {
  try {
    const servers = await connectToServers()
    const agg = [
      {
        $match: {
          _id: new ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: 'channels',
          localField: '_id',
          foreignField: 'serverId',
          as: 'channels',
        },
      },
    ]
    const gotServers = servers.aggregate(agg)
    const serverWithChannels = await gotServers.toArray()
    console.log(serverWithChannels)
    res.json(serverWithChannels[0])
  } catch (e) {
    console.log(e)
  }
})

/*Get channel messages
serversRouter.get('/:id/:channelId', async (req, res) => {
  try {
    const servers = await connectToServers()

    } catch (e) {
      console.log(e)
    }
  }
})

/*
serversRouter.get('/:id/:channelName', async (req, res) => {
  try {
    const {servers, channels} = await connectToServers()
    const server = await servers.findOne({ _id: new ObjectId(req.params.id) })
    const channel = server ? server.channels.find((c) => c.name === req.params.channelName) : null
    res.json(channel)
  } catch (e) {
    console.log(e)
  }
})

serversRouter.post('/:id/:channelName', async (req, res) => {
  const { text, user } = req.body
  const channelName = req.params.channelName
  try {
    const message: Message = {
      text: text,
      user: new ObjectId(user),
      time: new Date(),
      _id: new ObjectId(),
    }

    const servers = await connectToServers()

    servers.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $push: {
          'channels.$[e1].messages': message,
        },
      },
      {
        arrayFilters: [{ 'e1.name': channelName }],
      }
    )
  } catch (e) {
    console.log(e)
  }
})
*/
module.exports = serversRouter
