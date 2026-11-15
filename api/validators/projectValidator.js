export const validateProject = (req, res, next) => {
    const { name, description, tech } = req.body
    if (!name || !description || tech.length === 0) return res.status(400).json({
        message: "Missing some required fields"
    })

    next()
}