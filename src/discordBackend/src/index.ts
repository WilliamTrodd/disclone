import WS from 'ws'
import app from './app'
import http from 'http'
import { config } from 'dotenv'
import { WebSocketServer, WebSocket } from 'ws'

const server = http.createServer(app)

const wss: WebSocketServer = new WS.Server({ server: server })

wss.on('connection', (ws: WebSocket) => {
  console.log('A new client connected!')

  ws.on('message', (data, isBinary: boolean) => {
    wss.clients.forEach((client: WebSocket) => {
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
