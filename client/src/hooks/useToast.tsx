
import { useDispatch } from "react-redux"
import { addToast, removeToast } from "../app/features/toast/toastSlice"

export const useToast = () => {
    const dispatch = useDispatch()
    return {
        success: (message : string) => {
            dispatch(addToast({message , type : 'success'}))

            setTimeout(()=>{
                dispatch(removeToast(0))
            }, 3000)
        },
        error: (message : string) => {
            dispatch(addToast({message , type : 'error'}))

            setTimeout(()=>{
                dispatch(removeToast(0))
            }, 3000)
        },
        warning: (message: string) => {
            dispatch(addToast({message , type : 'warning'}))

            setTimeout(()=>{
                dispatch(removeToast(0))
            }, 3000)
        },
        info: (message : string) => {
            dispatch(addToast({message , type : 'info'}))

            setTimeout(()=>{
                dispatch(removeToast(0))
            }, 3000)
        },
        removeToast: (index : number) => {
            dispatch(removeToast(index))
        }
    }
}