import axiosService from "../../../lib/axiosService";
import type { Invoice } from "./invoiceTypes";

const addInvoice = async (data : Invoice)=>{
    const respone = await axiosService.post(`/api/invoice` , data);
    return respone.data
}

const getInvoices = async ()=>{
    const respone = await axiosService.get(`/api/invoice`);
    return respone.data
}


export default { addInvoice , getInvoices }