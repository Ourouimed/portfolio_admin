
export default function JourneySkeleton() {
  return <div className="animate-pulse space-y-4 bg-white rounded-lg shadow-md border border-gray-300 p-4">
    <div className="flex justify-between items-center">
        <div className="h-3 bg-gray-300 w-1/4 rounded-md"/>
        <div className="h-3 bg-gray-300 w-1/4 rounded-md"/>
    </div>
    <div className="space-y-2">
        <div className="h-4 bg-gray-300 w-full rounded-md"/>
        <div className="h-4 bg-gray-300 w-1/2 rounded-md"/>
    </div>


    <div className="space-y-2">
        <div className="h-2 bg-gray-300 w-full rounded-md"/>
        <div className="h-2 bg-gray-300 w-full rounded-md"/>
        <div className="h-2 bg-gray-300 w-full rounded-md"/>
        <div className="h-2 bg-gray-300 w-1/2 rounded-md"/>
    </div>


    <div>
        <div className="h-3 bg-gray-300 w-1/4 rounded-md"/>
    </div>
  </div>
}