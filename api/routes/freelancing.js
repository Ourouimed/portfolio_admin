import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { addFreelanceProject, deleteFreelanceProject, updateFreelanceProject, getFreelanceProjectById, getFreelanceProjects} from "../controllers/freelancingController.js"
import { validateFreelanceProject } from "../validators/freelanceProjectValidator.js";

const router = Router()


router.post('/' , verifyJWT , validateFreelanceProject , addFreelanceProject)
router.get('/' , verifyJWT , getFreelanceProjects)
router.get('/project/:id' , verifyJWT , getFreelanceProjectById)
router.delete('/project/:id'  , verifyJWT ,  deleteFreelanceProject)
router.put('/project/:id'  , verifyJWT , validateFreelanceProject , updateFreelanceProject)


export default router