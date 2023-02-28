import { connectToCluster } from "../mongoClient";
import {config} from 'dotenv';

const usersRouter = require('express').Router();

config();
const uri = process.env.MONGO_URI as string;


usersRouter.get('/', async (req, res) => {
  try {
    const client = await connectToCluster(uri);
    const database = client.db('discordClone');
    const users = database.collection('users');
    const allUsers = await users.find({}).toArray();
    res.json(allUsers);
  }catch(e) {
    console.log(e);
  }
})



module.exports = usersRouter;