import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardLayout from "./layouts/DashboardLayout";
import ErrorPage from "./pages/ErrorPage";
import MyJourney from "./pages/MyJourney";
import TodoList from "./pages/TodoList";
import ProfilePage from "./pages/ProfilePage";
import Portfolio from "./pages/Portfolio";
import Freelancing from "./pages/Freelancing";
import FreelanceProjectPage from "./pages/FreelanceProjectPage";
import ProjectsListPage from "./pages/test2.test";
import ProjectDetailsPage from "./pages/test1.test";

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
                path : "portfolio" ,
                element : <Portfolio/>
            },
            {
                path : "journey" ,
                element : <MyJourney/>
            },
            {
                path : "tasks" ,
                element : <TodoList/>
            },
            {
                path : "profile" ,
                element : <ProfilePage/>
            },
            {
                path : "freelancing" ,
                element : <Freelancing/>
            },
            {
                path : "freelancing/project/:id" ,
                element : <FreelanceProjectPage/>
            }
        ]
    },
    {
        path : "/test" ,
        element : <ProjectDetailsPage/>
    },
    {
        path : "/test2" ,
        element : <ProjectsListPage/>
    },
    {
        path : "*" ,
        element : <ErrorPage/>
    }
])