import { Briefcase, CheckSquare, LayoutDashboard, Receipt, Route, User, Users} from "lucide-react";
import type { MenuItem } from "../interfaces/menuItem";


export const routes : MenuItem[] = [
    {
        url : "/",
        name : "Dashboard" ,
        icon : LayoutDashboard 
    } ,
    {
        url : "/portfolio",
        name : "Portfolio" ,
        icon : Briefcase
    } ,
    {
        url : "/journey",
        name : "My journey" ,
        icon : Route
    } ,
    {
        url : "/tasks",
        name : "Tasks" ,
        icon : CheckSquare
    },
    {
        url : "/profile",
        name : "Profile" ,
        icon : User
    } ,
    {
        url : "/freelancing",
        name : "Freelancing" ,
        icon : Users
    },
    {
        url : "/invoices",
        name : "Invoices" ,
        icon : Receipt
    } 
] as const 

