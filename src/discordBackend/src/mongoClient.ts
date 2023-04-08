import { MongoClient, ServerApiVersion } from 'mongodb'

export const connectToCluster = async (uri: string) => {
  try {
    const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 })
    await client.connect()
    return client
  } catch (e) {
    console.log(e)
    process.exit()
  }
}
