import { model, Schema } from "mongoose";

const taskSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Todo", "Doing", "Done"],
      default: "Todo",
    },
    priority: {
      type: String,
      required: true,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "FreelanceProject",
      default : null
    }
  },
  { timestamps: true },
);

export default model("Task", taskSchema);
