import { NextFunction, Request, Response } from 'express'
import { decodeToken } from '~/utils/decodeToken'
import { getTokenWithUserID } from '~/utils/getTokenWithUserId'
import { getUserWithEmail } from '~/utils/getUserWithEmail'

export async function adminPermissions(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization

  // console.log(token)

  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided or invalid token',
    })
  }
  //TODO: Refactor the same code for token
  const decoded = decodeToken(token as string)
  if (!decoded) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token expired. Please login again to continue.',
    })
  }
  const email = decoded.email
  // console.log("EMAIL HERE AFTER DECODE",email)
  const user = await getUserWithEmail(email)
  if (!user) {
    return res.status(404).send('User not found')
  }
  const exp = decoded.exp
  if (decoded.exp && Date.now() >= decoded.exp * 1000) {
    // return res
    //   .status(401)
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token expired. Please login again to continue.',
    })
  }
  
  const dbToken = await getTokenWithUserID(user?.id)
  if (!dbToken) {
    return res.status(401).send({ error: 'Unauthorized' })
  }
  if (user.role !== 'ADMIN') {
    return res.status(403).send({ error: 'Admin permissions required' })
  }
  next()
}
