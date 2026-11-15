import { taskFormater } from "../lib/formaters.js";
import FreelanceProject from "../models/FreelanceProject.js";
import freelanceService from "../services/freelanceService.js";
import taskService from "../services/taskService.js";

export const addTask = async (req, res) => {
  try {
    const { title, content, date, status, priority, project } = req.body;

    if (!title || !content || !date || !status || !priority)
      return res.status(400).json({
        message: "Missing some required fields",
      });

    if (date) {
      const selectedDate = new Date(date);
      const now = new Date();

      if (selectedDate <= now) {
        return res.status(400).json({
          message: "Task date and time must be in the future",
        });
      }
    } else {
      return res.status(400).json({
        message: "Task date and time is required",
      });
    }

    const task = await taskService.create({ title, content, date, status, priority, project });


    if (project) {
      await freelanceService.addTask(project, task._id)
    }


    return res.json({ task: taskFormater(task) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAll();

    const formatedTasks = tasks.map((t) => taskFormater(t));

    return res.json({
      tasks: formatedTasks,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const changeTaskStatus = async (req, res) => {
  try {
    const { id } = req.params

    const task = await taskService.getById(id)

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      })
    }


    const newStatus = task.status === "Todo" ? "Doing" :
      task.status === "Doing" ? "Done" :
        "Todo"


    const newTask = await taskService.updateById(id, { status: newStatus })


    return res.json({ task: taskFormater(newTask) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params

    const task = await taskService.getById()
    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }


    await taskService.deleteById(id)
    return res.json({ message: "Task deleted successfully" })
  }
  catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal server error' });
  }
}



export const editTask = async (req, res) => {
  try {
    const { id } = req.params;


    const { title, content, date, status, priority, project } = req.body;

    const task = await taskService.updateById(id , { title, content, date, status, priority, project })

    if (project) {
      await freelanceService.addTask(project , task._id)
    }

    return res.json({ task: taskFormater(task) });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};