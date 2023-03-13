const express = require('express')
const usersRouter = require('./api/users')
const channelsRouter = require('./api/channels')
const serversRouter = require('./api/servers')
const messagesRouter = require('./api/messages')
const { decodeToken } = require('./utils/middleware')
const cors = require('cors')

const discordApp = express()

discordApp.use(cors())
discordApp.use(express.json())
//discordApp.use(decodeToken);
discordApp.use('/api/users', usersRouter)
discordApp.use('/api/channels', channelsRouter)
discordApp.use('/api/servers', serversRouter)
discordApp.use('/api/messages', messagesRouter)

module.exports = discordApp
