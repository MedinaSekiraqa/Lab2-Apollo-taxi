import { Router } from "express"
import { addShpenzimet, deleteShpenzimet, editShpenzimet, getAllShpenzimet, getSumOfVlera, getSumOfVleraByUser, getSumOfVleraPadeklaruar } from "~/controllers/shpenzimet"
import createMulter from "~/lib/multer"
// import { uploadFile } from "~/lib/multer"
import { createShpenzimetSchema } from "~/lib/validations/shpenzimet"
import { checkTokenExpired } from "~/middlewares/authorize"
import validateRequestSchema from "~/middlewares/validate-request-schema"

const shpenzimetRoutes = Router()
const uploadShpenzimet = createMulter('shpenzimet').single("imagePath");

shpenzimetRoutes.get("/",getAllShpenzimet)
shpenzimetRoutes.get("/sum",  getSumOfVlera);
shpenzimetRoutes.get("/sumPadeklaruar",getSumOfVleraPadeklaruar);
shpenzimetRoutes.get("/sumByUser/:username",getSumOfVleraByUser);
shpenzimetRoutes.post("/",uploadShpenzimet, checkTokenExpired, validateRequestSchema(createShpenzimetSchema),addShpenzimet);
shpenzimetRoutes.put("/:id",validateRequestSchema(createShpenzimetSchema),editShpenzimet);
shpenzimetRoutes.delete("/:id", deleteShpenzimet);

export default shpenzimetRoutes
