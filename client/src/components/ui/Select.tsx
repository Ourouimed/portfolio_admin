import type { SelectProps } from "../../interfaces/selectProps"
export const Select = ({className , postIcon : PostIcon , preIcon : PreIcon , options , ...props} : SelectProps)=>{
    return <div className="flex items-center gap-1 rounded-lg border border-gray-300">
        {PreIcon && <div className="px-3">
            <PreIcon size={16}/>
        </div>}

        <select className={`w-full py-2 px-3 
            transition duration-300 outline-none
            ${className}`} {...props}>          
            {options.map((o : any)=> <option value={o} key={o}>{o}</option>)}                
        </select>
            {PostIcon && <div className="px-3"> 
                <PostIcon size={16}/>
            </div>}
    </div>
}