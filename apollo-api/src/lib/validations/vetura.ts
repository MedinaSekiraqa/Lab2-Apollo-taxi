import { z } from 'zod'

export const createVeturaSchema = z.object({
  name: z.string().min(3),
  kilometrazha: z.string().optional(),

})