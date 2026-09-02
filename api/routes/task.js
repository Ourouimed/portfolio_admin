import { Router } from "express";
import { addTask, changeTaskStatus, getTasks } from "../controllers/taskController.js"
import verifyJWT from "../middlewares/verifyJWT.js"

const router = Router()

router.get("/" , verifyJWT , getTasks)
router.post("/" , verifyJWT , addTask);
router.put("/status/:id"  , changeTaskStatus);

export default router