import { ObjectId } from 'mongodb'
import { Request, Response } from 'express'
import { connectToChannels, connectToMessages } from './collectionConnectors'
import Router from 'express'

const channelsRouter = Router()

//TODO refactor for readability/logical layout

// get all channels
channelsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const channels = await connectToChannels()
    const allChannels = await channels.find({}).toArray()
    res.json(allChannels)
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

channelsRouter.get('/:serverId', async (req: Request, res: Response) => {
  try {
    const channels = await connectToChannels()
    const gotChannels = channels.find({ serverId: new ObjectId(req.params.serverId) })
    const allChannels = await gotChannels.toArray()
    res.json(allChannels)
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

channelsRouter.get('/:serverId/:channelId/:page', async (req: Request, res: Response) => {
  try {
    const pageAsInt = parseInt(req.params.page) || 1
    const pageSizeAsInt = 20

    const messages = await connectToMessages()
    const gotMessages = messages.aggregate([
      {
        $facet: {
          metadata: [
            { $match: { channelId: new ObjectId(req.params.channelId) } },
            { $count: 'totalCount' },
          ],
          data: [
            { $match: { channelId: new ObjectId(req.params.channelId) } },
            { $sort: { timestamp: -1 } },
            { $skip: (pageAsInt - 1) * pageSizeAsInt },
            { $limit: pageSizeAsInt },
            { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
            { $sort: { timestamp: 1 } },
          ],
        },
      },
    ])
    const channelMessages = await gotMessages.toArray()

    return res.status(200).json({
      success: true,
      messages: {
        metadata: {
          totalCount: channelMessages[0].metadata[0].totalCount,
          pageAsInt,
          pageSizeAsInt,
        },
        data: channelMessages[0].data,
      },
    })
  } catch (e) {
    return res.status(500).json({ success: false })
  }
})
export default channelsRouter
