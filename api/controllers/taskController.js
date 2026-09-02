import { taskFormater } from "../lib/formaters.js";
import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    const { title, content, date } = req.body;

    if (!title || !content || !date)
      return res.status(400).json({
        error: "Missing some required fields",
      });

    if (date) {
      const selectedDate = new Date(date);
      const now = new Date();

      if (selectedDate <= now) {
        return res.status(400).json({
          error: "Task date and time must be in the future",
        });
      }
    } else {
      return res.status(400).json({
        error: "Task date and time is required",
      });
    }

    const task = await Task.create({
      title,
      content,
      date,
    });

   

    return res.json({ task: taskFormater(task) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    console.log(tasks);

    const formatedTasks = tasks.map((t) => taskFormater(t));
    return res.json({
      tasks: formatedTasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params

    const task = await Task.findById(id);

    if (!task){
        return res.status(404).json({
            error : "Task not found"
        })
    }

    // if (!(["active" , "completed"].includes(status))){
    //     return res.status(404).json({
    //         error : "Unvalid status"
    //     })
    // }

    const newStatus = task.status === "active" ? "completed" : "active"

    const newTask = await Task.findByIdAndUpdate(id , {
        $set : {
            status : newStatus
        }
    }, { new : true})


    return res.json({ task: taskFormater(newTask) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
