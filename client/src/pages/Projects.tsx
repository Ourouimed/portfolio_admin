import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Popup } from "../components/Popup";
import { useEffect, useState } from "react";
import { AddProjectPopup } from "../components/popups/AddProjectPopup";
import { useAppDispatch } from "../app/hooks";
import { useProject } from "../hooks/useProject";
import { getAllProjects } from "../app/features/project/projectThunks";
import { ProjectSkeleton } from "../components/skeletons/ProjectSkeleton";
import { ProjectCard } from "../components/cards/ProjectCard";
import type { ProjectProps } from "../interfaces/projectProps";
import { ProjectPreviewPopup } from "../components/popups/ProjectPreviewPopup";
import { EditProjectPopup } from "../components/popups/EditProjectPopup";
import { DeleteProjectPopup } from "../components/popups/DeleteProjectPopup";

const Projetcs = () => {
  const dispatch = useAppDispatch()
  const { projects , isLoading} = useProject()
  const [addPopupIsOpen , setAddPopupIsOpen] = useState<boolean>(false);
  const [previewPopupIsOpen , setPreviewPopupIsOpen] = useState<boolean>(false);
  const [editPopupIsOpen , setEditPopupIsOpen] = useState<boolean>(false);
  const [deletePopupIsOpen , setDeletePopupIsOpen] = useState<boolean>(false);
  const [popupProject , setPopupProject] = useState<ProjectProps | null>(null)

  useEffect(()=>{
    dispatch(getAllProjects())
    if (projects) console.log(projects)
    
  } , [dispatch]) 
  //handleers
  const handleOpenAddProjectPopup = (p : ProjectProps)=>{
    setPreviewPopupIsOpen(true)
    setPopupProject(p)
  }


  const handleOpenEditProjectPopup = (p : ProjectProps)=>{
    setEditPopupIsOpen(true)
    setPopupProject(p)
  }

  const handleOpenDeleteProjectPopup = (p : ProjectProps)=>{
    setDeletePopupIsOpen(true)
    setPopupProject(p)
  }
  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-bold text-xl">My projects</h3>
        <Button size="sm" onClick={()=>setAddPopupIsOpen(true)}>
          Add Project
          <Plus size={13} />
        </Button>
      </div>


      <Popup isOpen={addPopupIsOpen} onClose={()=> setAddPopupIsOpen(false)}>
        <AddProjectPopup closePopup={()=>setAddPopupIsOpen(false)}/>
      </Popup>


      <Popup isOpen={previewPopupIsOpen} size="large" onClose={()=> setPreviewPopupIsOpen(false)}>
        <ProjectPreviewPopup project={popupProject} />
      </Popup>


      <Popup isOpen={editPopupIsOpen} onClose={()=> setEditPopupIsOpen(false)}>
        <EditProjectPopup project={popupProject} closePopup={()=> setEditPopupIsOpen(false)}/>
      </Popup>

      <Popup isOpen={deletePopupIsOpen} onClose={()=> setDeletePopupIsOpen(false)}>
        <DeleteProjectPopup project={popupProject} closePopup={()=> setDeletePopupIsOpen(false)}/>
      </Popup>
      

      <div className="grid grid-cols md:grid-cols-3 gap-2 mt-4">
        {isLoading ? Array.from({length : 6}).map((_ , i)=><ProjectSkeleton key={i}/>) : 
        projects.map((p : ProjectProps) => <ProjectCard project={p} key={p._id} 
          openPopup={()=> handleOpenAddProjectPopup(p)} 
          onUpdate={()=> handleOpenEditProjectPopup(p)} 
          onDelete={()=> handleOpenDeleteProjectPopup(p)}/>)}
      </div>
    </div>
  );
};
export default Projetcs;
