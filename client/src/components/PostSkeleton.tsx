export default function PostSkeleton() {
  return (
    <div className="animate-pulse bg-slate-800 p-4 rounded-xl space-y-3">
      <div className="h-40 bg-slate-700 rounded-lg"></div>

      <div className="h-4 bg-slate-700 rounded w-3/4"></div>

      <div className="h-3 bg-slate-700 rounded w-full"></div>
      <div className="h-3 bg-slate-700 rounded w-5/6"></div>

      <div className="h-3 bg-slate-700 rounded w-1/4"></div>
    </div>
  );
}
