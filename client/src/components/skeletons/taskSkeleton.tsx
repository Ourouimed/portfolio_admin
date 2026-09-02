export const TaskSkeleton = () => {
  return (
    <article
      aria-hidden="true"
      className="group relative flex flex-col justify-between rounded-xl border border-neutral-200 bg-white p-5 shadow-xs animate-pulse"
    >
      <div>
        {/* Badge & Date */}
        <div className="flex items-center justify-between gap-3">
          <div className="h-5 w-20 rounded-full bg-neutral-200" />
          <div className="h-3.5 w-28 rounded-md bg-neutral-200" />
        </div>

        {/* Title */}
        <div className="mt-3.5 h-5 w-3/5 rounded-md bg-neutral-200" />

        {/* Content lines */}
        <div className="mt-2.5 space-y-2">
          <div className="h-3.5 w-full rounded-md bg-neutral-200" />
          <div className="h-3.5 w-5/6 rounded-md bg-neutral-200" />
          <div className="h-3.5 w-2/3 rounded-md bg-neutral-200" />
        </div>
      </div>

      {/* Footer: ID & Action link */}
      <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
        <div className="h-3 w-16 rounded-md bg-neutral-200" />
        <div className="h-3.5 w-24 rounded-md bg-neutral-200" />
      </div>
    </article>
  );
};