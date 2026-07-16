export interface Project {
  image: File | string;
  _id? : string
  name: string;
  description: string; 
  preview? : string
  source? : string
  tech: string[];
}
export interface ProjectState {
    isLoading : boolean ,
    projects : Project[],

}