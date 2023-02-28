const express = require('express');
const usersRouter = require('./controllers/users');
const serversRouter = require('./controllers/servers');
const {decodeToken} = require('./utils/middleware')


const discordApp = express();
discordApp.use(express.json());
//discordApp.use(decodeToken);
discordApp.use('/api/users', usersRouter);
discordApp.use('/api/servers', serversRouter)

module.exports = discordApp;