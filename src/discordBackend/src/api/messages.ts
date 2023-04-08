import { connectToMessages } from './collectionConnectors'
import { ObjectId } from 'mongodb'
import { Message } from '../types'
import { Request, Response } from 'express'
import { decodeToken } from '../utils/middleware'

const messagesRouter = require('express').Router()

messagesRouter.post('/', decodeToken, async (req: Request, res: Response) => {
  console.log(req.headers)
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
    messages.insertOne(message)
    res.json(message)
  } catch (e) {
    console.log(e)
  }
})

module.exports = messagesRouter
