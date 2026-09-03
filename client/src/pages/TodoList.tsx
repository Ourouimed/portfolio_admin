import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Popup } from "../components/Popup";
import { AddTaskPopup } from "../components/popups/AddTaskPopup";
import { getTasks } from "../app/features/tasks/taskThunks";
import { useAppDispatch } from "../app/hooks";
import { useTask } from "../hooks/useTask";
import { TaskSkeleton } from "../components/skeletons/taskSkeleton";
import type { TaskProps } from "../interfaces/tasksProps";
import { TaskCard } from "../components/cards/TaskCard";
import { DeleteTaskPopup } from "../components/popups/DeleteTaskPopup";
import { EditTaskPopup } from "../components/popups/EditTaskPopup";

type FilterStatus = "all" | "active" | "completed";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useTask();
  const [filter, setFilter] = useState<FilterStatus>("all");

  // popup task
  const [popupTask, setPopupTask] = useState<TaskProps | null>(null);

  // popups state
  const [addPopupIsOpen, setAddPopupIsOpen] = useState(false);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);

  const completedTasks = useMemo(() => {
    return tasks.filter((t: TaskProps) => t.status === "completed");
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((t: TaskProps) => t.status !== "completed");
      case "completed":
        return tasks.filter((t: TaskProps) => t.status === "completed");
      default:
        return tasks;
    }
  }, [tasks, filter]);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleOpenEditTaskPopup = (t: TaskProps) => {
    setEditPopupIsOpen(true);
    setPopupTask(t);
  };
  const handleOpenDeleteTaskPopup = (t: TaskProps) => {
    setDeletePopupIsOpen(true);
    setPopupTask(t);
  };

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="space-y-1">
          <h3 className="font-bold text-xl">Tasks</h3>
          <p className="text-xs text-gray-500">
            {completedTasks.length}/{tasks.length} completed tasks
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 py-2 px-4 rounded-md border border-gray-300 flex-wrap">
            {(["all", "active", "completed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`capitalize text-xs cursor-pointer px-2 py-1 rounded-md transition duration-300 ${
                  filter === status
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <Button size="sm" onClick={() => setAddPopupIsOpen(true)}>
            New Task
            <Plus size={13} />
          </Button>
        </div>
      </div>

      <Popup isOpen={addPopupIsOpen} onClose={() => setAddPopupIsOpen(false)}>
        <AddTaskPopup closePopup={() => setAddPopupIsOpen(false)} />
      </Popup>

      <Popup
        isOpen={deletePopupIsOpen}
        onClose={() => setDeletePopupIsOpen(false)}
      >
        <DeleteTaskPopup
          task={popupTask}
          closePopup={() => setDeletePopupIsOpen(false)}
        />
      </Popup>


      <Popup
        isOpen={editPopupIsOpen}
        onClose={() => setEditPopupIsOpen(false)}
      >
        <EditTaskPopup
          task={popupTask}
          closePopup={() => setEditPopupIsOpen(false)}
        />
      </Popup>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
        ) : filteredTasks.length === 0 ? (
          <p>
            {filter === "all" ? "No tasks yet" : `No ${filter} tasks found`}
          </p>
        ) : (
          filteredTasks.map((t: TaskProps) => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={() => handleOpenDeleteTaskPopup(t)}
              onUpdate={() => handleOpenEditTaskPopup(t)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
