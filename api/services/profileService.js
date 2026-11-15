import Profile from "../models/Profile.js";

const updateById = async (id, data) => await Profile.findByIdAndUpdate(
    id,
    { $set: {...data} },
    { returnDocument: "after" }
);

const getOne = async () => await Profile.findOne();

const create = async (data)=> await Profile.create(data);

export default { getOne, updateById , create  }