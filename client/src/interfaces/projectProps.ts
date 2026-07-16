import type { ReactNode } from "react";

export interface ProjectProps  {
  _id? : string;
  image: string;
  name: string;
  description: string;
  preview? : string
  source? : string
  tech: string[];
  updatedAt : string 
  createdAt : string 
}

export  interface ProjectCardProps {
    project : ProjectProps | null ,
    openPopup? : VoidFunction 
    closePopup ? : VoidFunction 
    onUpdate?: (id: string | number) => void;
    onDelete?: (id: string | number) => void;
}