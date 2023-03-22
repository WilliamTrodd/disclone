import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { connectToUsers } from './collectionConnectors'

const usersRouter = require('express').Router()

config()
const uri = process.env.MONGO_URI as string

usersRouter.get('/', async (req, res) => {
  try {
    const client = await connectToCluster(uri)
    const database = client.db('discordClone')
    const users = database.collection('users')
    const allUsers = await users.find({}).toArray()
    res.json(allUsers)
  } catch (e) {
    console.log(e)
  }
})

usersRouter.get('/:serverId', async (req, res) => {
  try {
    const users = await connectToUsers()
    const agg = [
      {
        $match: {
          memberOf: new ObjectId(req.params.serverId),
        },
      },
    ]
    const gotUsers = users.aggregate(agg)
    const allUsers = await gotUsers.toArray()
    res.json(allUsers)
  } catch (e) {
    console.log(e)
  }
})

module.exports = usersRouter
