export const EventSkeleton = () => {
  return (
    <div className="w-full max-w-[350px] h-[300px] bg-black/20 backdrop-blur-sm border-white/10 rounded-lg animate-pulse">
      <div className="w-full aspect-[16/9] bg-white/10 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
};