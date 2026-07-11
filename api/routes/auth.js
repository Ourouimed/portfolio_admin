import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { login, logout, verifySession } from "../controllers/authController.js";

const router = Router()

router.post('/login'  , login)
router.post('/logout' , logout)
router.get('/verify-session' , verifyJWT , verifySession)


export default router