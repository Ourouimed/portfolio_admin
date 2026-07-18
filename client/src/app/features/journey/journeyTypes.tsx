
export interface Journey {
    _id? :string
    title : string,
    org: string | null ,
    start_date : string ,
    end_date : string ,
    type : "work" | "education" ,
    location:string | null
}

export interface JourneyState {
    isLoading : boolean ,
    journeys : Journey[]
}