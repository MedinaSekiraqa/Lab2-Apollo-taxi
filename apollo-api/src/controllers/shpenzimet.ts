import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'

import { prisma } from '~/lib/prisma'

export async function getAllShpenzimet(req: Request, res: Response) {
  const shpenzimet = await prisma.shpenzimet.findMany({
    include: {
      kategoria: true,
      user: {
        select: {
          id: true,
          name: true,
          lastName: true,
          password: false,
          username: true,
          email: true,


        },
      },
    },
  })
  return res.status(200).json(shpenzimet)
}

//a function that returns the sum of all the vlera values in the shpenzimet table
export async function getSumOfVlera(req: Request, res: Response) {
  const shpenzimet = await prisma.shpenzimet.findMany({
    where:{
      user:{
        role:{
          not:'PADEKLARUAR'
        }
      }
    },
    select:{
      vlera:true
    }
  })
  const sum = shpenzimet.reduce((acc, curr) => acc + Number(curr.vlera), 0)
  return res.status(200).json(sum)
}

export async function getSumOfVleraPadeklaruar(req: Request, res: Response) {
  const shpenzimet = await prisma.shpenzimet.findMany({
    where:{
      user:{
        role:'PADEKLARUAR'
      }
    },
    select:{
      vlera:true
    }
  })
  const sum = shpenzimet.reduce((acc, curr) => acc + Number(curr.vlera), 0)
  return res.status(200).json(sum)
}

//a function that returns the sum of all the vlera values from a user 
export async function getSumOfVleraByUser(req: Request, res: Response) {
  const { username } = req.params
  const shpenzimet = await prisma.shpenzimet.findMany({
    where: {
      user: {
        username,
        
      },
    },
    select:{
      vlera:true
    }
  })
  const sum = shpenzimet.reduce((acc, curr) => acc + Number(curr.vlera), 0)
  return res.status(200).json(sum)
}

export async function addShpenzimet(req: Request, res: Response) {
  const { data, pershkrimi, kategoriaId, vlera, userId, veturaId } = req.body
  const imagePath = req.file ? req.file.path : ''
  // console.log(req.body)
  // console.log(imagePath)
  const formatedDate = new Date().toISOString()
  const shpenzimet = await prisma.shpenzimet.create({
    data: {
      userId,
      vlera,
      imagePath,
      data: formatedDate,
      pershkrimi,
      kategoriaId,
      veturaId, // Add veturaId to the data object
    },
  })
  await prisma.activity.create({
    data: {
      userId,
      veprimi: 'CREATE',
      dokumenti: 'shpenzimet',
    },
  })
  return res.status(201).json(shpenzimet)
}

export async function editShpenzimet(req: Request, res: Response) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Id is Required' })
  const { data, pershkrimi, kategoriaId, vlera } = req.body
  const shpenzimetById = await prisma.shpenzimet.findUnique({
    where: {
      id,
    },
  })
  if (!shpenzimetById)
    return res.status(404).json({ message: 'Shpenzimet not found' })
  const shpenzimet = await prisma.shpenzimet.update({
    where: {
      id,
    },
    data: {
      data,
      pershkrimi,
      kategoriaId,
      vlera,
    },
  })
  return res.status(200).json(shpenzimet)
}

export async function deleteShpenzimet(req: Request, res: Response) {
  const { id } = req.params
  console.log(id)
  if (!id) return res.status(400).json({ message: 'Id is Required' })

  const shpenzimetById = await prisma.shpenzimet.findUnique({
    where: {
      id,
    },
  })

  if (!shpenzimetById)
    return res.status(404).json({ message: 'Shpenzimet not found' })

  // Check if shpenzimet has image
  if (shpenzimetById.imagePath) {
    // Delete image from uploads folder
    const filePath = path.join(__dirname, '..', '..', shpenzimetById.imagePath)

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      console.log(`Deleted image ${shpenzimetById.imagePath}`)
    } else {
      console.log(`Image ${shpenzimetById.imagePath} not found`)
    }
  }

  const shpenzimet = await prisma.shpenzimet.delete({
    where: {
      id,
    },
  })

  return res.status(200).json({ message: 'Shpenzimi eshte fshier me sukses' })
}
