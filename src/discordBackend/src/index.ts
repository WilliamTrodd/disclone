const WS = require('ws')
const app = require('./app')
const http = require('http')
import { config } from 'dotenv'
import { WebSocketServer, WebSocket } from 'ws'

const server = http.createServer(app)

const wss: WebSocketServer = new WS.Server({ server: server })

wss.on('connection', function connection(ws: WebSocket) {
  console.log('A new client connected!')

  ws.on('message', function message(data, isBinary: boolean) {
    wss.clients.forEach(function each(client: WebSocket) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})

config()

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})
