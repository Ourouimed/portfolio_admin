import { createSlice } from "@reduxjs/toolkit";
import type { TaskState } from "./taskTypes";
import {
  addTask,
  changeTaskStatus,
  deleteTask,
  editTask,
  getTasks,
} from "./taskThunks";

const initialState: TaskState = {
  isLoading: false,
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // add task
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload.task);
      })
      .addCase(addTask.rejected, (state) => {
        state.isLoading = false;
      })

      // change status
      .addCase(changeTaskStatus.pending, () => {
        // state.isLoading = true;
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        // state.isLoading = false;
        const taskId = action.meta.arg;
        const taskIndex = state.tasks.findIndex((t) => t._id === taskId);
        if (taskIndex !== -1) {
          state.tasks[taskIndex] = action.payload.task;
        }
      })
      .addCase(changeTaskStatus.rejected, () => {
        // state.isLoading = false;
      })

      // get tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.tasks;
      })
      .addCase(getTasks.rejected, (state) => {
        state.isLoading = false;
      })

      // delete Task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;

        state.tasks = state.tasks.filter((t) => t._id !== id);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false;
      })

      // update task
      .addCase(editTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.meta.arg;
        const taskIndex = state.tasks.findIndex((j) => j._id === _id);

        if (taskIndex != -1) state.tasks[taskIndex] = action.payload.task;
      })
      .addCase(editTask.rejected, (state) => {
        state.isLoading = false;
      }),
});

export default taskSlice.reducer;
