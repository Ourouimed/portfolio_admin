import { Loader2 } from "lucide-react";
import { useAppDispatch } from "../../app/hooks";
import { useProject } from "../../hooks/useProject";
import { useToast } from "../../hooks/useToast";
import { Button } from "../ui/Button";
import type { TaskCardProps } from "../../interfaces/tasksProps";
import { deleteTask } from "../../app/features/tasks/taskThunks";

export const DeleteTaskPopup = ({
  task ,
  closePopup,
}: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading } = useProject();


  const handleDeleteTask = async () => {
    try {
        
      if (task?._id) {
        await dispatch(deleteTask(task?._id)).unwrap();
        toast.success("Task deleted successfully");
        if (closePopup) closePopup();
      }

      else {
        toast.warning("no id provided")
      }
    } catch (err: any) {
      toast.error(err || "Failed to delete profile");
    }
  };
  return (
    <div className="space-y-2">
      <p>
        Are you sure you want to delete{" "}
        <span className="font-bold">"{task?.title}"</span> ?
      </p>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={closePopup}>Cancel</Button>

        <Button variant="destructive" disabled={isLoading} onClick={handleDeleteTask}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};
