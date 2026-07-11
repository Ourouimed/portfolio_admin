export interface ToastItem {
    id : number,
    message : string ,
    type : string
 }
export interface ToastState {
    toasts : ToastItem[]
}