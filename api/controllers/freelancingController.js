export const addFreelanceProject = async (req, res) => {
    try {
        console.log(req.body)
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}