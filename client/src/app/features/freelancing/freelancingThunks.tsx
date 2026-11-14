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


export const getFreelanceProjects = createAsyncThunk('freelancing/get' , async (_, thunkAPI)=>{
  try {
    return await freelancingService.getFreelanceProjects()
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Unknown Error");
  }
})


export const deleteFreelanceProject = createAsyncThunk('task/delete' , async (id : string, thunkAPI)=>{
  try {
    return await freelancingService.deleteFreelanceProject(id);
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Unknown Error");
  }
})



export const editFreelanceProject = createAsyncThunk('task/edit' , async (data : { data : FreelanceProject , _id : string}, thunkAPI)=>{
  try {
    return await freelancingService.editFreelanceProject(data.data , data._id)
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Unknown Error");
  }
})
