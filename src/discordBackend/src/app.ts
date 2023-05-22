import express from 'express'
import usersRouter from './api/users'
import channelsRouter from './api/channels'
import serversRouter from './api/servers'
import messagesRouter from './api/messages'
import * as admin from 'firebase-admin'
import cors from 'cors'

const discordApp = express()

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  }),
})

discordApp.use(cors())
discordApp.use(express.json())
discordApp.use('/api/users', usersRouter)
discordApp.use('/api/channels', channelsRouter)
discordApp.use('/api/servers', serversRouter)
discordApp.use('/api/messages', messagesRouter)

export default discordApp
