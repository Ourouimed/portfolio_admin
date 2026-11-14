import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Invoice } from "./invoiceTypes";
import invoiceService from "./invoiceService";

export const addInvoice = createAsyncThunk('invoice/add' , async (data : Invoice, thunkAPI)=>{
  try {
    return await invoiceService.addInvoice(data)
  }
  catch (err: any){
    console.log(err)
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})


export const getInvoices = createAsyncThunk('invoice/get' , async (_, thunkAPI)=>{
  try {
    return await invoiceService.getInvoices()
  }
  catch (err: any){
    return thunkAPI.rejectWithValue(err.response?.data?.error || "Unknown Error");
  }
})



