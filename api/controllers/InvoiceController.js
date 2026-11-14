import { invoiceFormater } from "../lib/formaters.js";
import FreelanceProject from "../models/FreelanceProject.js";
import Invoice from "../models/Invoice.js";

export const addInvoice = async (req, res) => {
    try {
        const { title, project, currency, issue_date, due_date, items } = req.body

        if (!title || !currency || !issue_date || !due_date) {
            return res.status(400).json({
                error: "Missing some required fields",
            });
        }

        if (!["MAD", "€", "$"].includes(currency)) {
            return res.status(422).json({
                error: "Not supported currency"
            })
        }


        // Invoice Dates validation
        if (issue_date) {
            const selectedDate = new Date(issue_date);
            const now = new Date();

            if (selectedDate.getDate() < now.getDate()) {
                return res.status(422).json({
                    error: "Invoice issue date must be in the future"
                });
            }
        }
        else {
            return res.status(400).json({
                error: "Invoice issue date is required"
            });
        }


        if (due_date) {
            const startDate = new Date(issue_date);
            const selectedDate = new Date(due_date);
            const now = new Date();

            if (selectedDate.getDate() < now.getDate()) {
                return res.status(422).json({
                    error: "Invoice due date must be in the future"
                });
            }

            if (selectedDate.getDate() < startDate.getDate()) {
                return res.status(422).json({
                    error: "Invoice due date cannot be before issue date"
                });;
            }

        }
        else {
            return res.status(400).json({
                error: "Freelance Project due date is required"
            });
        }


        // items validation
        if (items.length === 0 || !Array.isArray(items)) {
            return res.status(422).json({
                error: "You must add at least one item to invoice"
            });
        }


        const itemsErrors = []
        items.forEach((item, index) => {
            if (!item.description.trim()) {
                itemsErrors.push({
                    field: `items[${index}].description`,
                    error: "Item description is required"
                });
            }


            if (item.price < 0) {
                itemsErrors.push({
                    field: `items[${index}].price`,
                    error: "Item price cannot be negatif"
                });
            }


            if (item.quantity <= 0) {
                itemsErrors.push({
                    field: `items[${index}].quantity`,
                    error: "Item quanity cannot be null"
                });
            }
        })


        if (itemsErrors.length >= 1) {
            return res.status(422).json({
                error: "Invoice validation failed",
            });
        }


        const total = items.reduce((acc , item)=>{
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return acc + (qty * price);
        } , 0)



        const invoice = await Invoice.create({
            title,
            currency , 
            issue_date, 
            due_date, 
            items ,
            total ,
            ...(project && { project }),
        })


        if (project) {
            await FreelanceProject.findByIdAndUpdate(project, {
                $addToSet: { invoices : invoice._id }
            });
        }


        return res.json({ invoice: invoiceFormater(invoice) });



    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }

}


export const getInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().sort({ createdAt: -1 });

        const formatedInvoices = invoices.map((i) => invoiceFormater(i));
        console.log(formatedInvoices)
        return res.json({
            invoices: formatedInvoices,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}