import { MongoClient } from 'mongodb'

import { config } from 'dotenv'

config()

const connect = async () => {
  const uri = process.env.MONGO_URI as string
  const client = new MongoClient(uri)
  const conn = await client.connect()
  console.log('connecting again')
  const db = conn.db('discordClone')
  return db
}

const db = connect()

export default db
