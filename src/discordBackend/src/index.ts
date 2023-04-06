const WebSocket = require('ws')
const app = require('./app')
const http = require('http')
import { config } from 'dotenv'

const server = http.createServer(app)

const wss = new WebSocket.Server({ server: server })

wss.on('connection', function connection(ws: any) {
  console.log('A new client connected!')

  ws.on('message', function message(data: any, isBinary: boolean) {
    wss.clients.forEach(function each(client: any) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
    /*
    const message = isBinary ? data : data.toString()
    console.log(message)
    ws.send(message)
    */
  })
})

config()

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`)
})
