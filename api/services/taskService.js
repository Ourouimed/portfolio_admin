import Task from "../models/Task.js";

const create = async (data) => await Task.create({
    ...data,
    ...(data?.project && { project: data.project })
})

const getAll = async () => await Task.find().sort({ createdAt: -1 });

const getById = async (id) => await Task.findById(id);

const updateById = async (id, data) => await Task.findByIdAndUpdate(id, {
    $set: data
}, { returnDocument: "after" })


const deleteById = async (id)=> await Task.findByIdAndDelete(id);

export default { create, getAll, getById , updateById , deleteById}