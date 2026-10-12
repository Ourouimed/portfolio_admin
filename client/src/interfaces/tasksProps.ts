export interface TaskProps {
    _id?: string,
    title: string,
    content: string,
    date: string,
    status: "Todo" | "Doing" | "Done"
    priority: "Low" | "Medium" | "High"
    createdAt: string
    updatedAt: string
}


export interface TaskCardProps {
    task: TaskProps | null
    openPopup?: VoidFunction
    closePopup?: VoidFunction
    onUpdate?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}