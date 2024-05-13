import { NextFunction, Request, Response } from 'express'
import { prisma } from '~/lib/prisma'
import { decodeToken } from '~/utils/decodeToken'
import { getTokenWithUserID } from '~/utils/getTokenWithUserId'
import { getUserWithEmail } from '~/utils/getUserWithEmail'
import jwt, { JwtPayload } from 'jsonwebtoken'

export async function checkTokenExpired(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('checkTokenExpired hit')
  const token = req.headers.authorization


  if (!token) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'No token provided or invalid token',
    })
  }
  const verifiedToken = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload
  // console.log(verifiedToken)
  if (!verifiedToken) {
    return res.status(401).send('Unauthorized')
  }
  const user = await getUserWithEmail(verifiedToken.email)

  if (!user) {
    return res.status(404).send('User not found')
  }

  const dbToken = await getTokenWithUserID(user.id)

  if (!dbToken) {
    return res.status(401).send('Unauthorized')
  }

  if (verifiedToken.exp && Date.now() >= verifiedToken.exp * 1000) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Token expired. Please login again to continue.',
    })
  }

  next()
}


