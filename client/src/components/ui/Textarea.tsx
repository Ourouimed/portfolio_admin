import type { TextAreaProps } from "../../interfaces/textareaProps"

export const TextArea = ({className , ...props} : TextAreaProps)=>{
    return <textarea
                    {...props}
                    className={`w-full rounded-lg border border-gray-300 resize-vertical min-h-15 max-h-45 focus:border-blue-500 py-2 px-3 
                    transition duration-300 outline-none ${className}`}
                />
}