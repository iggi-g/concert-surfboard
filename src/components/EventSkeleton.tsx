export const EventSkeleton = () => {
  return (
    <div className="w-full max-w-[320px] animate-pulse">
      <div className="w-full aspect-[3/4] bg-card rounded-2xl ring-1 ring-border" />
      <div className="pt-3 space-y-2">
        <div className="h-4 bg-card rounded w-3/4" />
        <div className="h-3 bg-card rounded w-1/2" />
      </div>
    </div>
  );
};
