import { Router } from "express"
import { addKategoriaEShpenzimeve, deleteKategoriaEShpenzimeve, editKategoriaEShpenzimeve, getKategoriteEShpenzimeve } from "~/controllers/kategoriaEShpenzimeve"
import { createKategoriaEShpenzimeveSchema } from "~/lib/validations/kategoriaEShpenzimeve"
import { adminPermissions } from "~/middlewares/adminPermissions"
import { checkTokenExpired } from "~/middlewares/authorize"
import validateRequestSchema from "~/middlewares/validate-request-schema"

const kategoriaEShpenzimeveRoutes = Router()

kategoriaEShpenzimeveRoutes.get("/",getKategoriteEShpenzimeve)
kategoriaEShpenzimeveRoutes.post("/",validateRequestSchema(createKategoriaEShpenzimeveSchema), addKategoriaEShpenzimeve)
kategoriaEShpenzimeveRoutes.put("/:id",adminPermissions,validateRequestSchema(createKategoriaEShpenzimeveSchema), editKategoriaEShpenzimeve)
kategoriaEShpenzimeveRoutes.delete("/:id",adminPermissions, deleteKategoriaEShpenzimeve)


export default kategoriaEShpenzimeveRoutes
