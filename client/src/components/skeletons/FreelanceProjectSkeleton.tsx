export const FreelanceProjectSkeleton = () => {
    return (
        <div className="bg-white shadow-md p-4 border border-gray-200 space-y-4 rounded-lg animate-pulse">
            {/* Header: Client & Status Badge */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
                <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
            </div>

            {/* Body: Title & Description */}
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </div>

                <div className="space-y-2">
                    <div className="w-full h-3 bg-gray-200 rounded"></div>
                    <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Footer: Task Metrics & Timestamp */}
            <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-3 bg-gray-200 rounded"></div>
                        <div className="w-28 h-3 bg-gray-200 rounded"></div>
                    </div>
                    {/* Percentage Bar Skeleton */}
                    <div className="w-full h-3 bg-gray-200 rounded-full"></div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="w-36 h-3 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};