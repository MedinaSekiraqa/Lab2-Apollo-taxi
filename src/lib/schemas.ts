import { z } from "zod";
export const createUserSchema = z.object({
   name: z.string(),
   lastName: z.string(),
   phone: z.string(),
   address: z.string(),
   username: z.string(),
   email: z.string().email(),
   password: z.string(),
   userInfo: z.string().optional(),
   salary: z.number(),
   role: z
      .enum(["ADMIN", "PRIMAR", "SEKONDAR", "PADEKLARUAR"])
      .default("PRIMAR"),
   orari: z.enum(["PLOTE", "GJYS"]).default("PLOTE"),
   permissions: z
      .array(z.enum(["FINANCE", "ADDUSER", "REPORTS", "WORKERS"]))
      .optional(),
   notifications: z.array(z.enum(["SALARY", "SCHEDULE", "ROLE"])).optional(),
});

export const createKategoriaShpenzimeveSchema = z.object({
   emri: z.string().min(3),
   pershkrimi: z.string().optional(),
});
export const createShpenzimetSchema = z.object({
   kategoriaId: z.string().min(3),
   vlera: z.number().min(1),
   pershkrimi: z.string().optional(),
   data: z.date(),

   imagePath: z.any().optional(),
   userId: z.string().optional(),
   veturaId: z.string().optional(),
});
export const createVeturaSchema = z.object({
   name: z.string().min(3),
   kilometrazha: z.string().optional(),
 
 })

export const createRaportiShoferitSchema = z.object({
   pranoi: z.number(),
   dorzoi: z.number(),
   paushall: z.number(),
   minus: z.number().optional(),
   pershkrimi: z.string().optional(),
   shpenzimetId: z.string().optional(),
   veturaId: z.string(),
   userId: z.string().optional(),
   startTime: z.string(),
   endTime: z.string(),
   data: z.date(),
 })
 
 export const updateRaportiShoferitSchema = z.object({
   minus: z.number().optional(),
  
 })