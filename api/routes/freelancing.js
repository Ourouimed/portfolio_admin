import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { addFreelanceProject, getFreelanceProjects} from "../controllers/freelancingController.js"

const router = Router()


router.post('/' , verifyJWT , addFreelanceProject)
router.get('/' , verifyJWT , getFreelanceProjects)


export default router