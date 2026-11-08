import { Loader2 } from "lucide-react";
import { useAppDispatch } from "../../../app/hooks";
import { useToast } from "../../../hooks/useToast";
import { Button } from "../../ui/Button";
import { useFreelancing } from "../../../hooks/useFreelancing";
import type { FreelanceProjectCardProps } from "../../../interfaces/freelancingProps";
import { deleteFreelanceProject } from "../../../app/features/freelancing/freelancingThunks";
import { useNavigate } from "react-router-dom";

export const DeleteFreelanceProjectPopup = ({project , closePopup,}: FreelanceProjectCardProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigate = useNavigate()
  const { isLoading } = useFreelancing();


  const handleDeleteFreelanceProject = async () => {
    try {
        
      if (project?._id) {
        await dispatch(deleteFreelanceProject(project?._id)).unwrap();
        toast.success("Project deleted successfully");
        navigate("/freelancing")
        if (closePopup) closePopup();
      }

      else {
        toast.warning("no id provided")
      }
    } catch (err: any) {
      toast.error(err || "Failed to delete project");
    }
  };
  return (
    <div className="space-y-2">
      <p>
        Are you sure you want to delete{" "}
        <span className="font-bold">"{project?.project_name}"</span> ?
      </p>
      <div className="flex items-center justify-end gap-2">
        <Button onClick={closePopup}>Cancel</Button>

        <Button variant="destructive" disabled={isLoading} onClick={handleDeleteFreelanceProject}>
          {isLoading ? <Loader2 className="animate-spin" /> : "Delete"}
        </Button>
      </div>
    </div>
  );
};
