import { Calendar, MapPinIcon, Tag } from "lucide-react";
import type { JourneyCardProps } from "../../interfaces/journeyProps";

export const JourneyPreviewPopup = ({ journey }: JourneyCardProps) => {
  return (
    <div className="overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-blue-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
            {journey?.type || "Journey"}
          </span>
        </div>
        
        {/* Optional "Preview" Badge */}
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
          Quick View
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-3">
        {journey?.title}
      </h2>

      {/* Meta Info Grid (Dates & Location) */}
      <div className="grid grid-cols-1 divide-x divide-gray-300 gap-2 sm:grid-cols-2 rounded-lg bg-gray-50 p-3 mb-4 text-sm text-gray-600 border border-gray-300">
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-400 shrink-0" />
          <div>
            <span className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Timeline</span>
            <span className="font-medium text-xs sm:text-sm">
              {journey?.start_date} — {journey?.end_date}
            </span>
          </div>
        </div>

        {journey?.location && (
          <div className="flex items-center gap-2 pt-2">
            <MapPinIcon size={16} className="text-rose-500 shrink-0" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">Location</span>
              <span className="font-medium text-xs sm:text-sm truncate">
                {journey?.location}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Description */}
      <div className="space-y-1.5">
        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider">
          Overview
        </span>
        <p className="text-sm leading-relaxed text-gray-600 max-h-[200px] overflow-y-auto pr-1 subtle-scrollbar">
          {journey?.description || "No description provided for this journey."}
        </p>
      </div>
    </div>
  );
};