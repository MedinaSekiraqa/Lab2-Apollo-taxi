import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import { Schema, ZodError } from 'zod'

const validateRequestSchema =
  (schema: Schema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Error  (Validation middleware)', error)
        next(createHttpError(400))
      } else {
        next(error)
      }
    }
  }

export default validateRequestSchema
