const firebaseAdmin = require('../config/firebase-config')
import { NextFunction, Request, Response } from 'express'

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const decodeValue = await firebaseAdmin.auth().verifyIdToken(token)
      if (decodeValue) {
        console.log(decodeValue)
      }
      return res.json({ message: 'Unauthorized' })
    } catch (e) {
      return res.json({ message: 'Internal Error' })
    }
  }
  next()
  return res.json({ message: 'Unauthorized' })
}

export { decodeToken }
