import type { BtnProps } from "../../interfaces/btnProps"


export const Button = ({
    className ,
    children, 
    fullWidth, 
    variant = "default", 
    size = "md",
    ...props
}: BtnProps) => {
    
    const VARIANTS: Record<string, string> = {
        "DEFAULT": "bg-black text-white",
        "DESTRUCTIVE": "bg-red-500 text-white"
    }

    const SIZES: Record<string, string> = {
        "SM": "py-2 px-4 text-xs",
        "MD": "py-2 px-6 text-sm",
        "LG": "py-3 px-6 text-base"
    }

    const variantClass = VARIANTS[variant.toUpperCase()] || VARIANTS["DEFAULT"]
    const sizeClass = SIZES[size.toUpperCase()] || SIZES["MD"]
    const baseStyle=`${sizeClass} ${variantClass} cursor-pointer rounded-lg flex items-center justify-center gap-3 ${fullWidth ? "w-full" : ""} ${className}`

    if(props.href !== undefined) {
        return (
        <a 
            {...props} 
            className={baseStyle}
        >
            {children}
        </a>
    )
}

    return (
        <button 
            {...props} 
            className={baseStyle}
        >
            {children}
        </button>
    )
}