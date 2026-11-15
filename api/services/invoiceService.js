import Invoice from "../models/Invoice.js"

const create = async (data) => await Invoice.create({
    ...data,
    ...(data?.project && { project: data.project }),
})


const getAll = async ()=> await Invoice.find().sort({ createdAt: -1 });


export default { create , getAll}