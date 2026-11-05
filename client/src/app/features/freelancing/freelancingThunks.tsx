import { createAsyncThunk } from "@reduxjs/toolkit";
import type { FreelanceProject } from "./freelancingTypes";
import freelancingService from "./freelancingService";

export const addFreelanceProject = createAsyncThunk('freelancing/add' , async (data : FreelanceProject, thunkAPI)=>{
  try {
    return await freelancingService.addFreelanceProject(data)
  }
  catch (err: any){
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})