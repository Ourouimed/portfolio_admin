import type { MouseEventHandler, ReactElement } from "react";

export interface PopupProps {
    onClose : MouseEventHandler , 
    children : ReactElement ,
    isOpen : boolean ,
    size? : string
}