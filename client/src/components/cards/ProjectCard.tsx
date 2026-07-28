import { Code, Eye, Pencil, Trash2 } from "lucide-react";
import type { ProjectCardProps } from "../../interfaces/projectProps";
import { Button } from "../ui/Button";
import { formatDate } from "../../lib/date-formaters";

export const ProjectCard = ({ project, onPreview, onUpdate, onDelete }: ProjectCardProps) => {
  return (
    <div className="group bg-white shadow-md p-4 border border-gray-300 space-y-3 rounded-lg flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500">
      <div className="space-y-2">
        {/* Image / Thumbnail */}
        {project?.image ? (
          <div className="w-full h-44 rounded-md overflow-hidden cursor-pointer" onClick={onPreview}>
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-full h-44 bg-gray-300 rounded-md"></div>
        )}

        {/* Title placeholder */}
        <h3 className="cursor-pointer text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {project?.name}
        </h3>

        {/* Description lines placeholder */}
        <p className="text-sm line-clamp-3 text-gray-700">
          {project?.description}
        </p>

        {/* Tags placeholder */}
        <div className="flex flex-wrap gap-1 pt-1">
          {project?.tech?.map((t, i) => (
            <span key={i} className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-md">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-gray-200">
        {/* Preview & Code Source Button placeholders */}
        <div className="flex gap-2 justify-between items-center">
          {project?.source && (
            <Button fullWidth href={project?.source} target="_blank">
              <Code size={14}/>
              Code
            </Button>
          )}
          <Button fullWidth className="!bg-blue-500" onClick={onPreview}> 
            <Eye size={14}/>
            Preview
          </Button>
        </div>

        {/* Admin Action Buttons & Last Update Timestamp */}
        <div className="flex justify-between items-center pt-1 text-xs text-gray-500">
          <span>
            last update : {project?.updatedAt ? formatDate(project?.updatedAt) : "N/A"}
          </span>
          
          {(onUpdate || onDelete) && (
            <div className="flex gap-1">
              {onUpdate && (
                <button 
                  onClick={() => project?._id && onUpdate(project._id)}
                  className="p-1.5 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="Update Project"
                >
                  <Pencil size={14} />
                </button>
              )}
              {onDelete && (
                <button 
                  onClick={() => project?._id && onDelete(project._id)}
                  className="p-1.5 cursor-pointer text-gray-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Delete Project"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};