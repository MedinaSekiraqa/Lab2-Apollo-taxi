import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs';

import { prisma } from '~/lib/prisma'

export async function getAllVetura(req: Request, res: Response) {
  const vetura = await prisma.vetura.findMany()
  return res.status(200).json(vetura)
}

export async function addVetura(req: Request, res: Response) {
    try {
        const { name, kilometrazha } = req.body; 
        const vetura = await prisma.vetura.create({
            data: {
                name,
                kilometrazha,
            },
        });
        return res.status(201).json(vetura);
    } catch (error) {
   
        console.error('Error adding vetura:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}


export async function editVetura(req: Request, res: Response) {
  const { id } = req.params
  if (!id) return res.status(400).json({ message: 'Id is Required' })
  const { name, kilometrazha } = req.body
  const veturaById = await prisma.vetura.findUnique({
    where: {
      id,
    },
  })
  if (!veturaById)
    return res.status(404).json({ message: 'Vetura not found' })

  const vetura = await prisma.vetura.update({
    where: {
      id,
    },
    data: {
      name,
      kilometrazha,
    },
  })
  return res.status(200).json(vetura)
}

export async function deleteVetura(req: Request, res: Response) {
    const { id } = req.params
    console.log(id)
    if (!id) return res.status(400).json({ message: 'Id is Required' })
  
    const veturaById = await prisma.vetura.findUnique({
      where: {
        id,
      },
    })
  
    if (!veturaById)
      return res.status(404).json({ message: 'Vetura not found' })
  

  
    const vetura = await prisma.vetura.delete({
      where: {
        id,
      },
    })
  
    return res.status(200).json({ message: 'Vetura eshte fshir me sukses' })
  }