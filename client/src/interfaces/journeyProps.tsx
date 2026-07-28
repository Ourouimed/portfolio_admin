export interface JourneyProps {
    _id? : string
    title : string,
    org: string ,
    start_date : string ,
    end_date : string ,
    org_link : string ,
    type : "work" | "education" ,
    location:string ,
    description : string 
    updatedAt? : string 
    createdAt? : string 
}

export  interface JourneyCardProps {
    journey : JourneyProps | null ,
    onPreview? : VoidFunction 
    closePopup ? : VoidFunction 
    onUpdate?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}