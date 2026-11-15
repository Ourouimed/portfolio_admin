import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js"; 
import { addInvoice, getInvoices } from "../controllers/InvoiceController.js";
import { validateInvoice } from "../validators/invoiceValidator.js";
const router = Router()


router.post("/" , verifyJWT , validateInvoice , addInvoice)
router.get("/" , verifyJWT , getInvoices)


export default router