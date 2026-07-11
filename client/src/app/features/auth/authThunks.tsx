import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const loginUser = createAsyncThunk('auth/login' , async (user : {email : string , password : string}, thunkAPI)=>{
  try {
    return await authService.login(user)
  }
  catch (err : any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const verifySession = createAsyncThunk('auth/verify-session' , async (_ , thunkAPI)=>{
  try {
    return await authService.verifySession()
  }
  catch (err : any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})

export const logout = createAsyncThunk('auth/logout' , async (_ , thunkAPI)=>{
  try {
    return await authService.logout()
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})