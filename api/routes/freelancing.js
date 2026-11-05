import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { addFreelanceProject} from "../controllers/freelancingController.js"

const router = Router()


router.post('/' , verifyJWT , addFreelanceProject)


export default router