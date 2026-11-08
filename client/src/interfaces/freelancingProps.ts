export interface FreelanceClientProps {
    name: string
    email: string
    phone: string
}

export interface FreelanceProjectProps {
    _id?: string
    client: FreelanceClientProps
    project_name: string
    description: string
    status: "Planning" | "In progress" | "Review" | "Done" | "Delivered"
    start_date: string
    deadline: string
    updatedAt?: string
    createdAt?: string
    docs: []
    tasks: []
}


export interface FreelanceProjectCardProps {
    project: FreelanceProjectProps | null
    openPopup?: VoidFunction
    closePopup?: VoidFunction
    onUpdate?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}