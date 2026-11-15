import bcrypt from "bcryptjs";

export const comparePassword = async (password , hash)=> bcrypt.compare(password, hash);