import { Link, useLocation } from "react-router-dom"
import { routes } from "../lib/routes"
import type { MenuItem } from "../interfaces/menuItem"
import { Button } from "./ui/Button"
import { useAppDispatch } from "../app/hooks"
import { logout } from "../app/features/auth/authThunks"
import { useAuth } from "../hooks/useAuth"
import { Loader2, X } from "lucide-react"
import { useToast } from "../hooks/useToast"

const SideBar = ({isOpen , onClose} : any) => {
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()
    const { isLoading } = useAuth()
    const toast = useToast()

    const handleLogout = async ()=>{
        try {
            await dispatch(logout()).unwrap();
            toast.success("Log out successfully")
        }       
        catch (err : any){
            console.log(err)
            toast.error(err || "Unknow error check console for more");
        }
    }

    return (
        <aside className={`${isOpen ? "w-80" : "w-0"} z-10 fixed max-w-[90%] md:sticky h-screen top-0 trantition duration-300 overflow-hidden min-h-screen bg-gray-100 border-r border-gray-300 flex flex-col`}>
            <header className="p-4 border-b border-gray-300 flex items-center gap-2 justify-between">
                <h3 className="text-lg font-medium tracking-wide">
                    ourouimed<span className="font-bold text-indigo-400">Admin</span> 
                </h3>

                <button 
                    onClick={onClose}
                    className="md:hidden p-2 aspect-square flex justify-center items-center border border-gray-300 rounded-md cursor-pointer">
                    <X size={16}/>
                </button>
            </header>

            {/* Navigation Links */}
            <div className="flex justify-between h-full flex-col p-4 ">
                <nav className="flex-1 space-y-1 overflow-y-auto">
                    <ul>
                        {routes.map(({ name, url, icon: Icon }: MenuItem) => {
                            const isActive = pathname === url

                            return (
                                <li key={name} className="mb-1 last:mb-0">
                                    <Link 
                                        to={url} 
                                        className={`
                                            flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                            ${isActive 
                                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                                                : "hover:bg-slate-800 hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon 
                                            size={20} 
                                            className={`transition-colors ${isActive ? "text-white" : "group-hover:text-white"}`} 
                                        />
                                        <span>{name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>


                <Button fullWidth variant='destructive' onClick={handleLogout} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin text-center"/> : "Logout"}
                </Button>
            </div>
        </aside>
    )
}

export default SideBar