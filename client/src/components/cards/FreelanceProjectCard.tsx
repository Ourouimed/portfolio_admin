import { ArrowUpRight, Building2 } from "lucide-react"
import type { FreelanceProjectCardProps } from "../../interfaces/freelancingProps"
import { Link } from "react-router-dom"
import { formatDateTime } from "../../lib/date-formaters"

export const FreelanceProjectCard = ({ project }: FreelanceProjectCardProps) => {

    const taskMetrics = {
        total: project?.tasks?.length || 0,
        done: project?.tasks?.filter((t: any) => t.status === "Done").length || 0,
        get percentage() {
            return this.total === 0 ? 0 :((this.done * 100) / this.total).toFixed(2)
        }
    }


    return <div className="group bg-white shadow-md p-4 border border-gray-300 space-y-4 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-gray-700 font-semibold">
                <Building2 size={14} />
                <span className="text-xs">
                    {project?.client?.name || "N/A"}
                </span>
            </div>

            <span className={`inline-flex items-center gap-1.5 border  py-1 px-3 rounded-full text-xs font-semibold
                            ${project?.status === "In progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                    project?.status === "Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                        project?.status === "Done" ? "bg-green-50 text-green-700 border-green-200" :
                            project?.status === "Delivered" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                "bg-slate-100 text-slate-700 border-slate-200"
                } 
                            `}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                                ${project?.status === "In progress" ? "bg-blue-500" :
                        project?.status === "Review" ? "bg-amber-500" :
                            project?.status === "Done" ? "bg-green-500" :
                                project?.status === "Delivered" ? "bg-purple-500" :
                                    "bg-slate-700"
                    }`} />
                {project?.status || "Not specified"}
            </span>
        </div>

        <div className="space-y-3">
            <Link to={`/freelancing/project/${project?._id}`} className="flex justify-between items-center">
                <h4 className="font-bold text-xl group-hover:text-blue-500 transition duration-300">
                    {project?.project_name || "N/A"}
                </h4>

                <span>
                    <ArrowUpRight size={14} className="hidden group-hover:block group-hover:text-blue-500 transition duration-300" />
                </span>
            </Link>


            <p className="line-clamp-2 text-xs text-gray-500">
                {project?.description || "No description provided"}
            </p>
        </div>


        <div className="border-t border-gray-300 pt-4 space-y-3">
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="font-bold text-sm">Tasks</span>
                    <span className="text-xs text-gray-500">{taskMetrics.done}/{taskMetrics.total} done ({taskMetrics.percentage}%)</span>
                </div>

                {/* Percentage bar*/}
                <div className="bg-gray-300 p-1 rounded-full relative overflow-hidden">
                    <span
                        className={"block top-0 left-0 h-full bg-blue-500 absolute"}
                        style={{ width: `${taskMetrics.percentage}%` }}
                    ></span>
                </div>
            </div>


            <div className="flex justify-between items-center text-xs text-gray-500 ">
                <span>
                    last update : {project?.updatedAt ? formatDateTime(project?.updatedAt) : "N/A"}
                </span>
            </div>
        </div>

    </div>
}