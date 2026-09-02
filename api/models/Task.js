import { model, Schema } from "mongoose";

const taskSchema = Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default model("tasks", taskSchema);
