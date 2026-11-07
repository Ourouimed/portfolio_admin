import { Plus } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useEffect, useState } from "react";
import { Popup } from "../components/Popup";
import { AddFreelanceProjectPopup } from "../components/popups/freelancing/AddFreelanceProjectPopup";
import { useFreelancing } from "../hooks/useFreelancing";
import { useAppDispatch } from "../app/hooks";
import { getFreelanceProjects } from "../app/features/freelancing/freelancingThunks";
import { FreelanceProjectSkeleton } from "../components/skeletons/FreelanceProjectSkeleton";
import type { FreelanceProjectProps } from "../interfaces/freelancingProps";
import { FreelanceProjectCard } from "../components/cards/FreelanceProjectCard";

const Freelancing = () => {
  // popups state
  const [addPopupIsOpen, setAddPopupIsOpen] = useState(false);


  const { isLoading, freelanceProjects } = useFreelancing()


  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(getFreelanceProjects());


  }, [dispatch]);
  return <div>
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="space-y-3">
        <h3 className="font-bold text-3xl">Freelencing</h3>
        <p className="text-sm text-gray-500">
          Manage your Freelancing projects
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">


        <Button size="md" onClick={() => setAddPopupIsOpen(true)}>
          New Project
          <Plus size={13} />
        </Button>
      </div>
    </div>



    <Popup isOpen={addPopupIsOpen} onClose={() => setAddPopupIsOpen(false)} size="large" >
      <AddFreelanceProjectPopup closePopup={() => setAddPopupIsOpen(false)} />
    </Popup>


    <div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4">
      {isLoading ? Array.from({ length: 6 }).map((_, i) => <FreelanceProjectSkeleton key={i} />) :
        freelanceProjects.length === 0 ? <p>No projects yet</p> :
          freelanceProjects.map((p: FreelanceProjectProps) => <FreelanceProjectCard project={p} key={p._id} />)
      }
    </div>
  </div>
}

export default Freelancing