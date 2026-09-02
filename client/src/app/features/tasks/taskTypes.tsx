export interface Task {
  _id?: string
  title: string;
  content: string;
  date: Date | null | string;
}


export interface TaskState {
    tasks : Task[] ,
    isLoading : boolean ,
}