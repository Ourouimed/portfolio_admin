import { createAsyncThunk } from "@reduxjs/toolkit";
import journeyService from "./journeyService";
import type { Journey } from "./journeyTypes";

export const getJourney = createAsyncThunk('journey/get' , async (_, thunkAPI)=>{
  try {
    return await journeyService.getJourney()
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const addJourney = createAsyncThunk('journey/add' , async (data : Journey, thunkAPI)=>{
  try {
    return await journeyService.addJourney(data)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const deleteJourney = createAsyncThunk('journey/delete' , async (id : string, thunkAPI)=>{
  try {
    return await journeyService.deleteJourney(id)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



export const editJourney = createAsyncThunk('project/edit' , async (data : { data : Journey , _id : string}, thunkAPI)=>{
  try {
    return await journeyService.editJourney(data.data , data._id)
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})