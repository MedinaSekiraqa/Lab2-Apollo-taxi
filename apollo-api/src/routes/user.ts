import { Router } from 'express'

import {
  createUser,
  deleteUser,
  getUserByUsername,
  getUsers,
  getUsersPadeklaruar,
  login,
  logout,
} from '~/controllers/user'
import { createUserSchema } from '~/lib/validations/user'
import { adminPermissions } from '~/middlewares/adminPermissions'
import { checkTokenExpired } from '~/middlewares/authorize'
import validateRequestSchema from '~/middlewares/validate-request-schema'

const userRoutes = Router()

userRoutes.get('/', checkTokenExpired,adminPermissions, getUsers)
userRoutes.get('/padeklaruar', checkTokenExpired,adminPermissions, getUsersPadeklaruar)
userRoutes.get('/:username',  getUserByUsername)
userRoutes.post('/login', login)
// userRoutes.put('/updateRaportiShoferit/:id', validateRequestSchema(updateRaportiShoferitSchema),adminPermissions, updateUserRaportiShoferit)

userRoutes.post('/', validateRequestSchema(createUserSchema),adminPermissions, createUser)
userRoutes.delete('/delete/:id',adminPermissions, deleteUser)
userRoutes.post('/logout', logout)

export default userRoutes
