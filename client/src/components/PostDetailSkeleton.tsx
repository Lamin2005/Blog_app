export default function PostDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="w-full h-80 bg-slate-800 rounded-2xl mb-6"></div>

      <div className="h-8 bg-slate-800 rounded w-3/4 mb-4"></div>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-slate-700"></div>
        <div className="h-4 bg-slate-700 rounded w-24"></div>
        <div className="h-4 bg-slate-700 rounded w-16"></div>
        <div className="h-4 bg-slate-700 rounded w-20"></div>
      </div>

      <div className="space-y-4">
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded w-5/6"></div>
        <div className="h-4 bg-slate-700 rounded w-4/6"></div>
      </div>
    </div>
  );
}
