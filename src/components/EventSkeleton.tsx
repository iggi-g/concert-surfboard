
export const EventSkeleton = () => {
  return (
    <div className="w-full max-w-[350px] h-[400px] bg-card/60 backdrop-blur-sm border border-border/30 rounded-xl overflow-hidden">
      <div className="w-full h-3/4 skeleton rounded-t-xl" />
      <div className="p-4 h-1/4 space-y-3">
        <div className="h-6 skeleton rounded w-3/4" />
        <div className="h-4 skeleton rounded w-1/2" />
      </div>
    </div>
  );
};
