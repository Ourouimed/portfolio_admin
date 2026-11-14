import { createSlice } from "@reduxjs/toolkit";
import type { InvoiceState } from "./invoiceTypes";
import { addInvoice, getInvoices } from "./invoiceThunks";


const initialState: InvoiceState = {
    isLoading: false,
    invoices: []
}
const invoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        // get invoices
        .addCase(getInvoices.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getInvoices.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.invoices = action.payload.invoices;
        })
        .addCase(getInvoices.rejected, (state) => {
            state.isLoading = false;
        })

        
        // add invoice 
        .addCase(addInvoice.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addInvoice.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.invoices.push(action.payload.invoice);
        })
        .addCase(addInvoice.rejected, (state) => {
            state.isLoading = false;
        })
})


export default invoiceSlice.reducer