export const validateJourney = (req, res, next) => {
    const { title, org, start_date, end_date, type } = req.body;

    if (!title || !start_date || !end_date || !type)
        return res.status(400).json({
            message: "Missing some required fields",
        });

    next()
}
