import { createSlice } from "@reduxjs/toolkit";
import type { FreelancingState } from "./freelancingTypes";
import { addFreelanceProject, getFreelanceProjects } from "./freelancingThunks";

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
            state.freelanceProjects.push(action.payload.journey);
        })
        .addCase(addFreelanceProject.rejected, (state) => {
            state.isLoading = false;
        })

})


export default freelancingSlice.reducer