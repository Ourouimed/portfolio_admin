import { Briefcase, LayoutDashboard, Route} from "lucide-react";
import type { MenuItem } from "../interfaces/menuItem";


export const routes : MenuItem[] = [
    {
        url : "/",
        name : "Dashboard" ,
        icon : LayoutDashboard 
    } ,
    {
        url : "/projects",
        name : "Projects" ,
        icon : Briefcase
    } ,
    {
        url : "/journey",
        name : "My journey" ,
        icon : Route
    } 
] as const 

