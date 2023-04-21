import { ObjectId } from 'mongodb'
import { connectToUsers } from './collectionConnectors'
import { Request, Response } from 'express'

const usersRouter = require('express').Router()

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

usersRouter.get('/loggedIn/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const loggedInUser = await users.findOne({ firebaseId: req.params.userId })
    res.json(loggedInUser)
  } catch (e) {
    console.log(e)
  }
})

usersRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const user = await users.findOne({ _id: new ObjectId(req.params.userId) })
    res.json(user)
  } catch (e) {
    console.log(e)
  }
})

usersRouter.post('/', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const newUser = req.body
    newUser.memberOf = newUser.memberOf.map((server: string) => new ObjectId(server))
    const result = await users.insertOne(newUser)
    res.json(result)
  } catch (e) {
    console.log(e)
  }
})

usersRouter.put('/username/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const updatedUser = req.body
    const newName = updatedUser.username
    const result = await users.findOneAndUpdate(
      { _id: new ObjectId(req.params.userId) },
      { $set: { username: newName } },
      { returnDocument: 'after' }
    )
    res.json(result)
  } catch (e) {
    console.log(e)
  }
})

module.exports = usersRouter
