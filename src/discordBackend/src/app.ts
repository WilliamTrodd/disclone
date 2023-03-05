const express = require('express')
const usersRouter = require('./api/users')
const serversRouter = require('./api/servers')
const { decodeToken } = require('./utils/middleware')
const cors = require('cors')

const discordApp = express()

discordApp.use(cors())
discordApp.use(express.json())
//discordApp.use(decodeToken);
discordApp.use('/api/users', usersRouter)
discordApp.use('/api/servers', serversRouter)

module.exports = discordApp
