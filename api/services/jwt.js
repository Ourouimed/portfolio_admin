import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (payload) =>jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    