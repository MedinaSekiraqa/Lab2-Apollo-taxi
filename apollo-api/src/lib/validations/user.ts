import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3),
  lastName: z.string().min(3),
  phone: z.string().min(6),
  address: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  userInfo: z.string().optional(),
  salary: z.number(),
  role: z
    .enum(['ADMIN', 'PRIMAR', 'SEKONDAR', 'PADEKLARUAR'])
    .default('PRIMAR'),
  orari: z.enum(['PLOTE', 'GJYS']).default('PLOTE'),
  permissions: z
    .array(z.enum(['FINANCE', 'ADDUSER', 'REPORTS', 'WORKERS']))
    .optional(),
  notifications: z.array(z.enum(['SALARY', 'SCHEDULE', 'ROLE'])).optional(),
})
