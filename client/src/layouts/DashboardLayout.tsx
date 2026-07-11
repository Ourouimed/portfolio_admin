import { Outlet, useNavigate } from "react-router-dom"
import SideBar from "../components/Sidebar"
import { useAuth } from "../hooks/useAuth"
import { useAppDispatch } from "../app/hooks"
import { useEffect } from "react"
import { verifySession } from "../app/features/auth/authThunks"

const DashboardLayout = ()=>{
    const { isInitialized , user } = useAuth()
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
    return <section className="grid grid-cols md:grid-cols-[2fr_8fr]">
        <SideBar/>
        <div className="p-4">
            <Outlet/>
        </div>
    </section>
}

export default DashboardLayout