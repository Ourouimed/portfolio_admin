import { Building2, Calendar, CheckSquare, Clock, DollarSign, Edit, List, Mail, Phone, Square, Trash2 } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "../hooks/useToast"
import { getFreelanceProjectById } from "../services/freelanceProjectService"
import type { FreelanceProjectProps } from "../interfaces/freelancingProps"
import { formatDate, formatDateTime, getProjectDuration } from "../lib/date-formaters"
import { useAppDispatch } from "../app/hooks"
import { changeTaskStatus } from "../app/features/tasks/taskThunks"
import { Popup } from "../components/Popup"
import { DeleteFreelanceProjectPopup } from "../components/popups/freelancing/DeleteFreelanceProjectPopup"
import { EditFreelanceProjectPopup } from "../components/popups/freelancing/EditFreelanceProjectPopup"


const FreelanceTaskCard = ({ task, onStatusChange }: any) => {
    const dispatch = useAppDispatch()
    const toast = useToast();

    const handleChangeStatus = async () => {
        try {
            await dispatch(changeTaskStatus(task?._id || "")).unwrap();


            onStatusChange();


            toast.success("Task status changed successfully");
        } catch (err: any) {
            toast.error(err || "Failed to change task status");
        }
    };


    return <div onClick={handleChangeStatus} className="bg-gray-200/20 hover:bg-gray-200/50 transition duration-300 cursor-pointer p-4 border border-gray-200 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
            <span>
                {task.status === "Done" ?
                    <CheckSquare size={20} className="text-green-600" /> :
                    <Square size={20} className="text-gray-500" />
                }
            </span>
            <span className="capitalize font-semibold">
                {task?.title || "N/A"}
            </span>
        </div>

        <div className="flex items-center gap-4">
            <span className={`inline-flex items-center gap-1.5 ${task?.status == "Done" ? "bg-green-50 text-green-700 text-green-700 border border-green-200" :
                task?.status == "Doing" ? "bg-blue-50 text-blue-700 text-blue-700 border border-blue-200" :
                    "bg-amber-50 text-amber-700 text-amber-700 border border-amber-200"}   
                                                                py-1 px-3 rounded-lg text-xs font-semibold`}>
                <span className={`w-1.5 h-1.5 rounded-full ${task?.status == "Done" ? "bg-green-500" : task?.status == "Doing" ? "bg-blue-500" : "bg-amber-500"} animate-pulse`} />
                {task?.status || "To Do"}
            </span>

            <span className="text-sm text-gray-500 font-semibold">
                {formatDate(task.date)}
            </span>
        </div>
    </div>
}

const FreelanceProjectPage = () => {
    const { id } = useParams()
    const [freelanceProject, setFreelanceroject] = useState<FreelanceProjectProps>();
    const [loading, setLoading] = useState(false)


    // popups states 
    const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
    const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);


    const toast = useToast()

    const fetchProject = async () => {
        try {
            setLoading(true)

            const res = await getFreelanceProjectById(id);
            const project = res.project


            setFreelanceroject(project)

        }
        catch (err) {
            console.error(err);
            toast.error("Failed to load project");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProject();
    }, [id])


    const handleTaskStatusChange = () => {
        fetchProject()

    };


    const metrics = useMemo(() => {
        // tasks calculations 
        const tasks = freelanceProject?.tasks ?? [];

        const total = tasks.length;
        const done = tasks.filter((t: any) => t.status === "Done").length;
        const doing = tasks.filter((t: any) => t.status === "Doing").length;
        const todo = total - done - doing;


        const percentage = {
            done: total ? Number(((done / total) * 100).toFixed(2)) : 0,
            doing: total ? Number(((doing / total) * 100).toFixed(2)) : 0,
            todo: total ? Number(((todo / total) * 100).toFixed(2)) : 0,
        };


        const data = {
            tasks: {
                total,
                done,
                doing,
                todo,
                percentage
            }
        }

        console.log(data)
        return data
    }, [freelanceProject])


    if (loading && !freelanceProject) return <p>Loading ....</p>


    if (!loading && !freelanceProject) return <p>Project not found</p>

    return (
        <div className="space-y-6">


            {/* Delete project popup */}
            <Popup
                isOpen={deletePopupIsOpen}
                onClose={() => setDeletePopupIsOpen(false)}
            >
                <DeleteFreelanceProjectPopup
                    project={freelanceProject ?? null}
                    closePopup={() => setDeletePopupIsOpen(false)}
                />
            </Popup>


            {/* Edit project popup*/}
            <Popup
                size="large"
                isOpen={editPopupIsOpen}
                onClose={() => setEditPopupIsOpen(false)}
            >
                <EditFreelanceProjectPopup
                    onUpdate={(p: any) => {
                        console.log(p)
                        fetchProject()
                    }}
                    project={freelanceProject ?? null}
                    closePopup={() => setEditPopupIsOpen(false)}
                />
            </Popup>



            <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-6">

                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center p-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-sm shrink-0">
                            <Building2 size={24} />
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-sm font-semibold text-gray-500">{freelanceProject?.client?.name || "N/A"} </span>
                                <span className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full py-0.5 px-2.5 text-xs font-semibold text-blue-700">
                                    ID: #{id}
                                </span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                                {freelanceProject?.project_name || "N/A"}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`inline-flex items-center gap-1.5 border  py-1 px-3 rounded-full text-xs font-semibold
                            ${
                                freelanceProject?.status === "In progress" ? "bg-blue-50 text-blue-700 border-blue-200" :
                                freelanceProject?.status === "Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                freelanceProject?.status === "Done" ? "bg-green-50 text-green-700 border-green-200" :
                                freelanceProject?.status === "Delivered" ? "bg-purple-50 text-purple-700 border-purple-200" :
                                "bg-slate-100 text-slate-700 border-slate-200"
                            } 
                            
                            
                            `}>
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse
                                ${
                                    freelanceProject?.status === "In progress" ? "bg-blue-500" :
                                    freelanceProject?.status === "Review" ? "bg-amber-500" :
                                    freelanceProject?.status === "Done" ? "bg-green-500" :
                                    freelanceProject?.status === "Delivered" ? "bg-purple-500" :
                                    "bg-slate-700"
                                }`} />
                            {freelanceProject?.status || "Not specified"}
                        </span>

                        <button onClick={() => setEditPopupIsOpen(true)} className="text-xs text-gray-500 cursor-pointer p-2 border border-gray-500 flex items-center justify-center rounded-lg">
                            <Edit size={16} />
                        </button>


                        <button onClick={() => setDeletePopupIsOpen(true)} className="text-xs text-red-500 cursor-pointer p-2 border border-red-500 flex items-center justify-center rounded-lg">
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Metrics Grid Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                        <div className="flex items-center justify-center p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl shrink-0">
                            <DollarSign size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 block">Total Budget</span>
                            <span className="text-sm font-bold text-gray-900">45,000 $</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                        <div className="flex items-center justify-center p-3 bg-blue-50 border border-blue-200 text-blue-600 rounded-xl shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 block">Duration</span>
                            <span className="text-sm font-bold text-gray-900">{getProjectDuration(freelanceProject?.start_date, freelanceProject?.deadline)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                        <div className="flex items-center justify-center p-3 bg-purple-50 border border-purple-200 text-purple-600 rounded-xl shrink-0">
                            <Calendar size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 block">Deadline</span>
                            <span className="text-sm font-bold text-gray-900">{formatDate(freelanceProject?.deadline) || "N/A"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                        <div className="flex items-center justify-center p-3 bg-amber-50 border border-amber-200 text-amber-600 rounded-xl shrink-0">
                            <List size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-500 block">Tasks</span>
                            <span className="text-sm font-bold text-gray-900">{metrics.tasks.done}/{metrics.tasks.total} done</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] gap-4">
                {/* Main */}
                <main className="space-y-4">
                    {/* Description */}
                    <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-3">
                        <h4 className="font-bold uppercase leading-relaxed">Description</h4>
                        <p className="text-gray-500">
                            {freelanceProject?.description || ""}
                        </p>
                    </div>

                    {/* Tasks */}
                    <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="font-bold uppercase leading-relaxed">Tasks</h4>
                            <div className="flex items-center gap-3 flex-wrap text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full block bg-green-500 anmimate-pulse"></span>
                                    <span>Done ({metrics.tasks.percentage.done}%)</span>
                                </div>


                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full block bg-blue-500 anmimate-pulse"></span>
                                    <span>Doing ({metrics.tasks.percentage.doing}%)</span>
                                </div>


                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full block bg-amber-500 anmimate-pulse"></span>
                                    <span>To do  ({metrics.tasks.percentage.todo}%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Percentage bar*/}
                        <div className="bg-gray-300 h-3 rounded-full relative overflow-hidden">
                            {/* Done */}
                            <span
                                className="absolute top-0 left-0 h-full bg-green-500"
                                style={{
                                    width: `${metrics.tasks.percentage.done}%`
                                }}
                            />

                            {/* Doing */}
                            <span
                                className="absolute top-0 h-full bg-blue-500"
                                style={{
                                    width: `${metrics.tasks.percentage.doing}%`,
                                    left: `${metrics.tasks.percentage.done}%`
                                }}
                            />

                            {/* Todo */}
                            <span
                                className="absolute top-0 h-full bg-amber-500"
                                style={{
                                    width: `${metrics.tasks.percentage.todo}%`,
                                    left: `${metrics.tasks.percentage.done + metrics.tasks.percentage.doing}%`
                                }}
                            />
                        </div>

                        <div className="space-y-2">
                            {/* {freelanceProject?.tasks.length === 0 ? <p>No tasks</p> :
                                freelanceProject?.tasks.map((t: any) => <FreelanceTaskCard task={t} />)
                            } */}

                            {freelanceProject?.tasks.map((t: any) => (
                                <FreelanceTaskCard
                                    key={t._id}
                                    task={t}
                                    onStatusChange={handleTaskStatusChange}
                                />
                            ))}
                        </div>





                    </div>
                </main>

                {/* Sidebar */}
                <aside className="space-y-4">
                    {/* Client Details */}
                    <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-3">
                        <h4 className="font-bold uppercase leading-relaxed">Client info</h4>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <span>
                                    <Building2 size={20} className="text-gray-500" />
                                </span>

                                <span className="text-sm">
                                    {freelanceProject?.client?.name}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span>
                                    <Mail size={20} className="text-gray-500" />
                                </span>

                                <a href={`mailto:${freelanceProject?.client?.email}`} className="text-sm text-blue-500 hover:decoration-underline">
                                    {freelanceProject?.client?.email}
                                </a>
                            </div>


                            <div className="flex items-center gap-2">
                                <span>
                                    <Phone size={20} className="text-gray-500" />
                                </span>

                                <span className="text-sm">
                                    {freelanceProject?.client?.phone}
                                </span>
                            </div>
                        </div>
                    </div>


                    {/* Project Timeline */}
                    <div className="p-6 rounded-2xl bg-white shadow-sm border border-gray-300 space-y-3">
                        <h4 className="font-bold uppercase leading-relaxed">Timeline</h4>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm">
                                <span className="text-gray-500 font-bold">Start : </span>
                                {formatDate(freelanceProject?.start_date) || "N/A"}
                            </span>


                            <span className="text-sm">
                                <span className="text-gray-500 font-bold">Deadline : </span>
                                {formatDate(freelanceProject?.deadline) || "N/A"}
                            </span>


                            <span className="text-sm">
                                <span className="text-gray-500 font-bold">Created at : </span>
                                {formatDateTime(freelanceProject?.createdAt) || "N/A"}
                            </span>


                            <span className="text-sm">
                                <span className="text-gray-500 font-bold">Last update : </span>
                                {formatDateTime(freelanceProject?.updatedAt) || "N/A"}
                            </span>
                        </div>
                    </div>
                </aside>


            </div>
        </div>
    )
}

export default FreelanceProjectPage