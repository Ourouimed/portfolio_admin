import FreelanceProject from "../models/FreelanceProject.js"

const create = async (data) => {
    return FreelanceProject.create({
        ...data,
        client: {
            name: data.client.name,
            email: data.client.email,
            phone: data.client.phone
        }
    });
}


const getAll = async () => FreelanceProject.find().sort({ createdAt: -1 }).populate("tasks").lean();

const getById = async (id) => FreelanceProject.findById(id).populate("tasks").lean();

const deleteById = async (id) => FreelanceProject.findByIdAndDelete(id);


const updateById = async (id, data) => {
    return FreelanceProject.findByIdAndUpdate(
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


const addInvoice = async (id, invoice_id) => FreelanceProject.findByIdAndUpdate(id, {
    $addToSet: { invoices:  invoice_id}
});


const addTask = async (id, task_id) => FreelanceProject.findByIdAndUpdate(id, {
    $addToSet: { tasks:  task_id}
});


export default { create, getAll, getById, deleteById, updateById , addInvoice , addTask}