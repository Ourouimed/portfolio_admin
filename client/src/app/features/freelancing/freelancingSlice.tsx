import { createSlice } from "@reduxjs/toolkit";
import type { FreelancingState } from "./freelancingTypes";
import { addFreelanceProject, deleteFreelanceProject, editFreelanceProject, getFreelanceProjects } from "./freelancingThunks";

const initialState: FreelancingState = {
    isLoading: false,
    freelanceProjects: []
}
const freelancingSlice = createSlice({
    name: "freelancing",
    initialState,
    reducers: {},

    extraReducers: builder => builder
        // get freelance projects
        .addCase(getFreelanceProjects.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getFreelanceProjects.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.freelanceProjects = action.payload.freelanceProjects;
        })
        .addCase(getFreelanceProjects.rejected, (state) => {
            state.isLoading = false;
        })


        // add project 
        .addCase(addFreelanceProject.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addFreelanceProject.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.freelanceProjects.push(action.payload.freelanceProject);
        })
        .addCase(addFreelanceProject.rejected, (state) => {
            state.isLoading = false;
        })

        // delete project
        .addCase(deleteFreelanceProject.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(deleteFreelanceProject.fulfilled, (state, action) => {
            state.isLoading = false;
            const id = action.meta.arg;

            state.freelanceProjects = state.freelanceProjects.filter((p) => p._id !== id);
        })
        .addCase(deleteFreelanceProject.rejected, (state) => {
            state.isLoading = false;
        })

        // update project
        .addCase(editFreelanceProject.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(editFreelanceProject.fulfilled, (state, action) => {
            state.isLoading = false;
            const { _id } = action.meta.arg;
            const projectIndex = state.freelanceProjects.findIndex((j) => j._id === _id);

            if (projectIndex != -1) state.freelanceProjects[projectIndex] = action.payload.freelanceProject;
        })
        .addCase(editFreelanceProject.rejected, (state) => {
            state.isLoading = false;
        }),
})


export default freelancingSlice.reducer