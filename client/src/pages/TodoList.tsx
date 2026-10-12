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


const TodoList = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useTask();

  // popup task
  const [popupTask, setPopupTask] = useState<TaskProps | null>(null);

  // popups state
  const [addPopupIsOpen, setAddPopupIsOpen] = useState(false);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false);
  const [editPopupIsOpen, setEditPopupIsOpen] = useState(false);

  const taskToRender = useMemo(() => {
    return {
      todo: tasks.filter((t: TaskProps) => t.status === "Todo"),
      doing: tasks.filter((t: TaskProps) => t.status === "Doing"),
      done: tasks.filter((t: TaskProps) => t.status === "Done"),
      total: tasks.length
    }
  }, [tasks]);


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
            {taskToRender.done.length}/{taskToRender.total} completed tasks
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">


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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
        {/* Todo */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Todo {taskToRender.todo.length}</h4>
          {isLoading ? (
            Array.from({length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
          ) : 
            taskToRender.todo.map((t: TaskProps) => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={() => handleOpenDeleteTaskPopup(t)}
              onUpdate={() => handleOpenEditTaskPopup(t)}
            />
          ))
          }
        </div>

        {/* Doing */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Doing {taskToRender.doing.length}</h4>
          {isLoading ? (
            Array.from({length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
          ) : 
            taskToRender.doing.map((t: TaskProps) => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={() => handleOpenDeleteTaskPopup(t)}
              onUpdate={() => handleOpenEditTaskPopup(t)}
            />
          ))
          }
        </div>


        {/* Done */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Done {taskToRender.done.length}</h4>
          {isLoading ? (
            Array.from({length: 6 }).map((_, i) => <TaskSkeleton key={i} />)
          ) : 
            taskToRender.done.map((t: TaskProps) => (
            <TaskCard
              key={t._id}
              task={t}
              onDelete={() => handleOpenDeleteTaskPopup(t)}
              onUpdate={() => handleOpenEditTaskPopup(t)}
            />
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default TodoList;
