import { type Request, type Response } from 'express'
import { prisma } from '~/lib/prisma'

export async function getKategoriteEShpenzimeve(req: Request, res: Response) {
  const kategorite = await prisma.kategoriaEShpenzimeve.findMany()
  // await prisma.activity.create({
  //   data: {
  //     veprimi:'GET',
  //     dokumenti:'kategoriaEShpenzimeve',


  //   },
  // })
  return res.json(kategorite)
}
export async function addKategoriaEShpenzimeve(req: Request, res: Response) {
  const { emri, pershkrimi } = req.body
  const kategoria = await prisma.kategoriaEShpenzimeve.create({
    data: {
      emri,
      pershkrimi,
    },
  })
  return res.status(201).json(kategoria)
}

export async function editKategoriaEShpenzimeve(req: Request, res: Response) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Id is Required' })
  const { emri, pershkrimi } = req.body
  const kategoriaById = await prisma.kategoriaEShpenzimeve.findUnique({
    where: {
      id,
    },
  })
  if (!kategoriaById)
    return res.status(404).json({ message: 'Kategoria not found' })
  const kategoria = await prisma.kategoriaEShpenzimeve.update({
    where: {
      id,
    },
    data: {
      emri,
      pershkrimi,
    },
  })
  return res.json(kategoria)
}

export async function deleteKategoriaEShpenzimeve(req: Request, res: Response) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Id is Required' })
  const kategoriaById = await prisma.kategoriaEShpenzimeve.findUnique({
    where: {
      id,
    },
  })
  if (!kategoriaById)
    return res.status(404).json({ message: 'Kategoria not found' })

  const kategoria = await prisma.kategoriaEShpenzimeve.delete({
    where: {
      id,
    },
  })
  return res.status(201).json({ message: 'Kategoria deleted' })
}
