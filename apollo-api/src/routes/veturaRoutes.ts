import { Router } from "express"
import { addKategoriaEShpenzimeve, getKategoriteEShpenzimeve } from "~/controllers/kategoriaEShpenzimeve"
import { addVetura, deleteVetura, getAllVetura,editVetura } from "~/controllers/vetura"
import createMulter from "~/lib/multer"
// import { uploadFile } from "~/lib/multer"
import { createVeturaSchema } from "~/lib/validations/vetura"
import { createShpenzimetSchema } from "~/lib/validations/shpenzimet"
import { adminPermissions } from "~/middlewares/adminPermissions"
import { checkTokenExpired } from "~/middlewares/authorize"
import validateRequestSchema from "~/middlewares/validate-request-schema"

const veturaRoutes = Router()

veturaRoutes.get("/",getAllVetura)
veturaRoutes.post("/",  validateRequestSchema(createVeturaSchema),addVetura);
veturaRoutes.put("/:id",validateRequestSchema(createVeturaSchema),editVetura);
veturaRoutes.delete("/:id", deleteVetura);

export default veturaRoutes

