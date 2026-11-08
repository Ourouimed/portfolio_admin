import { model, Schema } from "mongoose";

const FreelanceProjectSchema = Schema({
    client: {
        name: { type: String, required: true },
        email: { type: String, required: true,},
        phone: { type: String, required: true },
    },
    project_name: { type: String, required: true },
    description: String,
    status: {
        type: String,
        required: true,
        enum: ["Planning", "In progress", "Review", "Done", "Delivered"],
        default: "Planning",
    },
    start_date: { type: Date, required: true },
    deadline: { type: Date, required: true },
    docs: [
        {
            url: { type: String, required: true },
            title: { type: String, required: true },
        }
    ],
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: "Task",
        }
    ]
}, { timestamps: true })


export default model("FreelanceProject", FreelanceProjectSchema)