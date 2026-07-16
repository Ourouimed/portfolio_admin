import { X } from "lucide-react"
import type { PopupProps } from "../interfaces/popupProps"

export const Popup = ({children  , isOpen , onClose , size = "small" } : PopupProps)=>{
    if (isOpen) return <section className="fixed z-11 bg-black/90 w-full h-screen inset-0 flex items-center justify-center">
        <div className={`relative  w-full bg-white shadow-lg rounded-xl border border-gray-300 ${size === 'large' ? "max-w-xl" : "max-w-sm" }`}>
            <div className="flex justify-end py-1 px-4">
                <button 
                    onClick={onClose}
                    className="p-2 aspect-square flex justify-center items-center border border-gray-300 rounded-md cursor-pointer">
                    <X size={16}/>
                </button>
            </div>
            <div className="max-h-100 overflow-y-auto pb-2 px-4">
                {children}
            </div>
        </div>
    </section>
}