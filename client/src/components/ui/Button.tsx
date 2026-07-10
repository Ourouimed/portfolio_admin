import type { BtnProps } from "../../interfaces/btnProps"

export const Button = ({children , fullWidth , ...props} : BtnProps )=>{
    return <button {...props} className={`py-2 px-4 bg-black text-white cursor-pointer rounded-lg ${fullWidth ? "w-full" : ""}`}>{children}</button>
}