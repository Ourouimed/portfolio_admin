import { userFormater } from "../lib/formaters.js";
import authService from "../services/authService.js";
import { comparePassword } from "../services/bcrypt.js";
import { generateToken } from "../services/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res.status(422).json({ message : "All fields are required" });

        const user = await authService.getUserByEmail(email)
        if (!user) return res.status(404).json({ message : "Invalid credentials" });

        const isMatch = await comparePassword(password , user.password)
        if (!isMatch) return res.status(401).json({ message : "Invalid credentials" });

        const token = generateToken({ id: user._id, email: user.email })

        return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
            maxAge: 3600000,
        }).json({
            message: "Login successful",
            user : userFormater(user)
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const verifySession = async (req, res) => {
    try {
        const user = await authService.getUserById(req.user.id)

        if (!user) return res.status(401).json({ message : 'Session expired. Please login again.' });
        return res.json({
            message: "Session valid",
            user :  userFormater(user)
        });
    } catch (err) {
        console.log(err)
        return res.status(401).json({ message : 'Session invalid' });
    }
};

export const logout = async (req, res) => {
    return res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    }).json({ message: 'Logout successful' });
};