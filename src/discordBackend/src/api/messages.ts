import { connectToMessages } from './collectionConnectors'
import { ObjectId } from 'mongodb'
import { Message } from '../types'

const messagesRouter = require('express').Router()

messagesRouter.post('/', async (req, res) => {
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
