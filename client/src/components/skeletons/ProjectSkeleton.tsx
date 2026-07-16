export const ProjectSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow-md p-4 border border-gray-300 space-y-2 rounded-lg">
      {/* Image / Thumbnail placeholder */}
      <div className="w-full h-44 bg-gray-300 rounded-md"></div>

      {/* Title placeholder */}
      <div className="h-6 bg-gray-300 w-1/2 rounded-md"></div>

      {/* Description lines placeholder */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 w-full rounded-md"></div>
        <div className="h-3 bg-gray-300 w-full rounded-md"></div>
        <div className="h-3 bg-gray-300 w-2/3 rounded-md"></div>
      </div>

      {/* Tags placeholder */}
      <div className="flex gap-1 pt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-5 w-12 bg-gray-300 rounded-md" />
        ))}
      </div>


      {/* Preview & Code Source Button placeholders */}
      <div className="flex gap-2 justify-between items-center pt-1 border-t border-gray-300 pt-2">
        <div className="h-9 w-full bg-gray-300 rounded-md"></div> {/* Preview Button */}
        <div className="h-9 w-full bg-gray-300 rounded-md"></div> {/* Code Source Button */}
      </div>


      <div className="h-4 bg-gray-300 w-1/2 rounded-md"></div>
    </div>
  );
};