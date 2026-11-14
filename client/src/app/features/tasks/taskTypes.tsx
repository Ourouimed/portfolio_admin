export interface Task {
  _id?: string
  title: string;
  content: string;
  status: "Todo" | "Doing" | "Done"
  priority: "Low" | "Medium" | "High"
  project: string | null
  date: string;
}


export interface TaskFormErrors {
  title?: string;
  content?: string;
  date?: string;
  status?: string
  priority?: string
}

export interface TaskState {
    tasks : Task[] ,
    isLoading : boolean ,
}