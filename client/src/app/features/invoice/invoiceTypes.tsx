export interface Invoice {
    _id?: string
    project: string | null
    title : string
    currency: "MAD" | "$" | "€"
    issue_date: string
    due_date: string
    items: {
        description: string
        quantity: number
        price: number
    }[]
}


export interface InvoiceFormErrors {
    title? : string
    currency? : string 
    issue_date? : string 
    due_date?: string 
    items? : {
        error : string
        children : {index : number , error : string}[]
    }
}

export interface InvoiceState {
    invoices: Invoice[]
    isLoading: boolean
}