import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    postIcon? : LucideIcon ,
    preIcon? : LucideIcon
}