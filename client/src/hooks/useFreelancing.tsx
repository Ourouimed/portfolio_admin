import { useAppSelector } from "../app/hooks"

export const useFreelancing = ()=>{
    return useAppSelector((state : any)=> state.freelancing)
}