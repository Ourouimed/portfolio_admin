import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar"
import { useAuth } from "../hooks/useAuth"
import { useAppDispatch } from "../app/hooks"
import { useEffect, useState } from "react"
import { verifySession } from "../app/features/auth/authThunks"
import { Menu, X } from "lucide-react"

const DashboardLayout = ()=>{
    const { isInitialized , user } = useAuth()
    const [sidebarOpen , setSidebarOpen]  = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isInitialized) {
            dispatch(verifySession());
        }
    }, [dispatch, isInitialized]);

    useEffect(() => {
        if (!user && isInitialized) {
            navigate('/login')
        };
    }, [user, isInitialized, navigate]);
    return <section className="flex ">
        <SideBar isOpen={sidebarOpen} onClose={()=> setSidebarOpen(false)}/>
        <div className="w-full">
            <header className="p-4 border-b border-gray-300 flex items-center gap-2">
                <button 
                    onClick={()=> setSidebarOpen(!sidebarOpen)}
                    className="p-2 aspect-square flex justify-center items-center border border-gray-300 rounded-md cursor-pointer">
                    {sidebarOpen ? <X size={12}/> : <Menu size={12}/>}
                </button>
            </header>
            <div className="p-4">
                <Outlet/>
            </div>
            
        </div>
    </section>
}

export default DashboardLayout