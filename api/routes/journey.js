import { Router } from "express"
import verifyJWT from "../middlewares/verifyJWT.js"
import { addJourney, deleteJourney, editJourney, getJourney } from "../controllers/journeyController.js"
const router = Router()

router.get("/" , verifyJWT , getJourney)
router.post("/" , verifyJWT , addJourney)
router.delete('/:id'  , verifyJWT ,  deleteJourney)
router.put('/:id'  , verifyJWT ,  editJourney)

export default router