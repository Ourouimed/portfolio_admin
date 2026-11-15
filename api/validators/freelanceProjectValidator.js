export const validateFreelanceProject = (req, res, next) => {
    const { client, project_name, status, start_date, deadline } = req.body
    const { name, email, phone } = client


    if (!client || !project_name || !name || !email || !phone || !status || !start_date || !deadline) {
        return res.status(400).json({
            message: "Missing some required fields",
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            message: "Invalid email format",
        });
    }


    // start date and deadline validation
    if (start_date) {
        const selectedDate = new Date(start_date);
        const now = new Date();

        if (selectedDate <= now) {
            return res.status(422).json({
                message: "Freelance Project date must be in the future"
            });
        }
    } else {
        return res.status(400).json({
            message: "Freelance Project date is required"
        });
    }


    if (deadline) {
        const startDate = new Date(start_date);
        const selectedDate = new Date(deadline);
        const now = new Date();

        if (selectedDate <= now) {
            return res.status(422).json({
                message: "Freelance Project deadline must be in the future"
            });

        }

        if (selectedDate <= startDate) {
            return res.status(422).json({
                message: "Freelance Project deadline cannot before project starts"
            });
        }

    } else {
        return res.status(400).json({
            message: "Freelance Project deadline is required"
        });
    }


    next()
}