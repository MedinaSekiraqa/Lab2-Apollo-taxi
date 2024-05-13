import { NextFunction, Request, Response } from 'express'
import { decodeToken } from './decodeToken'
import { getUserWithEmail } from './getUserWithEmail'
import { getTokenWithUserID } from './getTokenWithUserId'

export async function authenticateToken(token: string, res: Response) {
  const decoded = decodeToken(token as string)
  if (!decoded) {
    return res.status(401).json({error: 'Unauthorized',message: 'Token expired. Please login again to continue.',})
  }
  const email = decoded?.email
  const user = await getUserWithEmail(email)
  const exp = decoded?.exp
  if (decoded.exp && Date.now() >= decoded?.exp * 1000) {
    return res.status(401).json({error: 'Unauthorized',message: 'Token expired. Please login again to continue.',})
  }
  if (!user) {
    return res.status(404).send('User not found')
  }
  const dbToken = await getTokenWithUserID(user?.id)
  if (!dbToken) {
    return res.status(401).send('Unauthorized')
  }
}
