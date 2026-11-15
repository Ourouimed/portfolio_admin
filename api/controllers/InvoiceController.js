import { invoiceFormater } from "../lib/formaters.js";
import freelanceService from "../services/freelanceService.js";
import invoiceService from "../services/invoiceService.js";

export const addInvoice = async (req, res) => {
    try {
        const { title, project, currency, issue_date, due_date, items } = req.body

        const total = items.reduce((acc , item)=>{
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return acc + (qty * price);
        } , 0)

        const invoice = await invoiceService.create({ title, project, currency, issue_date, due_date, items , total})

        if (project) {
            await freelanceService.addInvoice(project , invoice._id)
        }

        return res.json({ invoice: invoiceFormater(invoice) });

    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }

}


export const getInvoices = async (req, res) => {
    try {
        const invoices = await invoiceService.getAll()

        const formatedInvoices = invoices.map((i) => invoiceFormater(i));

        return res.json({
            invoices: formatedInvoices,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}