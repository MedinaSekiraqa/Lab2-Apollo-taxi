// import { User } from '../models/User'

import { prisma } from '~/lib/prisma'
import { User } from '~/lib/types'

export async function getUserWithEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })
  if (!user) return null
  return user
}
