import { prisma } from '~/lib/prisma'
import { User } from '~/lib/types'

export async function getUserWithUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  })
  if (!user) return null
  return user
}
