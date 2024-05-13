import { z } from 'zod'

export const createKategoriaEShpenzimeveSchema = z.object({
  emri: z.string().min(1),
  pershkrimi: z.string().optional(),
})
