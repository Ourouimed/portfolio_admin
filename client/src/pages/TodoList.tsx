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

const TodoList = () => {
  const dispatch = useAppDispatch();
  const { tasks , isLoading } = useTask();
  const [addPopupIsOpen, setAddPopupIsOpen] = useState(false);

  const completedTasks = useMemo(()=>{
    return tasks.filter((t : TaskProps) => t.status === "completed")
  } , [tasks])

  useEffect(() => {
    dispatch(getTasks());
    if (tasks) console.log(tasks);
  }, [dispatch]);
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="space-y-1">
          <h3 className="font-bold text-xl">Tasks</h3>
          <p className="text-xs text-gray-500">{completedTasks.length}/{tasks.length} completed tasks</p>
        </div>

        <Button size="sm" onClick={() => setAddPopupIsOpen(true)}>
          New Task
          <Plus size={13} />
        </Button>
      </div>

      <Popup isOpen={addPopupIsOpen} onClose={() => setAddPopupIsOpen(false)}>
        <AddTaskPopup closePopup={() => setAddPopupIsOpen(false)} />
      </Popup>

      <div className="grid grid-cols sm:grid-cols-2 gap-2 mt-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
        ) : tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((t: TaskProps) => <TaskCard task={t} />)
        )}
      </div>
    </div>
  );
};

export default TodoList;
