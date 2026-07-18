import { Calendar, MapPinIcon, Pencil, Trash2 } from "lucide-react";
import type { JourneyCardProps } from "../../interfaces/journeyProps";
import { formatDate } from "../../lib/date-formaters";

export default function JourneyCard({
  journey,
  onPreview,
  onDelete,
  onUpdate,
}: JourneyCardProps) {
  return (
    <div className="group relative shadow-md p-4 border border-gray-300 rounded-lg space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-blue-500">
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${journey?.type === "work" ? "bg-blue-50 text-blue-600" : journey?.type === "education" ? "bg-green-50 text-green-600" : ""} uppercase`}
        >
          {journey?.type}
        </span>
        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
          <Calendar size={14} className="text-gray-400" />
          <span>
            {journey?.start_date} — {journey?.end_date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 onClick={onPreview} className="cursor-pointer text-lg font-bold text-gray-900 transition-colors group-hover:text-blue-600">
          {journey?.title}
        </h3>
        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
          {journey?.description}
        </p>
      </div>

      {/* Footer / Location */}
      <div className="text-xs text-gray-400">
        <span>
          last update :{" "}
          {journey?.updatedAt ? formatDate(journey?.updatedAt) : "N/A"}
        </span>
      </div>

      <div className="flex items-center justify-between">
        {journey?.location && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <MapPinIcon size={14} className="text-blue-500/80" />
            <span>{journey?.location}</span>
          </div>
        )}

        {(onUpdate || onDelete) && (
          <div className="flex gap-1">
            {onUpdate && (
              <button
                onClick={() => journey?._id && onUpdate(journey._id)}
                className="p-1.5 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Update Project"
              >
                <Pencil size={14} />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => journey?._id && onDelete(journey._id)}
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
  );
}
