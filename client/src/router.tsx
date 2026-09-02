import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import ErrorPage from "./pages/ErrorPage";
import Projetcs from "./pages/Projects";
import MyJourney from "./pages/MyJourney";
import TodoList from "./pages/TodoList";

export const router = createBrowserRouter([
    {
        path : "/login" ,
        element : <Login/>
    },
    {
        path : "/" ,
        element : <DashboardLayout/>,
        children : [
            {
                index : true ,
                element : <Home/>
            },
            {
                path : "projects" ,
                element : <Projetcs/>
            },
            {
                path : "journey" ,
                element : <MyJourney/>
            },
            {
                path : "tasks" ,
                element : <TodoList/>
            }

        ]
    },
    {
        path : "*" ,
        element : <ErrorPage/>
    }
])