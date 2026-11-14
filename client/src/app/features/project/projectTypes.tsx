export interface Project {
  _id?: string
  image: File | null;
  imageUrl: string;
  name: string;
  preview: string;
  source: string;
  description: string;
  tech: string[];
}

export interface ProjectFormErrors {
  image?: string;
  name?: string;
  description?: string;
  tech?: string;
  preview?: string
  source?: string
}


export interface ProjectState {
  isLoading: boolean,
  projects: Project[],
}


