import { createSlice } from "@reduxjs/toolkit";
import type { JourneyState } from "./journeyTypes";
import {
  addJourney,
  deleteJourney,
  editJourney,
  getJourney,
} from "./journeyThunks";

const initialState: JourneyState = {
  isLoading: true,
  journeys: [],
};

const journeySlice = createSlice({
  name: "journey",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // get journey
      .addCase(getJourney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJourney.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.journeys = action.payload.journeys;
      })
      .addCase(getJourney.rejected, (state) => {
        state.isLoading = false;
      })

      // add journey
      .addCase(addJourney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addJourney.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.journeys.push(action.payload.journey);
      })
      .addCase(addJourney.rejected, (state) => {
        state.isLoading = false;
      })

      // delete journey
      .addCase(deleteJourney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJourney.fulfilled, (state, action) => {
        state.isLoading = false;
        const id = action.meta.arg;

        state.journeys = state.journeys.filter((j) => j._id !== id);
      })
      .addCase(deleteJourney.rejected, (state) => {
        state.isLoading = false;
      })

      // update project
      .addCase(editJourney.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editJourney.fulfilled, (state, action) => {
        state.isLoading = false;
        const { _id } = action.meta.arg;
        const journeyIndex = state.journeys.findIndex((j) => j._id === _id);

        if (journeyIndex != -1)
          state.journeys[journeyIndex] = action.payload.journey;
      })
      .addCase(editJourney.rejected, (state) => {
        state.isLoading = false;
      }),
});

export default journeySlice.reducer;
