import type { LucideIcon } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    postIcon? : LucideIcon
    preIcon? : LucideIcon
    options : string[] | {value : string , label : string}[]
}