import FreelanceProject from "../models/FreelanceProject.js"

const create = async (data) => {
    return await FreelanceProject.create({
        ...data,
        client: {
            name: data.client.name,
            email: data.client.email,
            phone: data.client.phone
        }
    });
}


const getAll = async () => await FreelanceProject.find().sort({ createdAt: -1 }).populate("tasks").lean();

const getById = async (id) => await FreelanceProject.findById(id).populate("tasks");

const deleteById = async (id) => await FreelanceProject.findByIdAndDelete(id);


const updateById = async (id, data) => {
    return await FreelanceProject.findByIdAndUpdate(
        id,
        {
            $set: {
                ...data,
                client: {
                    name: data.client.name,
                    email: data.client.email,
                    phone: data.client.phone
                }
            }
        },
        { returnDocument: "after" },
    )
}


const addInvoice = async (id, invoice_id) => await FreelanceProject.findByIdAndUpdate(id, {
    $addToSet: { invoices:  invoice_id}
});


const addTask = async (id, task_id) => await FreelanceProject.findByIdAndUpdate(id, {
    $addToSet: { tasks:  task_id}
});


export default { create, getAll, getById, deleteById, updateById , addInvoice , addTask}