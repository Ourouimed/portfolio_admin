import { Loader2 } from "lucide-react";
import { useAppDispatch } from "../../app/hooks";
import { useProject } from "../../hooks/useProject";
import { useToast } from "../../hooks/useToast";
import type { ProjectCardProps } from "../../interfaces/projectProps";
import { Button } from "../ui/Button";
import { deleteProject } from "../../app/features/project/projectThunks";

export const DeleteProjectPopup = ({
  project ,
  closePopup,
}: ProjectCardProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading } = useProject();

  const handleDeletePorject = async () => {
    try {
        
      if (project?._id) {
        await dispatch(deleteProject(project?._id)).unwrap();
        toast.success("Project deleted successfully");
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
        <span className="font-bold">"{project?.name}"</span> ?
      </p>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={closePopup}>Cancel</Button>

        <Button variant="destructive" disabled={isLoading} onClick={handleDeletePorject}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};
