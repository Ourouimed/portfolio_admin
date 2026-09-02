import { useAppSelector } from "../app/hooks"

export const useTask = ()=>{
    return useAppSelector((state : any)=> state.task)
}