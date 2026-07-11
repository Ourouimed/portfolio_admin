import type { ButtonHTMLAttributes } from "react";

export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    fullWidth? : boolean ,
    variant? : string
}