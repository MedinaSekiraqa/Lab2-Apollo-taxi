import { z } from 'zod'

export const createShpenzimetSchema = z.object({
  kategoriaId: z.string().min(3),
  vlera: z.number().min(1).or(z.string()),
  pershkrimi: z.string().optional(),
  data: z.date().default(new Date()).or(z.string()),

  imagePath: z.string().optional(),
  userId: z.string().min(3),
})
