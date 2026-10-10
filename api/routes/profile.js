import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getProfile, saveProfile } from "../controllers/profileController.js";
import multer from "multer";


const router = Router()


const storage = multer.memoryStorage();
const upload = multer({ storage }); 

router.put('/' , verifyJWT , upload.single("resume") , saveProfile)
router.get('/' , verifyJWT , getProfile)


export default router