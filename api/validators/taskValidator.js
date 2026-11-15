export const validateTask = (req, res, next) => {
    const { title, content, date, status, priority } = req.body;

    if (!title || !content || !date || !status || !priority)
        return res.status(400).json({
            message: "Missing some required fields",
        });


    if (date) {
        const selectedDate = new Date(date);
        const now = new Date();

        if (selectedDate <= now) {
            return res.status(400).json({
                message: "Task date and time must be in the future",
            });
        }
    } else {
        return res.status(400).json({
            message: "Task date and time is required",
        });
    }

    next()
}