export interface User {
    name : string ,
    email : string ,
    id : string
}


export interface AuthState {
    user : User | null ,
    isLoading : boolean , 
    isInitialized: boolean
}

