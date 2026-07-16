import { createSlice } from "@reduxjs/toolkit";
import type { ProjectState } from "./projectTypes";
import { addProject, deleteProject, editProject, getAllProjects } from "./projectThunks";

const initialState: ProjectState = {
  isLoading: false,
  projects: [],
};
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // add project
      .addCase(addProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.projects.push(action.payload.project)
      })
      .addCase(addProject.rejected, (state) => {
        state.isLoading = false;
      })


      // get All projects
      .addCase(getAllProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.projects = action.payload.projects
      })
      .addCase(getAllProjects.rejected, (state) => {
        state.isLoading = false;
      })



      // delete project
      .addCase(deleteProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg
        
        state.projects = state.projects.filter((p)=> p._id !== id)
      })
      .addCase(deleteProject.rejected, (state) => {
        state.isLoading = false;
      })



      // updated project
      .addCase(editProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProject.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.meta.arg
        const projectIndex= state.projects.findIndex(p => p._id === _id)

        if (projectIndex != -1) state.projects[projectIndex] = action.payload.project
        
        
      })
      .addCase(editProject.rejected, (state) => {
        state.isLoading = false;
      }),
});

export default projectSlice.reducer;
