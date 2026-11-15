import Journey from "../models/Journey.js";

const getAll = async () => await Journey.find().sort({ createdAt: -1 });

const create = async (data) => await Journey.create({
    ...data,
    ...(data?.location && { location: data.location }),
    ...(data?.description && { description: data.description }),
    ...(data?.org && { org: data.org }),
    ...(data?.org_link && { org_link: data.org_link }),
});


const updateById = async (id, data) => await Journey.findByIdAndUpdate(
    id,
    {
        $set: {
            ...data,
            ...(data?.location && { location: data.location }),
            ...(data?.description && { description: data.description }),
            ...(data?.org && { org: data.org }),
            ...(data?.org_link && { org_link: data.org_link }),
        },
    },
    { returnDocument: "after" },
);

const getById = async (id) => Journey.findById(id)


const deleteById = async (id) => Journey.findByIdAndDelete(id);




export default { getAll, create, getById, deleteById, updateById }