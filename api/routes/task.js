import { Router } from "express";
import { addTask, changeTaskStatus, deleteTask, updateTask, getTasks } from "../controllers/taskController.js"
import verifyJWT from "../middlewares/verifyJWT.js"
import { validateTask } from "../validators/taskValidator.js";

const router = Router()

router.get("/" , verifyJWT , getTasks)
router.post("/" , verifyJWT ,validateTask , addTask);
router.put("/status/:id"  ,  verifyJWT , changeTaskStatus);
router.delete('/:id'  , verifyJWT ,  deleteTask)
router.put('/:id'  , verifyJWT , validateTask , updateTask)

export default router