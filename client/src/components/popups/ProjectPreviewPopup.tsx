import { Code, Eye, Calendar } from "lucide-react";
import type { ProjectCardProps } from "../../interfaces/projectProps";
import { Button } from "../ui/Button";
import { formatDate } from "../../lib/date-formaters";

export const ProjectPreviewPopup = ({ project }: ProjectCardProps) => {
  

  return (
    <div className="py-2 space-y-4">
      {/* Project Image */}
      {project?.image ? (
        <div className="w-full h-64 rounded-md overflow-hidden">
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md text-gray-400">
          No Image Available
        </div>
      )}

      {/* Project Title */}
      <h3 className="text-2xl font-bold text-gray-800">
        {project?.name}
      </h3>

      {/* Project Dates */}
      {(project?.createdAt || project?.updatedAt) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          {project?.createdAt && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Created: <span className="font-medium text-gray-700">{formatDate(project.createdAt)}</span>
            </span>
          )}
          {project?.updatedAt && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              Updated: <span className="font-medium text-gray-700">{formatDate(project.updatedAt)}</span>
            </span>
          )}
        </div>
      )}

      {/* Project Description */}
      <p className="text-gray-600 leading-relaxed">
        {project?.description}
      </p>

      {/* Project Tags / Technologies */}
      {project?.tech && project.tech.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tech.map((tag, i) => (
            <span 
              key={i} 
              className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-2.5 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-2 gap-2 ">
        {project?.source && (
          <Button
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Code size={14}/>
            Code Source
          </Button>
        )}

        {project?.preview && (
          <Button
            href={project.preview}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500"
          >
            <Eye size={14}/>
            Live Preview
          </Button>
        )}
      </div>
    </div>
  );
};