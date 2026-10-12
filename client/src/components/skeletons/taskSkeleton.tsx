
export const TaskSkeleton = () => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-xl space-y-3 animate-pulse">

      <div className="flex items-center justify-between">
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="size-8 bg-gray-200 rounded-full shrink-0" />
      </div>


      <div className="h-3 bg-gray-200 rounded w-1/3" />


      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 rounded-full w-16" />

        <div className="flex items-center gap-2">
          <div className="size-4 bg-gray-200 rounded" />
          <div className="size-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
