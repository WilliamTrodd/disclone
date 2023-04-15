import { NextFunction, Request, Response } from 'express'
import { getAuth } from 'firebase-admin/auth'

const decodeToken = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const { uid } = await getAuth().verifyIdToken(token)
      if (uid) {
        console.log(uid)
        return next()
      }
      return res.json({ message: 'Unauthorized' })
    } catch (e) {
      console.log(e)
      return res.json({ message: 'Internal Error' })
    }
  }
  return res.json({ message: 'Unauthorized' })
}

export { decodeToken }
