import { Router } from "express";
import { addProject, deleteProject, editProject, getAllProjects } from "../controllers/projectController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import multer from "multer";

const router = Router()

// memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }); 


router.post('/'  , verifyJWT , upload.single("image") ,  addProject)
router.get('/'  , verifyJWT ,  getAllProjects)
router.delete('/:id'  , verifyJWT ,  deleteProject)
router.put('/:id'  , verifyJWT , upload.single("image") ,  editProject)

export default router