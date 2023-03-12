import { connectToCluster } from '../mongoClient'
import { config } from 'dotenv'
import { ObjectId } from 'mongodb'
import { Channel } from '../types'

const channelsRouter = require('express').Router()

config()

const uri = process.env.MONGO_URI as string
