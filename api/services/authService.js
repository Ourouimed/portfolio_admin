import User from "../models/User.js";

const getUserByEmail = async (email)=> await User.findOne({ email : email.toLowerCase() });

const getUserById = async (id) => await User.findById(id);


export default { getUserByEmail , getUserById }