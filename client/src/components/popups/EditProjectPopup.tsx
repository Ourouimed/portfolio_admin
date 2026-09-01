import { File as FileIcon, Loader2, X } from "lucide-react"
import { Input } from "../ui/Input"
import { useState, type ChangeEvent, type KeyboardEvent } from "react"
import { Button } from "../ui/Button";
import { TextArea } from "../ui/Textarea";
import { useAppDispatch } from "../../app/hooks";
import { useToast } from "../../hooks/useToast";
import { useProject } from "../../hooks/useProject";
import { editProject } from "../../app/features/project/projectThunks";
import { isValidUrl } from "../../lib/validators";





interface ProjectInfo {
  _id? : string
  image: File | null;
  imageUrl: string;
  name: string;
  preview : string;
  source : string;
  description: string;
  tech: string[];
}

interface FormErrors {
  image?: string;
  name?: string;
  description?: string;
  tech?: string;
  preview? : string
  source? : string
}



export const EditProjectPopup = ({closePopup , project } : any) => {
    const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
        image: null,
        imageUrl: project?.image || "",
        name: project?.name || "", 
        preview : project?.preview || "",
        source : project?.source || "",
        description: project?.description || "",
        tech: project?.tech || []
    })
    
    const [techInput, setTechInput] = useState("")
    const [errors, setErrors] = useState<FormErrors>({});

    const dispatch = useAppDispatch()
    const toast = useToast()

    const { isLoading } = useProject()

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setProjectInfo((prev) => ({ ...prev, [id]: value }));
        if (errors[id as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [id]: undefined }))
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setProjectInfo(prev => ({ ...prev, image: file, imageUrl: url }));
            setErrors(prev => ({ ...prev, image: undefined }));
        }
    };

    
    const handleAddTech = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const cleanInput = techInput.trim().replace(/,$/, "");
            if (cleanInput && !projectInfo.tech.includes(cleanInput)) {
                setProjectInfo(prev => ({
                    ...prev,
                    tech: [...prev.tech, cleanInput]
                }));
                setTechInput("");
                setErrors(prev => ({ ...prev, tech: undefined }));
            }
        }
    };

    // Removes tech tags
    const handleRemoveTech = (indexToRemove: number) => {
        setProjectInfo(prev => ({
            ...prev,
            tech: prev.tech.filter((_, index) => index !== indexToRemove)
        }));
    };

    

    const validate = (): boolean => {
        const tempErrors: FormErrors = {};
        

        if (projectInfo.source && !isValidUrl(projectInfo.source)) tempErrors.source = "Unvalid url"
        if (projectInfo.preview && !isValidUrl(projectInfo.preview)) tempErrors.preview = "Unvalid url"
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleEditProject = async () => {

        if (validate()){
            const formData = new FormData()
            formData.append("name" , projectInfo.name)
            formData.append("description" , projectInfo.description)
            formData.append("preview" , projectInfo.preview)
            formData.append("source" , projectInfo.source)
            projectInfo.tech.forEach(t => formData.append("tech" , t))

            if (projectInfo.image instanceof File) formData.append("image" , projectInfo.image)

            try {
                await dispatch(editProject({data : formData , _id : project._id})).unwrap()
                toast.success('Project edited successfully')
                if(closePopup) closePopup()
            }
            catch (err : any) {
                toast.error(err || "Failed to add project")
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="w-full space-y-2">
                <label htmlFor="prod-img" className="block font-semibold text-sm">Product image</label>
                <input 
                    type="file" 
                    id="prod-img" 
                    accept="image/*"
                    className="hidden" 
                    onChange={handleFileChange}
                />
                <label 
                    htmlFor="prod-img" 
                    className={`flex flex-col gap-3 rounded-lg p-4 border-2 border-dashed w-full cursor-pointer items-center justify-center hover:border-blue-500 transition duration-300 ${
                        errors.image ? 'border-red-500 bg-red-50/10' : 'border-gray-300'
                    }`}
                >
                    {projectInfo.imageUrl ? (
                        <div className="relative w-full h-32">
                            <img 
                                src={projectInfo.imageUrl} 
                                alt="Preview" 
                                className="h-full w-full object-cover rounded-md"
                            />
                        </div>
                    ) : (
                        <>
                            <FileIcon size={40} className="text-gray-400" />
                            <h4 className="text-sm font-medium text-gray-600">Choose your file now</h4>
                        </>
                    )}
                </label>
                {errors.image && <p className="text-red-500 text-[10px]">{errors.image}</p>}
            </div>

            {/* Project Name Field */}
            <div className="space-y-2">
                <label htmlFor="name" className="block font-semibold text-sm">
                    Project name
                </label>
                <Input
                    type="text"
                    id="name"
                    placeholder="e.g. Portfolio"
                    onChange={handleChange}      
                    value={projectInfo.name}   
                    className={errors.name ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.name && <p className="text-red-500 text-[10px]">{errors.name}</p>}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
                <label htmlFor="description" className="block font-semibold text-sm">
                    Description
                </label>
                <TextArea
                    id="description"
                    placeholder="Briefly describe what your project does..."
                    onChange={handleChange}
                    value={projectInfo.description}
                    rows={3}
                    className={errors.description ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300"}
                />
                {errors.description && <p className="text-red-500 text-[10px]">{errors.description}</p>}
            </div>

            {/* Preview link Field */}
            <div className="space-y-2">
                <label htmlFor="preview" className="block font-semibold text-sm">
                    Preview link
                </label>
                <Input
                    type="text"
                    id="preview"
                    placeholder="https://example.come"
                    onChange={handleChange}      
                    value={projectInfo.preview}   
                    className={errors.preview ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.preview && <p className="text-red-500 text-[10px]">{errors.preview}</p>}
            </div>


            {/* Source link Field */}
            <div className="space-y-2">
                <label htmlFor="source" className="block font-semibold text-sm">
                    Source link
                </label>
                <Input
                    type="text"
                    id="source"
                    placeholder="https://github.com/ourouimed/repo"
                    onChange={handleChange}      
                    value={projectInfo.source}   
                    className={errors.source ? "border-red-500 focus:ring-red-500" : ""}
                />
                {errors.source && <p className="text-red-500 text-[10px]">{errors.source}</p>}
            </div>

            {/* Tech Stack Field */}
            <div className="space-y-2">
                <label htmlFor="tech" className="block font-semibold text-sm">
                    Technologies
                </label>
                <Input
                    type="text"
                    id="tech"
                    placeholder="Type tech and press Enter"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleAddTech}
                    className={errors.tech ? "border-red-500" : ""}
                />
                {errors.tech && <p className="text-red-500 text-[10px]">{errors.tech}</p>}
                
                {/* Tag badges wrapper */}
                {projectInfo.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {projectInfo.tech.map((tag, index) => (
                            <span 
                                key={index} 
                                className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-md"
                            >
                                {tag}
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveTech(index)}
                                    className="text-blue-500 cursor-pointer"
                                >
                                    <X size={12} />
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Submit Action */}
            <Button 
                fullWidth
                disabled={isLoading}
                onClick={handleEditProject}
                className="bg-blue-500"
            >
                {isLoading ? <Loader2 className="animate-spin"/> : "Edit Project"}
            </Button>
        </div>
    )
}