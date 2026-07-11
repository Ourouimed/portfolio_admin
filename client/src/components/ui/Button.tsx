import type { BtnProps } from "../../interfaces/btnProps"

export const Button = ({children , fullWidth , variant ="default" , ...props} : BtnProps )=>{
    const VARIANTS : any = {
        "DEFAULT" : "bg-black text-white" ,
        "DESTRUCTIVE" : "bg-red-500 text-white"
    }
    return <button {...props} 
    className={`py-2 px-4  ${VARIANTS[variant.toLocaleUpperCase()]} cursor-pointer rounded-lg flex items-center justify-center ${fullWidth ? "w-full" : ""}`}>
        {children}
    </button>
}