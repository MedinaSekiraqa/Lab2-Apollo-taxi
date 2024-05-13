import { Request, Response, Router } from 'express'
import { createRaportiShoferit, deleteRaportiShoferit, getRaportiShoferit, getRaportiShoferitByUsername, getRaportiShoferitPadeklauar, updateUserRaportiShoferit } from '~/controllers/raportiShoferit'
import { createRaportiShoferitSchema, updateRaportiShoferitSchema } from '~/lib/validations/raportiShoferit'
import { adminPermissions } from '~/middlewares/adminPermissions'
import { checkTokenExpired } from '~/middlewares/authorize'
import validateRequestSchema from '~/middlewares/validate-request-schema'

const raportiShoferitRoutes = Router()

raportiShoferitRoutes.get('/',  getRaportiShoferit)
raportiShoferitRoutes.get('/:username',  getRaportiShoferitByUsername) 
raportiShoferitRoutes.get('/secret/padeklauar',adminPermissions, getRaportiShoferitPadeklauar)
raportiShoferitRoutes.post('/', checkTokenExpired, validateRequestSchema(createRaportiShoferitSchema), createRaportiShoferit)
raportiShoferitRoutes.put('/update/:id', adminPermissions,validateRequestSchema(updateRaportiShoferitSchema),updateUserRaportiShoferit)
raportiShoferitRoutes.delete('/delete/:id', adminPermissions, checkTokenExpired,deleteRaportiShoferit)

export default raportiShoferitRoutes
