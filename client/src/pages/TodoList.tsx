import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Popup } from "../components/Popup";
import { AddTaskPopup } from "../components/popups/tasks/AddTaskPopup";
import { getTasks } from "../app/features/tasks/taskThunks";
import { useAppDispatch } from "../app/hooks";
import { useTask } from "../hooks/useTask";
import { TaskSkeleton } from "../components/skeletons/taskSkeleton";
import type { TaskProps } from "../interfaces/tasksProps";
import { TaskCard } from "../components/cards/TaskCard";
import { DeleteTaskPopup } from "../components/popups/tasks/DeleteTaskPopup";
import { EditTaskPopup } from "../components/popups/tasks/EditTaskPopup";
import { getFreelanceProjects } from "../app/features/freelancing/freelancingThunks";
import { useFreelancing } from "../hooks/useFreelancing";


const TodoList = () => {
  const dispatch = useAppDispatch();
  const { tasks, isLoading } = useTask();
  const { freelanceProjects , isLoading : freelanceIsLoading } = useFreelancing()

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
    dispatch(getFreelanceProjects())
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
        <div className="space-y-2">
          <h3 className="font-bold text-3xl">Tasks</h3>
          <p className="text-sm text-gray-500">
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
        <AddTaskPopup closePopup={() => setAddPopupIsOpen(false)} freelanceProjects={freelanceProjects} />
      </Popup>

      {(!freelanceIsLoading && Array.isArray(freelanceProjects)) &&
        <Popup
          isOpen={deletePopupIsOpen}
          onClose={() => setDeletePopupIsOpen(false)}
        >
          <DeleteTaskPopup
            task={popupTask}
            closePopup={() => setDeletePopupIsOpen(false)}
          />
        </Popup>
      }


      {(!freelanceIsLoading && Array.isArray(freelanceProjects)) &&
        <Popup
          isOpen={editPopupIsOpen}
          onClose={() => setEditPopupIsOpen(false)}
        >
          <EditTaskPopup
            freelanceProjects={freelanceProjects}
            task={popupTask}
            closePopup={() => setEditPopupIsOpen(false)}
          />
        </Popup>
      }

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
        {/* Todo */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Todo {taskToRender.todo.length}</h4>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => <TaskSkeleton key={i} />)}
            </div>
          ) :
            <div className="space-y-2">
              {taskToRender.todo.map((t: TaskProps) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onDelete={() => handleOpenDeleteTaskPopup(t)}
                  onUpdate={() => handleOpenEditTaskPopup(t)}
                />
              ))}
            </div>
          }
        </div>

        {/* Doing */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Doing {taskToRender.doing.length}</h4>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => <TaskSkeleton key={i} />)}
            </div>
          ) :
            <div className="space-y-2">
              {taskToRender.doing.map((t: TaskProps) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onDelete={() => handleOpenDeleteTaskPopup(t)}
                  onUpdate={() => handleOpenEditTaskPopup(t)}
                />
              ))}
            </div>
          }
        </div>


        {/* Done */}
        <div className="p-4 rounded-xl bg-gray-100 border border-gray-100">
          <h4 className="font-semibold mb-4">Done {taskToRender.done.length}</h4>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => <TaskSkeleton key={i} />)}
            </div>
          ) :
            <div className="space-y-2">
              {taskToRender.done.map((t: TaskProps) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onDelete={() => handleOpenDeleteTaskPopup(t)}
                  onUpdate={() => handleOpenEditTaskPopup(t)}
                />
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TodoList;
