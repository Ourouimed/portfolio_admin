import Project from "../models/Project.js";

const create = async (data) => await Project.create({
    ...data,
    ...(data?.source && { source: data.source }),
    ...(data?.preview && { preview: data.preview })
})


const getAll = async () => await Project.find().sort({ createdAt: -1 });

const getById = async (id) => await Project.findById(id);

const deleteById = async (id) => await Project.findByIdAndDelete(id);

const updateById = async (id, data) => await Project.findByIdAndUpdate(id, {
    $set: {
        ...data ,
        ...(data?.name && { name : data.name }),
        ...(data?.description && { description : data.description }),
        ...(data?.tech.length > 0 && { tech : data.tech }),
        ...(data?.img_url && { image: data.img_url })
    }
}, { returnDocument: "after" })

export default { create, getAll, getById, deleteById , updateById}