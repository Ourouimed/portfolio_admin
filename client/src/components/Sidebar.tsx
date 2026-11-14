import { Link, useLocation } from "react-router-dom"
import { routes } from "../lib/routes"
import type { MenuItem } from "../interfaces/menuItem"
import { Button } from "./ui/Button"
import { useAppDispatch } from "../app/hooks"
import { logout } from "../app/features/auth/authThunks"
import { useAuth } from "../hooks/useAuth"
import { Loader2, X } from "lucide-react"
import { useToast } from "../hooks/useToast"

interface SideBarProps {
    isOpen: boolean
    onClose: () => void
}

const SideBar = ({ isOpen, onClose }: SideBarProps) => {
    const { pathname } = useLocation()
    const dispatch = useAppDispatch()
    const { isLoading } = useAuth()
    const toast = useToast()

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            toast.success("Logged out successfully")
        } catch (err: any) {
            console.error(err)
            toast.error(err || "Unknown error, check console for more")
        }
    }

    return (
        <aside 
            className={`
                ${isOpen ? "w-80" : "w-0"} 
                z-10 fixed max-w-[90%] md:sticky h-screen top-0 
                transition-all duration-300 overflow-hidden bg-blue-800 text-white flex flex-col
            `}
        >
            <header className="p-4 flex items-center gap-2 justify-between">
                <h3 className="text-lg font-medium tracking-wide">
                    ourouimed<span className="font-bold text-yellow-400">Admin</span>
                </h3>

                <button
                    onClick={onClose}
                    aria-label="Close Sidebar"
                    className="md:hidden p-2 aspect-square flex justify-center items-center border border-gray-300 rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
                >
                    <X size={16} />
                </button>
            </header>

            {/* Navigation Links */}
            <div className="flex justify-between h-full flex-col p-4">
                <nav className="flex-1 space-y-1 overflow-y-auto">
                    <ul>
                        {routes.map(({ name, url, icon: Icon }: MenuItem) => {
                            const isActive = url === "/"
                                ? pathname === "/"
                                : pathname === url || pathname.startsWith(`${url}/`)

                            return (
                                <li key={name} className="mb-1 last:mb-0">
                                    <Link
                                        onClick={() => {
                                            // Close only on smaller screens where it acts as a drawer
                                            if (window.innerWidth < 768) onClose()
                                        }}
                                        to={url}
                                        className={`
                                            flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                            ${isActive
                                                ? "bg-blue-600 text-white shadow-md"
                                                : "hover:bg-blue-700 hover:text-white"
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={20}
                                            className={`transition-colors ${isActive ? "text-white" : "text-blue-200 group-hover:text-white"}`}
                                        />
                                        <span>{name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <Button fullWidth variant='destructive' onClick={handleLogout} disabled={isLoading}>
                    {isLoading ? <Loader2 className="animate-spin mx-auto" size={20} /> : "Logout"}
                </Button>
            </div>
        </aside>
    )
}

export default SideBar