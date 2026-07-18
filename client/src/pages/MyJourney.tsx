import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { getJourney } from "../app/features/journey/journeyThunks";
import { useJourney } from "../hooks/useJourney";
import { Button } from "../components/ui/Button";
import { Popup } from "../components/Popup";
import { Plus } from "lucide-react";
import { AddJourneyPopup } from "../components/popups/AddJourneyPopup";
import JourneySkeleton from "../components/skeletons/JourneySkeleton";
import type { JourneyProps } from "../interfaces/journeyProps";
import JourneyCard from "../components/cards/JourneyCard";
import { DeleteJourneyPopup } from "../components/popups/DeleteJourneyPopup";
import { EditJourneyPopup } from "../components/popups/EditJourneyPopup";
import { JourneyPreviewPopup } from "../components/popups/JourneyPreviewPopup";

const MyJourney = () => {
  const dispatch = useAppDispatch();
  const [addJourneyPopupIsOpen, setAddJourneyPopupIsOpen] =
    useState<boolean>(false);
  const [editJourneyPopupIsOpen, setEditJourneyPopupIsOpen] =
    useState<boolean>(false);

    const [deleteJourneyPopupIsOpen, setDeleteJourneyPopupIsOpen] =
    useState<boolean>(false);

    const [previewPopupIsOpen, setPreviewPopupIsOpen] =
    useState<boolean>(false);

    const [journeyPopup , setJourneyPopup] = useState<JourneyProps | null>(null)
  const { journeys , isLoading } = useJourney();

  useEffect(() => {
    dispatch(getJourney());


  }, [dispatch]);


  const handleOpenEditJourneyPopup = (p : JourneyProps)=>{
      setEditJourneyPopupIsOpen(true)
      setJourneyPopup(p)
    }
  
    const handleOpenDeleteJourneyPopup = (p : JourneyProps)=>{
      setDeleteJourneyPopupIsOpen(true)
      setJourneyPopup(p)
    }

    const handleOpenPreviewPopup = (p : JourneyProps)=>{
      setPreviewPopupIsOpen(true)
      setJourneyPopup(p)
    }
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-bold text-xl">My Journey</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setAddJourneyPopupIsOpen(true)}>
            Add journey
            <Plus size={13} />
          </Button>
        </div>
      </div>

      <Popup
        isOpen={addJourneyPopupIsOpen}
        onClose={() => setAddJourneyPopupIsOpen(false)}
      >
        <AddJourneyPopup closePopup={() => setAddJourneyPopupIsOpen(false)}/>
      </Popup>

      <Popup
        isOpen={editJourneyPopupIsOpen}
        onClose={() => setEditJourneyPopupIsOpen(false)}
      >
        <EditJourneyPopup closePopup={() => setEditJourneyPopupIsOpen(false)} journey={journeyPopup}/>
      </Popup>


      <Popup
        isOpen={deleteJourneyPopupIsOpen}
        onClose={() => setDeleteJourneyPopupIsOpen(false)}
      >
        <DeleteJourneyPopup journey={journeyPopup} closePopup={() => setDeleteJourneyPopupIsOpen(false)}/>
      </Popup>


      <Popup isOpen={previewPopupIsOpen} size="large" onClose={()=> setPreviewPopupIsOpen(false)}>
              <JourneyPreviewPopup journey={journeyPopup} />
      </Popup>


      <div className="grid grid-cols md:grid-cols-2 gap-2 mt-4">
              {isLoading ? Array.from({length : 6}).map((_ , i)=><JourneySkeleton key={i}/>) : 
              journeys.length === 0 ? <p>No projects yet</p> : journeys.map((j : JourneyProps)=> 
              <JourneyCard journey={j} key={j?._id}
              onDelete={()=> handleOpenDeleteJourneyPopup(j)} 
              onUpdate={()=> handleOpenEditJourneyPopup(j)}
              onPreview={()=> handleOpenPreviewPopup(j)}/>)}
      </div>
    </div>
  );
};
export default MyJourney;
