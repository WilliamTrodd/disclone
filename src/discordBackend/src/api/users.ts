import { ObjectId } from 'mongodb'
import { connectToUsers } from './collectionConnectors'
import { Request, Response, Router } from 'express'

const usersRouter = Router()

//TODO refactor for readability/logical layout

usersRouter.get('/server/:serverId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    console.log(await users.find().toArray())
    const gotUsers = users.find({ memberOf: new ObjectId(req.params.serverId) })
    const allUsers = await gotUsers.toArray()
    res.json(allUsers)
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

usersRouter.get('/loggedIn/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const loggedInUser = await users.findOne({ firebaseId: req.params.userId })
    res.json(loggedInUser)
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

usersRouter.get('/:userId', async (req: Request, res: Response) => {
  try {
    const users = await connectToUsers()
    const user = await users.findOne({ _id: new ObjectId(req.params.userId) })
    res.json(user)
  } catch (e) {
    res.status(500).send({ error: e })
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
    res.status(500).send({ error: e })
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
    res.status(500).send({ error: e })
  }
})

export default usersRouter
