import { Calendar, Check, Edit, Trash } from "lucide-react";
import type { TaskCardProps } from "../../interfaces/tasksProps";
import { formatDate } from "../../lib/date-formaters";
import { useAppDispatch } from "../../app/hooks";
import { useToast } from "../../hooks/useToast";
import { changeTaskStatus } from "../../app/features/tasks/taskThunks";

export const TaskCard = ({ task }: TaskCardProps) => {
  const isCompleted = task?.status === "completed";

  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleChangeStatus = async () => {
    try {
      await dispatch(changeTaskStatus(task?._id || "")).unwrap();
      toast.success("Task status changed successfully");
    } catch (err: any) {
      toast.error(err || "Failed to change task status");
    }
  };

  return (
    <div className="group bg-white rounded-md border border-gray-300 p-4">
      <div>
        <div className="flex items-center justify-between capitalize">
          <div className="flex items-center gap-2">
            <div className="size-5 p-0.5 rounded-full border border-gray-300">
                {isCompleted && <div className="bg-green-500 w-full rounded-full flex items-center justify-center h-full">
                    <Check size={12} className="text-white"/>
                </div>}
            </div>
            <h4 onClick={handleChangeStatus} className={`font-semibold text-sm cursor-pointer ${isCompleted ? "text-gray-500 line-through" : ""}`}>{task?.title}</h4>
          </div>

          <span
            className={`inline-flex items-center gap-2 py-1 px-3 rounded-sm text-xs ${isCompleted ? "bg-green-500/30 text-green-500 font-semibold" : "bg-blue-500/30 text-blue-500 font-semibold"}`}
          >
            <span
              className={`flex size-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-blue-500"}`}
            />
            {task?.status}
          </span>
        </div>

        <p className="text-gray-500 text-xs capitalize mt-3 line-clamp-2">
          {task?.content}
        </p>

        <div className="border-t border-gray-300 flex items-center justify-between flex-wrap mt-2 pt-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/30 text-[10px] py-1 px-3 rounded-md">
            <Calendar size={12} className={"text-yellow-500"} />
            <span className="text-yellow-500">{formatDate(task?.date)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="text-gray-500 text-xs cursor-pointer hover:text-black transition duration-300">
              <Edit size={14} />
            </button>
            <button className="text-gray-500 text-xs cursor-pointer hover:text-red-500 transition duration-300">
              <Trash size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
