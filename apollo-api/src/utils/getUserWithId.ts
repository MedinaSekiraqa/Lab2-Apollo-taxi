import { prisma } from '~/lib/prisma'

export async function getUserWithId(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })
  if (!user) return null
  return user
}
