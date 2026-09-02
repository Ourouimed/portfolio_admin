import { createSlice } from "@reduxjs/toolkit";
import type { TaskState } from "./taskTypes";
import { addTask, changeTaskStatus, getTasks } from "./taskThunks";

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
        state.tasks.push(action.payload.project);
      })
      .addCase(addTask.rejected, (state) => {
        state.isLoading = false;
      })



      // change status
      .addCase(changeTaskStatus.pending, (state) => {
        // state.isLoading = true;
      })
      .addCase(changeTaskStatus.fulfilled, (state, action) => {
        // state.isLoading = false;
        const taskId = action.meta.arg
        const taskIndex = state.tasks.findIndex(t => t._id === taskId)
        if (taskIndex !== -1){
            state.tasks[taskIndex] = action.payload.task
        }
        
      })
      .addCase(changeTaskStatus.rejected, (state) => {
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
      }),
});

export default taskSlice.reducer;
