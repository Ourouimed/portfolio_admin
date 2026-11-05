import { Plus } from "lucide-react"
import { Button } from "../components/ui/Button"
import { useState } from "react";
import { Popup } from "../components/Popup";
import { AddFreelanceProjectPopup } from "../components/popups/freelancing/AddFreelanceProjectPopup";

const Freelancing = () => {
  // popups state
  const [addPopupIsOpen, setAddPopupIsOpen] = useState(false);
  return <div>
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="space-y-3">
        <h3 className="font-bold text-3xl">Freelencing</h3>
        <p className="text-sm text-gray-500">
          Manage your Freelancing projects
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">


        <Button size="md" onClick={()=> setAddPopupIsOpen(true)}>
          New Project
          <Plus size={13} />
        </Button>
      </div>
    </div>



    <Popup isOpen={addPopupIsOpen} onClose={() => setAddPopupIsOpen(false)} size="large" >
        <AddFreelanceProjectPopup closePopup={() => setAddPopupIsOpen(false)} />
      </Popup>
  </div>
}

export default Freelancing