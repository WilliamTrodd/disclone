import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { connectToUsers } from './collectionConnectors'
import { Request, Response } from 'express'

const usersRouter = require('express').Router()

config()
const uri = process.env.MONGO_URI as string
/*
usersRouter.get('/', async (_req: Request, res: Response) => {
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
*/
usersRouter.get('/server/:serverId', async (req: Request, res: Response) => {
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

usersRouter.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const loggedInUser = await users.findOne({ firebaseId: req.params.userId })
    res.json(loggedInUser)
  } catch (e) {
    console.log(e)
  }
})

module.exports = usersRouter
