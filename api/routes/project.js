import { Router } from "express";
import { addProject, deleteProject, updateProject, getAllProjects } from "../controllers/projectController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import multer from "multer";
import { validateProject } from "../validators/projectValidator.js";

const router = Router()

// memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }); 


router.post('/'  , verifyJWT , upload.single("image") , validateProject , addProject)
router.get('/'  ,  getAllProjects)
router.delete('/:id'  , verifyJWT ,  deleteProject)
router.put('/:id'  , verifyJWT , upload.single("image") ,  validateProject , updateProject)

export default router