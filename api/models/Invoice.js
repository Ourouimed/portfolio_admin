import { model, Schema } from "mongoose";

const invoiceSchema = new Schema(
    {
        project: {
            type: Schema.Types.ObjectId,
            ref: "FreelanceProject",
            default: null
        },

        currency: {
            type: String,
            enum: ["MAD", "$", "€"],
            required: true
        },

        issue_date: {
            type: Date,
            required: true
        },

        total : {
            type : Number ,
            required : true ,
            default : 0 ,
            min : 0
        },


        status : {
            type : String ,
            enum: ["Sent" , "Partial" , "Paid"],
            required : true ,
            default : "Sent"
        },

        due_date: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= this.issue_date;
                },
                message: "Due date cannot be before issue date"
            }
        },

        items: {
            type: [{
                description: {
                    type: String,
                    required: true,
                    trim: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    validate: {
                        validator: Number.isInteger,
                        message: "Quantity must be an integer"
                    }
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }],
            
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Invoice must contain at least one item"
            }
        },

        payments: [{
            amount: {
                type: Number,
                required: true,
                min: 0.01
            },
            method: {
                type: String,
                required: true
            },
            paid_date: {
                type: Date,
                required: true
            }
        }]
    },
    { timestamps: true }
);

export default model("Invoice", invoiceSchema);