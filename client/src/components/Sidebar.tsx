import { Link, useLocation } from "react-router-dom"
import { routes } from "../lib/routes"
import type { MenuItem } from "../interfaces/menuItem"

const SideBar = () => {
    const { pathname } = useLocation()

    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <h3 className="text-lg font-medium tracking-wide text-white">
                    ourouimed<span className="font-bold text-indigo-400">Admin</span> 
                </h3>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <ul>
                    {routes.map(({ name, url, icon: Icon }: MenuItem) => {
                        // Check if the current route matches the link destination
                        const isActive = pathname === url

                        return (
                            <li key={name} className="mb-1 last:mb-0">
                                <Link 
                                    to={url} 
                                    className={`
                                        flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                                        ${isActive 
                                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/10" 
                                            : "hover:bg-slate-800 hover:text-slate-100 text-slate-400"
                                        }
                                    `}
                                >
                                    <Icon 
                                        size={20} 
                                        className={`transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-100"}`} 
                                    />
                                    <span>{name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}

export default SideBar