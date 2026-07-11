import { createSlice } from "@reduxjs/toolkit"
import type { ToastState } from "./toastTypes"

const initialState : ToastState = {
    toasts : []
}
export const toastSlice = createSlice({
    name : "toast" , 
    initialState ,
    reducers : {
        addToast : (state , action)=>{
            state.toasts.push(action.payload)
        },
        removeToast : (state , action)=>{
            state.toasts = state.toasts.filter((_ , i)=> i !== action.payload)
        }
    }
})

export const { addToast , removeToast} = toastSlice.actions

export default toastSlice.reducer