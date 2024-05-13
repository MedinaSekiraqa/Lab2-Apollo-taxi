import { Router } from "express"
import { getAllActivity, getActivityByUserId, getActivityByShpenzimetId, getActivitiyByKategoriaEShpenzimeveId } from "~/controllers/activity"

import createMulter from "~/lib/multer"
// import { uploadFile } from "~/lib/multer"
import { checkTokenExpired } from "~/middlewares/authorize"
import validateRequestSchema from "~/middlewares/validate-request-schema"

const activityRoutes = Router()


activityRoutes.get("/",getAllActivity)
activityRoutes.get("/:userId",getActivityByUserId)
activityRoutes.get("/:shpenzimetId",getActivityByShpenzimetId)
activityRoutes.get("/:kategoriaEShpenzimeveId",getActivitiyByKategoriaEShpenzimeveId)



export default activityRoutes