import { useAppSelector } from "../app/hooks"

export const useJourney = ()=>{
    return useAppSelector((state : any)=> state.journey)
}