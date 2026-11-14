import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js"; 
import { addInvoice, getInvoices } from "../controllers/InvoiceController.js";
const router = Router()


router.post("/" , verifyJWT , addInvoice)
router.get("/" , verifyJWT , getInvoices)


export default router