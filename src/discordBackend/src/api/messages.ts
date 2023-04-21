import { connectToMessages } from './collectionConnectors'
import { ObjectId, Document } from 'mongodb'
import { Message } from '../types'
import { Request, Response, Router } from 'express'
import { decodeToken } from '../utils/middleware'

const messagesRouter = Router()
messagesRouter.post('/', decodeToken, async (req: Request, res: Response) => {
  const { text, userId, channelId } = req.body
  try {
    const message: Message = {
      text: text,
      channelId: new ObjectId(channelId),
      userId: new ObjectId(userId),
      timestamp: new Date(),
      _id: new ObjectId(),
    }
    const messages = await connectToMessages()
    const { insertedId } = await messages.insertOne(message)

    const savedMessage = await messages
      .aggregate([
        { $match: { _id: insertedId } },
        { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
        { $unwind: { path: '$user' } },
      ])
      .toArray()
    res.json(savedMessage)
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

export default messagesRouter
