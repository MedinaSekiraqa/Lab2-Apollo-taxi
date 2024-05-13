import { z } from 'zod'

export const createRaportiShoferitSchema = z.object({
  pranoi: z.number(),
  dorzoi: z.number(),
  paushall: z.number(),
  minus: z.number().optional(),
  pershkrimi: z.string().optional(),
  shpenzimetId: z.string().optional(),
  veturaId: z.string(),
  userId: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  data: z.date().default(new Date()).or(z.string()),
})

export const updateRaportiShoferitSchema = z.object({
  minus: z.number().optional(),
})