import type { InputProps } from "../../interfaces/inputProps"
export const Input = ({className , postIcon : PostIcon , preIcon : PreIcon , ...props} : InputProps)=>{
    return <div className="flex items-center gap-1 rounded-lg border border-gray-300">
        {PreIcon && <div className="px-3">
            <PreIcon size={16}/>
        </div>}

        <input className={`w-full py-2 px-3 
            transition duration-300 outline-none
            ${className}`} {...props}>                          
        </input>
            {PostIcon && <div className="px-3">
                <PostIcon size={16}/>
            </div>}
    </div>
}