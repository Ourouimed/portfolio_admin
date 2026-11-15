export const validateProfile = (req, res, next) => {
    const { email, instagram, linkedin, github, whatsapp, location, } = req.body;

    if (!email?.trim() || !instagram?.trim() || !linkedin?.trim() || !github?.trim() || !whatsapp?.trim() || !location?.trim()) {
        return res.status(400).json({
            message: "Missing some required fields",
        });
    }

    if (req.file) {
        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Resume must be a PDF file",
            });
        }
    }

    next()
}
