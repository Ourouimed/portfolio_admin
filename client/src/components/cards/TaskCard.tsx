import { Calendar, Check, ChevronRight, Edit, Trash2 } from "lucide-react";
import type { TaskCardProps } from "../../interfaces/tasksProps";
import { formatDate } from "../../lib/date-formaters";
import { useAppDispatch } from "../../app/hooks";
import { useToast } from "../../hooks/useToast";
import { changeTaskStatus } from "../../app/features/tasks/taskThunks";

export const TaskCard = ({ task, onUpdate, onDelete }: TaskCardProps) => {

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

  return <div className="bg-white border border-gray-300 p-4 rounded-xl space-y-2">
    <div className="flex items-center justify-between">
      <h4 className={`font-semibold text-sm  ${task?.status === "Done" ? "line-through text-gray-500" : ""}`}>
        {task?.title}
      </h4>
      <button onClick={handleChangeStatus} className="size-8 rounded-full flex items-center justify-center cursor-pointer transition duration-300 hover:bg-gray-400/30">
        <ChevronRight size={16} />
      </button>
    </div>
    <p className="text-xs text-gray-700">
      {formatDate(task?.date)}
    </p>
    <div className="flex items-center gap-2 justify-between">
      <span className={`rounded-full text-xs ${task?.priority === "High" ? "bg-red-500/10 text-red-500" :
        task?.priority === "Medium" ? "bg-yellow-500/10 text-yellow-500" : "bg-gray-500/10 text-gray-500"
        } py-1 px-3 font-semibold`}>
        {task?.priority}
      </span>


      {(onUpdate || onDelete) && (
        <div className="flex items-center gap-2">
          {onUpdate && (
            <button
              onClick={() => task?._id && onUpdate(task?._id)}
              className="text-gray-500 text-xs cursor-pointer hover:text-black transition duration-300"
            >
              <Edit size={14} />
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => task?._id && onDelete(task?._id)}
              className="text-gray-500 text-xs cursor-pointer hover:text-red-500 transition duration-300"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  </div>

};
