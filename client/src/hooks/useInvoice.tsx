import { useAppSelector } from "../app/hooks"

export const useInvoice = ()=>{
    return useAppSelector((state : any)=> state.invoice)
}