import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getProfile, saveProfile } from "../controllers/profileController.js";
import multer from "multer";
import { validateProfile } from "../validators/profileValidator.js";


const router = Router()


const storage = multer.memoryStorage();
const upload = multer({ storage }); 

router.put('/' , verifyJWT , upload.single("resume") , validateProfile , saveProfile)
router.get('/'  , getProfile)


export default router