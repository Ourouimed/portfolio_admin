export const validateInvoice = (req, res, next) => {
    const { title , currency, issue_date, due_date, items } = req.body

    if (!title || !currency || !issue_date || !due_date) {
        return res.status(400).json({
            message: "Missing some required fields",
        });
    }

    if (!["MAD", "€", "$"].includes(currency)) {
        return res.status(422).json({
            message: "Not supported currency"
        })
    }


    // Invoice Dates validation
    if (issue_date) {
        const selectedDate = new Date(issue_date);
        const now = new Date();

        if (selectedDate.getDate() < now.getDate()) {
            return res.status(422).json({
                message: "Invoice issue date must be in the future"
            });
        }
    }
    else {
        return res.status(400).json({
            message: "Invoice issue date is required"
        });
    }


    if (due_date) {
        const startDate = new Date(issue_date);
        const selectedDate = new Date(due_date);
        const now = new Date();

        if (selectedDate.getDate() < now.getDate()) {
            return res.status(422).json({
                message: "Invoice due date must be in the future"
            });
        }

        if (selectedDate.getDate() < startDate.getDate()) {
            return res.status(422).json({
                message: "Invoice due date cannot be before issue date"
            });;
        }

    }
    else {
        return res.status(400).json({
            message: "Freelance Project due date is required"
        });
    }


    // items validation
    if (items.length === 0 || !Array.isArray(items)) {
        return res.status(422).json({
            message: "You must add at least one item to invoice"
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



    next()
}