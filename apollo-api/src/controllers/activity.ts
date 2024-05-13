import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs';

import { prisma } from '~/lib/prisma'

export async function getAllActivity(req: Request, res: Response) {
  const activity    = await prisma.activity.findMany()
  return res.status(200).json(activity  )
}

export async function getActivityByUserId(req: Request, res: Response) {
    const userId = req.params.userId;
  
    try {
      const activity = await prisma.activity.findMany({
        where: {
          userId: userId,
        },
      });
      return res.status(200).json(activity);
    } catch (error) {
      console.error('Error retrieving activity by user ID:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getActivityByShpenzimetId(req: Request, res: Response) {
    const shpenzimetId = req.params.shpenzimetId;
  
    try {
      const activity = await prisma.activity.findMany({
        where: {
          shpenzimetId: shpenzimetId,
        },
      });
      return res.status(200).json(activity);
    } catch (error) {
      console.error('Error retrieving activity by shpenzimeId:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getActivitiyByKategoriaEShpenzimeveId(req: Request, res: Response) {
    const kategoriaEShpenzimeveId = req.params.kategoriaEShpenzimeveId;
  
    try {
      const activity = await prisma.activity.findMany({
        where: {
            kategoriaEShpenzimeveId: kategoriaEShpenzimeveId,
        },
      });
      return res.status(200).json(activity);
    } catch (error) {
      console.error('Error retrieving activity by kategoriaEShpenzimeveId:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
}

