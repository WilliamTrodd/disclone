import express from 'express'
const usersRouter = require('./api/users')
const channelsRouter = require('./api/channels')
const serversRouter = require('./api/servers')
const messagesRouter = require('./api/messages')
import * as admin from 'firebase-admin'
const { decodeToken } = require('./utils/middleware')
const cors = require('cors')

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
//discordApp.use(decodeToken);
discordApp.use('/api/users', usersRouter)
discordApp.use('/api/channels', channelsRouter)
discordApp.use('/api/servers', serversRouter)
discordApp.use('/api/messages', messagesRouter)

module.exports = discordApp
