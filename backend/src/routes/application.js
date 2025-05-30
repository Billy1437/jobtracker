import express from "express"
import { createApplication, deleteApplication, getAllUserApplications, updateApplication } 
from "../controllers/applicationController.js"
import { protect } from "../middlewares/auth.js"

const router = express.Router()

// middle ware for auth
// protect these routes
router.use(protect)

router.get("/", getAllUserApplications)

router.post("/", createApplication)

router.put("/:id", updateApplication)

router.delete("/:id",deleteApplication)



export default router