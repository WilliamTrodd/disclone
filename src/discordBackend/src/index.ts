const app = require('./app')
const http = require('http')
import { config } from 'dotenv'

const server = http.createServer(app)
config()

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})
