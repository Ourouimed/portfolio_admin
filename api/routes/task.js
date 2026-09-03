import { Router } from "express";
import { addTask, changeTaskStatus, deleteTask, editTask, getTasks } from "../controllers/taskController.js"
import verifyJWT from "../middlewares/verifyJWT.js"

const router = Router()

router.get("/" , verifyJWT , getTasks)
router.post("/" , verifyJWT , addTask);
router.put("/status/:id"  ,  verifyJWT , changeTaskStatus);
router.delete('/:id'  , verifyJWT ,  deleteTask)
router.put('/:id'  , verifyJWT ,  editTask)

export default router