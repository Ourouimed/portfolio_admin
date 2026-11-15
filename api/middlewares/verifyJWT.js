import { config } from 'dotenv';
import { verifyToken } from '../services/jwt.js';
config()

const verifyJWT = (req, res, next) => {
  const token = req.cookies?.token 
  if (!token) {
    return res.status(401).json({ message : 'Session expired or invalid. Please login again.' });
   }
  try {
    const decoded = verifyToken(token)
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message : "Invalid or expired token" });
  }
};

export default verifyJWT