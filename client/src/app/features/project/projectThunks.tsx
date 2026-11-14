import { createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "./projectService";

export const addProject = createAsyncThunk('project/add' , async (data : FormData, thunkAPI)=>{
  try {
    return await projectService.addProject(data)
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const editProject = createAsyncThunk('project/edit' , async (data : { data : FormData , _id : string}, thunkAPI)=>{
  try {
    return await projectService.editProject(data.data , data._id)
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const getAllProjects = createAsyncThunk('project/get' , async (_, thunkAPI)=>{
  try {
    return await projectService.getAllProjects()
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const deleteProject = createAsyncThunk('project/delete' , async (id : string, thunkAPI)=>{
  try {
    return await projectService.deleteProject(id)
  }
  catch (err: any){
    console.log(err?.response?.data)
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Unknown Error");
  }
})