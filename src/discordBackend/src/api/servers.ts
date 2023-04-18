import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import { connectToServers } from './collectionConnectors'

const serversRouter = require('express').Router()

// Get all servers
serversRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const servers = await connectToServers()
    const allServers = await servers.find({}).toArray()
    res.json(allServers)
  } catch (e) {
    console.log(e)
  }
})

// Get server channels
serversRouter.get('/:id', async (req: Request, res: Response) => {
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
    res.json(serverWithChannels[0])
  } catch (e) {
    console.log(e)
  }
})

module.exports = serversRouter
