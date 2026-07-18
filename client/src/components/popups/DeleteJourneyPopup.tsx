import { Loader2 } from "lucide-react";
import { useAppDispatch } from "../../app/hooks";
import { useProject } from "../../hooks/useProject";
import { useToast } from "../../hooks/useToast";
import { Button } from "../ui/Button";
import type { JourneyCardProps } from "../../interfaces/journeyProps";
import { deleteJourney } from "../../app/features/journey/journeyThunks";

export const DeleteJourneyPopup = ({
  journey ,
  closePopup,
}: JourneyCardProps) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading } = useProject();

  const handleDeletePorject = async () => {
    try {
        
      if (journey?._id) {
        await dispatch(deleteJourney(journey?._id)).unwrap();
        toast.success("Journey deleted successfully");
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
        <span className="font-bold">"{journey?.title}"</span> ?
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
