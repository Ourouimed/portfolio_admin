import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { addFreelanceProject, deleteFreelanceProject, editFreelanceProject, getFreelanceProjectById, getFreelanceProjects} from "../controllers/freelancingController.js"

const router = Router()


router.post('/' , verifyJWT , addFreelanceProject)
router.get('/' , verifyJWT , getFreelanceProjects)
router.get('/project/:id' , verifyJWT , getFreelanceProjectById)
router.delete('/project/:id'  , verifyJWT ,  deleteFreelanceProject)
router.put('/project/:id'  , verifyJWT ,  editFreelanceProject)


export default router