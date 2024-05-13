import { prisma } from '~/lib/prisma'

export async function getTokenWithUserID(userId: string) {
  const dbToken = await prisma.token.findUnique({
    where: {
      userId,
    },
  })
  if (!dbToken) return null
  return dbToken
}
