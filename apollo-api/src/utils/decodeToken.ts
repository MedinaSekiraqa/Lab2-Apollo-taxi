// @ts-ignore
import bcrypt from 'bcrypt'

import jwt, { JwtPayload } from 'jsonwebtoken'

export function decodeToken(token: string) {
  const payload = jwt.decode(token)as JwtPayload | null
  return payload
}

