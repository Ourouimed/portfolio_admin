import { createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";
import type { Task } from "./taskTypes";

export const addTask = createAsyncThunk('task/add' , async (data : Task, thunkAPI)=>{
  try {
    return await taskService.addTask(data)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const changeTaskStatus = createAsyncThunk('task/changeStatus' , async (id : string, thunkAPI)=>{
  try {
    return await taskService.changeStatus(id)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const getTasks = createAsyncThunk('task/get' , async (_, thunkAPI)=>{
  try {
    return await taskService.getTasks()
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const deleteTask = createAsyncThunk('task/delete' , async (id : string, thunkAPI)=>{
  try {
    return await taskService.deleteTask(id)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const editTask = createAsyncThunk('task/edit' , async (data : { data : Task , _id : string}, thunkAPI)=>{
  try {
    return await taskService.editTask(data.data , data._id)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})
