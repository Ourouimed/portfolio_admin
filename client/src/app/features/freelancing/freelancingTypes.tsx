import type { FreelanceClientProps } from "../../../interfaces/freelancingProps"

export interface FreelanceProject {
    _id?: string
    client: FreelanceClientProps
    project_name: string
    description: string
    status: "Planning" | "In progress" | "Review" | "Done" | "Delivered"
    start_date: string
    deadline: string
}


export interface FreelanceProjectFormErrors {
    client?: {
        name?: string
        email?: string
        phone?: string
    }
    project_name?: string
    description?: string
    status?: string
    start_date?: string
    deadline?: string
}

export interface FreelancingState {
    isLoading: boolean,
    freelanceProjects: FreelanceProject[]
}