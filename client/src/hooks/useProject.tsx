import { useAppSelector } from "../app/hooks"

export const useProject = ()=>{
    return useAppSelector((state : any)=> state.project)
}