import { Outlet } from "react-router-dom"
import SideBar from "../components/Sidebar"

const DashboardLayout = ()=>{
    return <section className="grid grid-cols md:grid-cols-[2fr_8fr]">
        <SideBar/>
        <div className="p-4">
            <Outlet/>
        </div>
    </section>
}

export default DashboardLayout