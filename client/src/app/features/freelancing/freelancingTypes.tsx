import type { FreelanceClientProps } from "../../../interfaces/freelancingProps"

export interface FreelanceProject{
    _id? : string
    client : FreelanceClientProps 
    project_name : string 
    description : string 
    status: "Planning"| "In progress" | "Review" | "Done" | "Delivered"
    start_date : string
    deadline : string
    docs : []
}

export interface FreelancingState {
    isLoading : boolean ,
    freelanceProjects : FreelanceProject[]
}