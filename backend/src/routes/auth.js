import express from "express"
import { createUser, googleLogin, loginUser } from "../controllers/authControllers.js"
const router = express.Router()

router.post("/",loginUser)

router.post("/google-login",googleLogin)

router.post("/register",createUser)

export default router