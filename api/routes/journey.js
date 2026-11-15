import { Router } from "express"
import verifyJWT from "../middlewares/verifyJWT.js"
import { addJourney, deleteJourney, updateJourney, getJourney } from "../controllers/journeyController.js"
import { validateJourney } from "../validators/journeyValidator.js"
const router = Router()

router.get("/"  , getJourney)
router.post("/" , verifyJWT , validateJourney , addJourney)
router.delete('/:id'  , verifyJWT ,  deleteJourney)
router.put('/:id'  , verifyJWT ,  validateJourney , updateJourney)

export default router