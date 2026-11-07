import { ArrowUpRight, Building2 } from "lucide-react"
import type { FreelanceProjectCardProps } from "../../interfaces/freelancingProps"
import { Link } from "react-router-dom"

export const FreelanceProjectCard = ({ project }: FreelanceProjectCardProps) => {
    return <div className="group bg-white shadow-md p-4 border border-gray-300 space-y-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
                <Building2 size={14} />
                <span className="text-xs">
                    {project?.client?.name || "N/A"}
                </span>
            </div>

            <span className="bg-yellow-500/30 text-yellow-500 border border-yellow-500 py-1 px-2 rounded-full text-xs font-semibold">
                {project?.status || "N/A"}
            </span>
        </div>

        <div className="space-y-3">
            <Link to={"/test2"} className="flex justify-between items-center">
                <h4 className="font-bold text-xl group-hover:text-blue-500 transition duration-300">
                    {project?.project_name || "N/A"}
                </h4>

                <span>
                    <ArrowUpRight size={14} className="hidden group-hover:block group-hover:text-blue-500 transition duration-300"/>
                </span>
            </Link>


            <p className="line-clamp-3 text-xs text-gray-500">
                {project?.description || "No description provided"}
            </p>
        </div>
    </div>
}