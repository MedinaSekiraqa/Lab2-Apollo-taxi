import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
// import { getUser } from "../middlewares/auth";
import { prisma } from '~/lib/prisma'
import { getUserWithId } from '~/utils/getUserWithId'
import { getUserWithUsername } from '~/utils/getUserWithUsername'

// const prisma = new PrismaClient();

export const getRaportiShoferit = async (req: Request, res: Response) => {
  // const { id } = req.params;
  // const user = await getUserWithId(id);
  // if (!user) {
  //   return res.status(404).json({ message: "User not found" });
  // }
  const raportiShoferit = await prisma.raportiShoferit.findMany({
    where: {
      user: {
        role: {
          not: 'PADEKLARUAR',
        },
      },
    },
    include: {
      shpenzimet: true,
      vetura: true,
      user: {
        select: {
          name: true,
          lastName: true,
          phone: true,
          address: true,
          username: true,
          email: true,
          userInfo: true,
          salary: true,
          role: true,
          orari: true,
          permissions: true,
          notifications: true,
        },
      },
    },
    
  })

  if (!raportiShoferit) {
    return res.status(404).json({ message: 'Raporti Shoferit not found' })
  }
  return res.status(200).json(raportiShoferit)
}

export const getRaportiShoferitByUsername = async (
  req: Request,
  res: Response,
) => {
  const { username } = req.params
  // console.log(userId)
  const user = await getUserWithUsername(username)
  if (!user) {
    return res.status(200).json([])
  }
  //   const twoDaysAgo = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
  // console.log('Two days ago:', twoDaysAgo);
  const raportiShoferit = await prisma.raportiShoferit.findMany({
    where: {
      user:{
        username: username,
      },
      // data: {
      //   gte: twoDaysAgo, // "Greater than or equal" two days ago
      // },
    },
    include: {
      shpenzimet: true,
      vetura: true,
      user: {
        select: {
          name: true,
          lastName: true,
          phone: true,
          address: true,
          username: true,
          email: true,
          userInfo: true,
          salary: true,
          role: true,
          orari: true,
          permissions: true,
          notifications: true,
        },
      },
    },
  })

  if (!raportiShoferit) {
    return res.status(404).json({ message: 'Raporti Shoferit not found' })
  }

  return res.status(200).json(raportiShoferit)
}

export const getRaportiShoferitPadeklauar = async (req: Request, res: Response) => {
  const raportiShoferit = await prisma.raportiShoferit.findMany({
    where: {
      user: {
          role: 'PADEKLARUAR',
      },
    },
    include: {
      shpenzimet: true,
      vetura: true,
      user: {
        select: {
          name: true,
          lastName: true,
          phone: true,
          address: true,
          username: true,
          email: true,
          userInfo: true,
          salary: true,
          role: true,
          orari: true,
          permissions: true,
          notifications: true,
        },
      },
    },
  })

  if (!raportiShoferit) {
    return res.status(404).json({ message: 'Raporti Shoferit not found' })
  }

  return res.status(200).json(raportiShoferit)
}

export async function createRaportiShoferit(req: Request, res: Response) {
  //   const { id } = req.params;
  const {
    userId,
    shpenzimetId,
    veturaId,
    pranoi,
    dorzoi,
    paushall,
    minus,
    pershkrimi,
    startTime,
    endTime,
    data,
  } = req.body
  const user = await getUserWithId(userId)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  const vetura = await prisma.vetura.findUnique({
    where: {
      id: veturaId,
    },
  })
  if (!vetura) {
    return res.status(404).json({ message: 'Vetura not found' })
  }
  const raportiShoferit = await prisma.raportiShoferit.create({
    data: {
      pranoi: pranoi,
      dorzoi: dorzoi,
      paushall: paushall,
      minus: minus,
      pershkrimi: pershkrimi,
      userId: userId,
      startTime: startTime,
      endTime: endTime,
      veturaId: veturaId,
      data: data,
    },
  })

  return res.status(201).json(raportiShoferit)
}

export const updateUserRaportiShoferit = async (
  req: Request,
  res: Response,
) => {
  const { id } = req.params
  console.log(id)
  const { pranoi, dorzoi, paushall, minus, pershkrimi, vetura } = req.body
  // const userWithId = await getUserWithId(id)
  // if (!userWithId) {
  //   return res.status(404).json({ message: 'User not found' })
  // }
  // if (!userWithId) {
  //   return res.status(404).json({ message: 'User not found' })
  // }
  const raportiShoferit = await prisma.raportiShoferit.findUnique({
    where: {
      id,
    },
  })
  if (!raportiShoferit) {
    return res.status(404).json({ message: 'Raporti Shoferit not found' })
  }
  const newRaporti = await prisma.raportiShoferit.update({
    where: {
      id,
    },
    data: {
      ...raportiShoferit,
      minus,
    },
  })
  return res.status(200).json("good")
}

export const deleteRaportiShoferit = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await getUserWithId(id)
  const raportiShoferit = await prisma.raportiShoferit.delete({
    where: {
      id,
    },
  })

  if (!raportiShoferit) {
    return res.status(404).json({ message: 'Raporti Shoferit not found' })
  }

  return res.status(200).json(raportiShoferit)
}
